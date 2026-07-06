export interface LeetCodeDifficultyCount {
  difficulty: string;
  count: number;
}

export interface LeetCodeSubmissionCount {
  difficulty: string;
  count: number;
  submissions: number;
}

export interface LeetCodeBadge {
  id: string;
  name: string;
  icon: string;
  hoverText: string;
}

export interface LeetCodeContestHistoryItem {
  attended: boolean;
  rating: number;
  ranking: number;
  contest: {
    title: string;
    startTime: number;
  };
}

export interface LeetCodeRawData {
  allQuestionsCount: LeetCodeDifficultyCount[];
  matchedUser: {
    username: string;
    profile: {
      realName: string;
      userAvatar: string;
      reputation: number;
      ranking: number;
    } | null;
    submitStats: {
      acSubmissionNum: LeetCodeSubmissionCount[];
    } | null;
    submissionCalendar: string | null;
    badges: LeetCodeBadge[] | null;
  } | null;
  userContestRanking: {
    attendedContestsCount: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    badge: {
      name: string;
    } | null;
  } | null;
  userContestRankingHistory: LeetCodeContestHistoryItem[] | null;
}

export interface ConsolidatedLeetCodeData {
  username: string;
  realName: string;
  avatar: string;
  ranking: number;
  reputation: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyQuestions: number;
  mediumQuestions: number;
  hardQuestions: number;
  acceptanceRate: number;
  contestRating: number | null;
  contestRanking: number | null;
  contestTopPercentage: number | null;
  contestAttendedCount: number;
  submissionCalendar: Record<string, number>; // timestamp: count
  badges: LeetCodeBadge[];
  contestHistory: { rating: number; date: string; title: string }[];
}
