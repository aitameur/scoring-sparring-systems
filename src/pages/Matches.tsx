import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { saveMatch } from "../services/api";

interface Player {
  name: string;
  score: number;
  penalties: number;
}

interface Match {
  id: number;
  round: number;
  bluePlayer: Player;
  redPlayer: Player;
  winner?: "blue" | "red";
}

const Matches = () => {
  const [currentMatch, setCurrentMatch] = useState<Match>({
    id: 1,
    round: 1,
    bluePlayer: { name: "Player 1", score: 0, penalties: 0 },
    redPlayer: { name: "Player 2", score: 0, penalties: 0 },
  });

  const { toast } = useToast();

  const handleMatchEnd = async (winner: "blue" | "red") => {
    try {
      await saveMatch({
        tournament_id: 1, // You'll need to pass the actual tournament ID
        blue_player: currentMatch.bluePlayer.name,
        red_player: currentMatch.redPlayer.name,
        winner: winner,
        blue_score: currentMatch.bluePlayer.score,
        red_score: currentMatch.redPlayer.score,
        blue_penalties: currentMatch.bluePlayer.penalties,
        red_penalties: currentMatch.redPlayer.penalties,
      });
      
      toast({
        title: "Match saved",
        description: "Match result has been recorded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save match result",
        variant: "destructive",
      });
    }
  };

  const addPoints = (player: "blue" | "red", points: number) => {
    setCurrentMatch((prev) => {
      const updatedMatch = {
        ...prev,
        [player === "blue" ? "bluePlayer" : "redPlayer"]: {
          ...prev[player === "blue" ? "bluePlayer" : "redPlayer"],
          score: prev[player === "blue" ? "bluePlayer" : "redPlayer"].score + points,
        },
      };

      if (updatedMatch[player === "blue" ? "bluePlayer" : "redPlayer"].score >= 12) {
        handleMatchEnd(player);
        return { ...updatedMatch, winner: player };
      }

      return updatedMatch;
    });
  };

  const addPenalty = (player: "blue" | "red") => {
    setCurrentMatch((prev) => {
      const updatedMatch = {
        ...prev,
        [player === "blue" ? "bluePlayer" : "redPlayer"]: {
          ...prev[player === "blue" ? "bluePlayer" : "redPlayer"],
          penalties: prev[player === "blue" ? "bluePlayer" : "redPlayer"].penalties + 1,
        },
      };

      if (updatedMatch[player === "blue" ? "bluePlayer" : "redPlayer"].penalties >= 5) {
        handleMatchEnd(player === "blue" ? "red" : "blue");
        return { ...updatedMatch, winner: player === "blue" ? "red" : "blue" };
      }

      return updatedMatch;
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card p-6">
          <div className="text-center mb-6">
            <Badge variant="outline" className="mb-2">Round {currentMatch.round}</Badge>
            <h1 className="text-2xl font-bold">Current Match</h1>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Blue Player */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="player-name text-tkd-blue">{currentMatch.bluePlayer.name}</h2>
                <div className="score-display text-tkd-blue">
                  {currentMatch.bluePlayer.score}
                </div>
                <div className="text-sm text-muted-foreground">
                  Penalties: {currentMatch.bluePlayer.penalties}
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => addPoints("blue", 1)}
                  className="w-full"
                  variant="outline"
                >
                  +1 Point
                </Button>
                <Button
                  onClick={() => addPoints("blue", 2)}
                  className="w-full"
                  variant="outline"
                >
                  +2 Points
                </Button>
                <Button
                  onClick={() => addPoints("blue", 3)}
                  className="w-full"
                  variant="outline"
                >
                  +3 Points
                </Button>
                <Button
                  onClick={() => addPenalty("blue")}
                  variant="destructive"
                  className="w-full"
                >
                  Add Penalty
                </Button>
              </div>
            </div>

            {/* Center Section */}
            <div className="flex items-center justify-center">
              <div className="text-6xl font-bold text-muted-foreground">VS</div>
            </div>

            {/* Red Player */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="player-name text-tkd-red">{currentMatch.redPlayer.name}</h2>
                <div className="score-display text-tkd-red">
                  {currentMatch.redPlayer.score}
                </div>
                <div className="text-sm text-muted-foreground">
                  Penalties: {currentMatch.redPlayer.penalties}
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  onClick={() => addPoints("red", 1)}
                  className="w-full"
                  variant="outline"
                >
                  +1 Point
                </Button>
                <Button
                  onClick={() => addPoints("red", 2)}
                  className="w-full"
                  variant="outline"
                >
                  +2 Points
                </Button>
                <Button
                  onClick={() => addPoints("red", 3)}
                  className="w-full"
                  variant="outline"
                >
                  +3 Points
                </Button>
                <Button
                  onClick={() => addPenalty("red")}
                  variant="destructive"
                  className="w-full"
                >
                  Add Penalty
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Matches;
