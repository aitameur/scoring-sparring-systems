import { Button } from "@/components/ui/button";
import { Player } from "@/types/match";

interface PlayerPanelProps {
  player: Player;
  color: "blue" | "red";
  onAddPoints: (points: number) => void;
  onAddPenalty: () => void;
}

const PlayerPanel = ({ player, color, onAddPoints, onAddPenalty }: PlayerPanelProps) => {
  const colorClass = color === "blue" ? "text-tkd-blue" : "text-tkd-red";

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className={`player-name ${colorClass}`}>{player.name}</h2>
        <div className={`score-display ${colorClass}`}>
          {player.score}
        </div>
        <div className="text-sm text-muted-foreground">
          Penalties: {player.penalties}
        </div>
      </div>
      <div className="space-y-2">
        <Button
          onClick={() => onAddPoints(1)}
          className="w-full"
          variant="outline"
        >
          +1 Point
        </Button>
        <Button
          onClick={() => onAddPoints(2)}
          className="w-full"
          variant="outline"
        >
          +2 Points
        </Button>
        <Button
          onClick={() => onAddPoints(3)}
          className="w-full"
          variant="outline"
        >
          +3 Points
        </Button>
        <Button
          onClick={onAddPenalty}
          variant="destructive"
          className="w-full"
        >
          Add Penalty
        </Button>
      </div>
    </div>
  );
};

export default PlayerPanel;