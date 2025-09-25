export type CountryDetails = {
  '@id': string
  code: string
  name: string
}

export type StatsLastType = {
  rating: number
  date: number
  rd: number
}
export type StatsRecord = {
  win: number
  loss: number
  draw: number
}
export type StatsRating = {
  rating: number
  date: number
  game: string
}

export type ChessComPlayer = {
  avatar: string
  player_id: number
  '@id': string
  url: string
  username: string
  followers: number
  country: string
  last_online: number
  joined: number
  status: 'basic' | 'premium' | 'mod' | string
  is_streamer: boolean
  verified: boolean
  league?: string
  streaming_platforms: string[]
  country_details: CountryDetails
  name: string
  alt_name: string
  title: string
  location: string
}

export type ProfileStatsType = {
  chess_rapid: {
    last: StatsLastType
    best: StatsRating
    record: StatsRecord
  }
  chess_bullet: {
    last: StatsLastType
    best: StatsRating
    record: StatsRecord
  }
  chess_blitz: {
    last: StatsLastType
    best: StatsRating
    record: StatsRecord
  }
  fide: number
  tactics: {
    highest: StatsRating
    lowest: StatsRating
  }
  puzzle_rush: {
    best: {
      total_attempts: number
      score: number
    }
  }
}
