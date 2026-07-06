import { LEETCODE_ALL_STATS_QUERY } from "@/graphql/leetcodeQueries";
import { ConsolidatedLeetCodeData, LeetCodeRawData } from "@/types/leetcode";

const LEETCODE_API_URL = "https://leetcode.com/graphql";

// Generate mock submission calendar for fallback display
function generateFallbackCalendar(): Record<string, number> {
  const calendar: Record<string, number> = {};
  const now = Math.floor(Date.now() / 1000);
  const oneDay = 86400;
  // Fill approximately 150 active days over the last year
  for (let i = 0; i < 365; i += 2) {
    const timestamp = now - i * oneDay;
    const count = Math.floor(Math.random() * 5) + 1; // 1 to 5 submissions
    calendar[timestamp.toString()] = count;
  }
  return calendar;
}

// Fallback mockup data if the API fails or is offline
export const FALLBACK_LEETCODE_DATA: ConsolidatedLeetCodeData = {
  username: "sadhvik_baba_patibandla",
  realName: "Sadhvik Baba Patibandla",
  avatar: "https://assets.leetcode.com/users/default_avatar.png",
  ranking: 42103,
  reputation: 158,
  totalSolved: 500,
  easySolved: 180,
  mediumSolved: 260,
  hardSolved: 60,
  totalQuestions: 3300,
  easyQuestions: 800,
  mediumQuestions: 1600,
  hardQuestions: 900,
  acceptanceRate: 68.4,
  contestRating: 1742,
  contestRanking: 22104,
  contestTopPercentage: 18.2,
  contestAttendedCount: 24,
  submissionCalendar: generateFallbackCalendar(),
  badges: [
    {
      id: "badge1",
      name: "Knight Badge",
      icon: "/badges/knight.png",
      hoverText: "Knight Badge - Earned on May 2025"
    }
  ],
  contestHistory: [
    { rating: 1400, date: "2025-01-10", title: "Weekly Contest 431" },
    { rating: 1445, date: "2025-02-15", title: "Weekly Contest 436" },
    { rating: 1512, date: "2025-03-20", title: "Weekly Contest 441" },
    { rating: 1624, date: "2025-04-12", title: "Weekly Contest 444" },
    { rating: 1742, date: "2025-05-18", title: "Weekly Contest 449" }
  ]
};

export async function fetchLeetCodeData(username: string): Promise<ConsolidatedLeetCodeData> {
  try {
    const response = await fetch(LEETCODE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({
        query: LEETCODE_ALL_STATS_QUERY,
        variables: { username }
      }),
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["leetcode"] // Custom cache invalidation tag
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      throw new Error(json.errors[0]?.message || "GraphQL query error");
    }

    const raw: LeetCodeRawData = json.data;

    // Check if matchedUser is valid
    if (!raw.matchedUser) {
      throw new Error(`User ${username} not found on LeetCode`);
    }

    const profile = raw.matchedUser.profile;
    const submitStats = raw.matchedUser.submitStats;
    const calendarString = raw.matchedUser.submissionCalendar;

    // Process submission calendar
    let parsedCalendar: Record<string, number> = {};
    if (calendarString) {
      try {
        parsedCalendar = JSON.parse(calendarString);
      } catch (err) {
        console.error("Error parsing submission calendar JSON:", err);
      }
    }

    // Process solved questions
    let totalSolved = 0;
    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    if (submitStats?.acSubmissionNum) {
      const all = submitStats.acSubmissionNum.find((x) => x.difficulty === "All");
      const easy = submitStats.acSubmissionNum.find((x) => x.difficulty === "Easy");
      const med = submitStats.acSubmissionNum.find((x) => x.difficulty === "Medium");
      const hard = submitStats.acSubmissionNum.find((x) => x.difficulty === "Hard");

      totalSolved = all?.count || 0;
      easySolved = easy?.count || 0;
      mediumSolved = med?.count || 0;
      hardSolved = hard?.count || 0;
    }

    // Process total questions counts
    let totalQuestions = 3300;
    let easyQuestions = 800;
    let mediumQuestions = 1600;
    let hardQuestions = 900;

    if (raw.allQuestionsCount) {
      const allQ = raw.allQuestionsCount.find((x) => x.difficulty === "All");
      const easyQ = raw.allQuestionsCount.find((x) => x.difficulty === "Easy");
      const medQ = raw.allQuestionsCount.find((x) => x.difficulty === "Medium");
      const hardQ = raw.allQuestionsCount.find((x) => x.difficulty === "Hard");

      totalQuestions = allQ?.count || totalQuestions;
      easyQuestions = easyQ?.count || easyQuestions;
      mediumQuestions = medQ?.count || mediumQuestions;
      hardQuestions = hardQ?.count || hardQuestions;
    }

    // Calculate acceptance rate
    const acceptanceRate = totalSolved > 0 
      ? Number(((totalSolved / (submitStats?.acSubmissionNum[0]?.submissions || totalSolved * 1.5)) * 100).toFixed(1))
      : 60.0;

    // Process contest history
    const contestHistory: { rating: number; date: string; title: string }[] = [];
    if (raw.userContestRankingHistory) {
      const attended = raw.userContestRankingHistory.filter((x) => x.attended && x.rating > 0);
      attended.forEach((item) => {
        const dateStr = new Date(item.contest.startTime * 1000).toISOString().split("T")[0];
        contestHistory.push({
          rating: Math.round(item.rating),
          date: dateStr,
          title: item.contest.title
        });
      });
    }

    return {
      username: raw.matchedUser.username,
      realName: profile?.realName || raw.matchedUser.username,
      avatar: profile?.userAvatar || "https://assets.leetcode.com/users/default_avatar.png",
      ranking: profile?.ranking || 0,
      reputation: profile?.reputation || 0,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      totalQuestions,
      easyQuestions,
      mediumQuestions,
      hardQuestions,
      acceptanceRate,
      contestRating: raw.userContestRanking ? Math.round(raw.userContestRanking.rating) : null,
      contestRanking: raw.userContestRanking ? raw.userContestRanking.globalRanking : null,
      contestTopPercentage: raw.userContestRanking ? raw.userContestRanking.topPercentage : null,
      contestAttendedCount: raw.userContestRanking ? raw.userContestRanking.attendedContestsCount : 0,
      submissionCalendar: parsedCalendar,
      badges: raw.matchedUser.badges || [],
      contestHistory: contestHistory.slice(-6) // Display recent 6 contests
    };
  } catch (error) {
    console.error("Failed to fetch LeetCode data from GraphQL API, using mock fallbacks:", error);
    // Return mock fallback data in case of error
    return FALLBACK_LEETCODE_DATA;
  }
}
