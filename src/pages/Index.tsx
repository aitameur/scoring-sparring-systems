import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { getMatches } from "../services/api";

interface MatchHistory {
  id: number;
  blue_player: string;
  red_player: string;
  winner: string;
  blue_score: number;
  red_score: number;
  created_at: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [matchHistory, setMatchHistory] = useState<MatchHistory[]>([]);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      try {
        const matches = await getMatches();
        setMatchHistory(matches);
      } catch (error) {
        console.error("Failed to fetch match history:", error);
      }
    };

    fetchMatchHistory();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="glass-card w-full max-w-lg p-8 space-y-6 mb-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter">
            Taekwondo Tournament Manager
          </h1>
          <p className="text-muted-foreground">
            Create and manage your tournament brackets with ease
          </p>
        </div>
        <div className="grid gap-4">
          <Button
            onClick={() => navigate("/create-tournament")}
            className="w-full h-12 text-lg"
          >
            Create Tournament
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/matches")}
            className="w-full h-12 text-lg"
          >
            View Matches
          </Button>
        </div>
      </Card>

      {matchHistory.length > 0 && (
        <Card className="glass-card w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Match History</h2>
          <div className="space-y-4">
            {matchHistory.map((match) => (
              <div
                key={match.id}
                className="p-4 border rounded-lg bg-white/50 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">
                    {match.blue_player} vs {match.red_player}
                  </span>
                  <span className={`font-bold ${
                    match.winner === 'blue' ? 'text-blue-600' : 'text-red-600'
                  }`}>
                    {match.winner === 'blue' ? match.blue_player : match.red_player} Won
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(match.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default Index;