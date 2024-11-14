import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const CreateTournament = () => {
  const [players, setPlayers] = useState<string[]>([""]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addPlayer = () => {
    setPlayers([...players, ""]);
  };

  const updatePlayer = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const createTournament = () => {
    const filledPlayers = players.filter((p) => p.trim() !== "");
    if (filledPlayers.length < 2) {
      toast({
        title: "Not enough players",
        description: "Please add at least 2 players to create a tournament.",
        variant: "destructive",
      });
      return;
    }

    // Here we would normally save the tournament data
    toast({
      title: "Tournament created!",
      description: `Created with ${filledPlayers.length} players.`,
    });
    navigate("/matches");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="glass-card p-6">
          <h1 className="text-2xl font-bold mb-6">Create Tournament</h1>
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="space-y-2">
                <Label>Player {index + 1}</Label>
                <Input
                  value={player}
                  onChange={(e) => updatePlayer(index, e.target.value)}
                  placeholder="Enter player name"
                  className="w-full"
                />
              </div>
            ))}
            <Button
              variant="outline"
              onClick={addPlayer}
              className="w-full mt-4"
            >
              Add Player
            </Button>
          </div>
          <Button
            onClick={createTournament}
            className="w-full mt-6"
          >
            Create Tournament
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CreateTournament;