
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, Target } from "lucide-react";

export function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "All battles are verified through smart contracts, ensuring fair play and automatic reward distribution."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We're pioneering the future of competitive gaming with blockchain technology and decentralized verification."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a global community of gamers and developers united by competitive spirit and fair play."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Committed to providing the best platform for skill-based gaming competitions with real rewards."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent mb-6">
            ABOUT SASAGAMES
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            We're revolutionizing competitive gaming by creating a transparent, blockchain-powered platform 
            where skill meets reward in verified battles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              SASAGAMES exists to create the most fair and transparent competitive gaming ecosystem. 
              We believe that skilled players deserve to be rewarded for their achievements, and game 
              developers should have new ways to engage their communities.
            </p>
            <p className="text-lg text-muted-foreground">
              By leveraging blockchain technology, we eliminate the possibility of cheating or unfair 
              practices, creating a level playing field where only skill determines the winner.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg text-muted-foreground">
              We envision a future where competitive gaming is not just entertainment, but a legitimate 
              way for skilled players to earn rewards based on their abilities. A world where every 
              achievement is verifiable and every competition is fair.
            </p>
            <p className="text-lg text-muted-foreground">
              Through our platform, we're building bridges between game developers and competitive 
              players, creating new opportunities for both communities to thrive.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-primary/20 bg-card text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary-end flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-secondary/20 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-muted-foreground mb-6">
            Be part of the revolution in competitive gaming. Whether you're a player or developer, 
            there's a place for you in our ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/battles" 
              className="bg-gradient-to-r from-primary to-primary-end text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Competing
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
