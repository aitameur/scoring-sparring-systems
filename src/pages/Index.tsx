import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="glass-card w-full max-w-lg p-8 space-y-6">
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
    </div>
  );
};

export default Index;