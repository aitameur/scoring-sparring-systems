import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { saveMatch } from "../services/api";
import PlayerPanel from "@/components/match/PlayerPanel";
import RoundResults from "@/components/match/RoundResults";
import type { Match, RoundResult } from "@/types/match";

const Matches = () => {
  const navigate = useNavigate();
  const [currentMatch, setCurrentMatch] = useState<Match>({
    id: 1,
    round: 1,
    bluePlayer: { name: "Player 1", score: 0, penalties: 0 },
    redPlayer: { name: "Player 2", score: 0, penalties: 0 },
  });

  const [roundResults, setRoundResults] = useState<(RoundResult | null)[]>([null, null]);
  const { toast } = useToast();

  const handleRoundEnd = async (winner: "blue" | "red") => {
    const currentRoundIndex = currentMatch.round - 1;
    const newRoundResults = [...roundResults];
    newRoundResults[currentRoundIndex] = {
      winner,
      blueScore: currentMatch.bluePlayer.score,
      redScore: currentMatch.redPlayer.score,
      bluePenalties: currentMatch.bluePlayer.penalties,
      redPenalties: currentMatch.redPlayer.penalties,
    };
    setRoundResults(newRoundResults);

    // Check if player has won both rounds
    if (currentRoundIndex > 0 && newRoundResults[0]?.winner === winner) {
      try {
        await saveMatch({
          tournament_id: 1,
          blue_player: currentMatch.bluePlayer.name,
          red_player: currentMatch.redPlayer.name,
          winner: winner,
          blue_score: currentMatch.bluePlayer.score,
          red_score: currentMatch.redPlayer.score,
          blue_penalties: currentMatch.bluePlayer.penalties,
          red_penalties: currentMatch.redPlayer.penalties,
        });
        
        toast({
          title: "Match completed",
          description: `${winner === "blue" ? "Blue" : "Red"} player wins the match!`,
        });

        // Navigate back to index after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save match result",
          variant: "destructive",
        });
      }
    } else if (currentMatch.round === 1) {
      // Start next round
      setCurrentMatch(prev => ({
        ...prev,
        round: 2,
        bluePlayer: { ...prev.bluePlayer, score: 0, penalties: 0 },
        redPlayer: { ...prev.redPlayer, score: 0, penalties: 0 },
      }));
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
        handleRoundEnd(player);
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
        handleRoundEnd(player === "blue" ? "red" : "blue");
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

          <RoundResults roundResults={roundResults} />

          <div className="grid grid-cols-3 gap-6">
            <PlayerPanel
              player={currentMatch.bluePlayer}
              color="blue"
              onAddPoints={(points) => addPoints("blue", points)}
              onAddPenalty={() => addPenalty("blue")}
            />

            <div className="flex items-center justify-center">
              <div className="text-6xl font-bold text-muted-foreground">VS</div>
            </div>

            <PlayerPanel
              player={currentMatch.redPlayer}
              color="red"
              onAddPoints={(points) => addPoints("red", points)}
              onAddPenalty={() => addPenalty("red")}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Matches;