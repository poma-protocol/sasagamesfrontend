import { useState, useEffect, Suspense } from "react";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BattleCard } from "@/components/BattleCard";
import {
  Trophy,
  Users,
  Clock,
  Zap,
  Target,
  Star,
  ArrowRight,
  PlayCircle,
  Settings
} from "lucide-react";
import heroImage from "@/assets/hero-gaming.jpg";
import { FeaturedDeal } from "@/types";

// Mock data for demonstration
const mockStats = {
  totalPlaytime: "2.5M",
  rewardsDistributed: "150K",
  activeBattles: 42,
  totalPlayers: "75K"
};

const testimonials = [
  {
    name: "Alex Chen",
    role: "Pro Gamer",
    content: "SasaGames has revolutionized how I approach gaming. Earning real rewards while playing my favorite games is incredible!",
    avatar: "/api/placeholder/60/60"
  },
  {
    name: "Sarah Johnson",
    role: "Game Developer",
    content: "The platform makes it so easy to engage our players with meaningful challenges and rewards. Our retention rates have skyrocketed!",
    avatar: "/api/placeholder/60/60"
  },
  {
    name: "Mike Torres",
    role: "Blockchain Enthusiast",
    content: "Finally, a Web3 gaming platform that actually delivers on its promises. The smart contract integration is seamless.",
    avatar: "/api/placeholder/60/60"
  }
];

function FeaturedDeals() {
  //@ts-ignore
  const { featured } = useLoaderData(); // Shows error but is how the docs did it

  const loadingElement = <div className="font-rajdhani text-xl md:text-2xl text-muted-foreground mb-8 text-center">
    Getting featured deals...
  </div>;

  const errorElement = <div className="font-rajdhani text-xl md:text-2xl text-muted-foreground mb-8 text-center">
    Could not get featured deals
  </div>

  const noFeaturedDeals = <div className="font-rajdhani text-xl md:text-2xl text-muted-foreground mb-8 text-center">
    No featured deals
  </div>

  return (
    <Suspense fallback={loadingElement}>
      <Await
        resolve={featured}
        errorElement={errorElement}
        children={(resolvedFeaturedItems: FeaturedDeal[]) => {
          if (resolvedFeaturedItems.length <= 0) {
            return noFeaturedDeals
          }

          return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {resolvedFeaturedItems.map((battle) => (
                <BattleCard key={battle.id} {...battle} />
              ))}
            </div>
          );
        }}
      />
    </Suspense>
  );
}

export function LandingPage() {
  const [typedText, setTypedText] = useState("");
  const fullText = "Play. Earn. Repeat.";
  const navigate = useNavigate();

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const handleAdminLogin = () => {
    navigate("/game-admin/login");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Gaming Hero"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-6">
            <span className="text-gradient">{typedText}</span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="font-rajdhani text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The ultimate Web3 gaming platform where developers create challenges and players earn real rewards for completing blockchain-based quests.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/battles">
              <Button variant="outline" size="lg" className="btn-neon text-lg px-8 py-4 font-rajdhani font-bold">
                <Trophy className="mr-2 h-6 w-6" />
                Browse Battles
              </Button>
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-pulse">
          <Zap className="h-8 w-8 text-accent opacity-60" />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-1000">
          <Target className="h-6 w-6 text-neon-magenta opacity-60" />
        </div>
        <div className="absolute bottom-40 left-20 animate-pulse delay-2000">
          <Star className="h-10 w-10 text-neon-purple opacity-60" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4 text-gradient">
              GAMING REVOLUTION
            </h2>
            <p className="font-rajdhani text-xl text-muted-foreground">
              Join thousands of players earning real rewards
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center p-6 glow-primary">
              <CardContent className="space-y-2">
                <Clock className="h-8 w-8 text-accent mx-auto" />
                <div className="font-orbitron font-bold text-3xl text-foreground">
                  {mockStats.totalPlaytime}
                </div>
                <div className="font-rajdhani text-muted-foreground">
                  Hours Played
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 glow-primary">
              <CardContent className="space-y-2">
                <Trophy className="h-8 w-8 text-neon-magenta mx-auto" />
                <div className="font-orbitron font-bold text-3xl text-foreground">
                  {mockStats.rewardsDistributed} ETH
                </div>
                <div className="font-rajdhani text-muted-foreground">
                  Rewards Distributed
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 glow-primary">
              <CardContent className="space-y-2">
                <Zap className="h-8 w-8 text-neon-blue mx-auto" />
                <div className="font-orbitron font-bold text-3xl text-foreground">
                  {mockStats.activeBattles}
                </div>
                <div className="font-rajdhani text-muted-foreground">
                  Active Battles
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 glow-primary">
              <CardContent className="space-y-2">
                <Users className="h-8 w-8 text-neon-purple mx-auto" />
                <div className="font-orbitron font-bold text-3xl text-foreground">
                  {mockStats.totalPlayers}
                </div>
                <div className="font-rajdhani text-muted-foreground">
                  Total Players
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Battles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-orbitron font-bold text-4xl md:text-5xl mb-4">
              FEATURED <span className="text-gradient">BATTLES</span>
            </h2>
            <p className="font-rajdhani text-xl text-muted-foreground">
              Join the most exciting challenges and earn massive rewards
            </p>
          </div>

          <FeaturedDeals />

          <div className="text-center">
            <Link to="/battles">
              <Button size="lg" className="btn-neon font-rajdhani font-bold">
                View All Battles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-orbitron font-bold text-4xl md:text-6xl mb-6">
              READY TO <span className="text-gradient">DOMINATE</span>?
            </h2>
            <p className="font-rajdhani text-xl text-muted-foreground mb-8">
              Join the future of gaming where skill meets reward. Start your journey today and turn your gaming passion into profit.
            </p>
            <Link to="/battles">
              <Button size="lg" className="btn-gradient text-xl px-12 py-6 font-rajdhani font-bold pulse-glow" onClick={handleAdminLogin}>
                START PLAYING NOW
                <Zap className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits of registering game on platform */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <img
              src={"./game-dev-workspace.jpg"}
              alt={"Game developers image"}
              className="w-full h-48 object-cover mb-5 rounded-lg"
            />
          <div className="max-w-3xl mx-auto">
            <h2 className="font-orbitron font-bold text-4xl md:text-6xl mb-6">
              FOR <span className="text-gradient">GAME DEVELOPERS</span>?
            </h2>
            <p className="font-rajdhani text-xl text-muted-foreground mb-8">
              Transform your game into a Web3 powerhouse. Create engaging challenges, reward loyal players, and boost retention with blockchain-powered competitions that players can't resist.
            </p>
            <Link to="/battles">
              <Button size="lg" className="btn-gradient text-xl px-12 py-6 font-rajdhani font-bold pulse-glow">
                <Link to="/game-admin/login" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  GET STARTED AS GAME ADMIN
                </Link>
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
