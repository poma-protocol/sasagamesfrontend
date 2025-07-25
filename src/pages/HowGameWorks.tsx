import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gamepad2, Trophy, Shield, Lock, Zap, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export function HowGameWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-6">
            HOW IT WORKS
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
            Register your game and create blockchain-powered challenges to reward your players
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Step 1: Game Details */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" className="w-fit mx-auto mb-2">STEP 1</Badge>
              <CardTitle className="text-xl">Enter Game Details</CardTitle>
              <CardDescription>
                Provide your game's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-primary">Game Information</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Game name and category</li>
                  <li>• Upload game image/logo</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Add Challenges */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" className="w-fit mx-auto mb-2">STEP 2</Badge>
              <CardTitle className="text-xl">Define Challenges</CardTitle>
              <CardDescription>
                Create rewardable in-game actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-primary">Challenge Setup</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Name your challenge</li>
                  <li>• Enter smart contract address and ABI</li>
                  <li>• Map to smart contract events</li>
                  <li>• Define player address variables</li>
                  <li>• Set tracking parameters</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Create Battles */}
          <Card className="border-primary/20 bg-card/50 backdrop-blur-sm hover-glow transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" className="w-fit mx-auto mb-2">STEP 3</Badge>
              <CardTitle className="text-xl">Launch Battles</CardTitle>
              <CardDescription>
                Create reward competitions for players
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-primary">Battle Configuration</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Set completion goals</li>
                  <li>• Define ETH rewards</li>
                  <li>• Configure start/end dates</li>
                  <li>• Add instructions for players</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-4">
              SECURE & AUTOMATED
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">
              Built with blockchain security and smart contract automation for transparent, trustless rewards
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Smart Contract Security */}
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Lock className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl">Smart Contract Escrow</CardTitle>
                </div>
                <CardDescription>
                  Battle rewards are securely locked in our smart contracts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    • Funds are held in audited smart contracts, not personal accounts
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • No risk of organizers running away with rewards
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Transparent, verifiable on blockchain
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Immutable reward distribution rules
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Automatic Distribution */}
            <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <CardTitle className="text-xl">Automatic Rewards</CardTitle>
                </div>
                <CardDescription>
                  Players receive rewards instantly upon challenge completion
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    • Real-time monitoring of blockchain events
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Instant reward distribution upon goal completion
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • No manual intervention required
                  </p>
                  <p className="text-sm text-muted-foreground">
                    • Guaranteed payouts for successful players
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-heading font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto font-sans">
            Register your game and start rewarding your players with blockchain-powered challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90">
              <Link to="/game-admin/register-game" className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Register Your Game
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/game-admin/manage-games" className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5" />
                My Games
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}