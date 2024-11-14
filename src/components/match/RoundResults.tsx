import { Badge } from "@/components/ui/badge";
import { RoundResult } from "@/types/match";

interface RoundResultsProps {
  roundResults: (RoundResult | null)[];
}

const RoundResults = ({ roundResults }: RoundResultsProps) => {
  return (
    <div className="flex gap-4 justify-center mb-4">
      {roundResults.map((result, index) => (
        <div key={index} className="text-center">
          <Badge variant="outline" className="mb-2">Round {index + 1}</Badge>
          {result && (
            <div className={`text-sm font-semibold ${
              result.winner === "blue" ? "text-tkd-blue" : "text-tkd-red"
            }`}>
              Winner: {result.winner === "blue" ? "Blue" : "Red"}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoundResults;