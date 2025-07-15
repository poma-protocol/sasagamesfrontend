
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Trophy, Users, Zap } from "lucide-react";

export function HowItWorksPage() {
  const steps = [
    {
      icon: Gamepad2,
      title: "Register Your Game",
      description: "Submit your game with smart contract details and define challenges players can compete in.",
      badge: "Step 1"
    },
    {
      icon: Users,
      title: "Players Join Battles",
      description: "Gamers discover your challenges and join battles by staking tokens to compete.",
      badge: "Step 2"
    },
    {
      icon: Trophy,
      title: "Complete Challenges",
      description: "Players complete in-game objectives tracked by smart contracts for fair verification.",
      badge: "Step 3"
    },
    {
      icon: Zap,
      title: "Win Rewards",
      description: "Winners are automatically determined and receive their rewards through smart contracts.",
      badge: "Step 4"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent mb-6">
            HOW IT WORKS
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SASAGAMES connects game developers with competitive players through blockchain-verified challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="border-primary/20 bg-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-end flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <Badge variant="secondary" className="w-fit mx-auto mb-2">
                  {step.badge}
                </Badge>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-secondary/20 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6">
            Join the future of competitive gaming with verified, fair battles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/battles" 
              className="bg-gradient-to-r from-primary to-primary-end text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Browse Battles
            </a>
            <a 
              href="/register-game" 
              className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
            >
              Register Your Game
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
