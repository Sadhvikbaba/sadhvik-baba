export const LEETCODE_ALL_STATS_QUERY = `
  query userStats($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        realName
        userAvatar
        reputation
        ranking
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      submissionCalendar
      badges {
        id
        name
        icon
        hoverText
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }
`;
