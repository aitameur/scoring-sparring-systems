export interface Player {
  name: string;
  score: number;
  penalties: number;
}

export interface Match {
  id: number;
  round: number;
  bluePlayer: Player;
  redPlayer: Player;
  winner?: "blue" | "red";
}

export interface RoundResult {
  winner: "blue" | "red";
  blueScore: number;
  redScore: number;
  bluePenalties: number;
  redPenalties: number;
}