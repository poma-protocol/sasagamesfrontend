import { Link } from "react-router-dom";
import { Zap, Twitter, Github, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-orbitron font-bold">
              <Zap className="h-6 w-6 text-accent" />
              <span className="text-lg text-gradient">SASAGAMES</span>
            </Link>
            <p className="text-muted-foreground font-rajdhani">
              The ultimate Web3 gaming platform where players earn rewards for completing blockchain-based challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">Platform</h3>
            <div className="space-y-2">
              <Link to="/game-admin/login" className="block text-muted-foreground hover:text-accent transition-colors font-rajdhani">
                Get started as game admin
              </Link>
              <Link to="/battles" className="block text-muted-foreground hover:text-accent transition-colors font-rajdhani">
                Browse Battles
              </Link>
              <Link to="/my-battles" className="block text-muted-foreground hover:text-accent transition-colors font-rajdhani">
                My Battles
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">Resources</h3>
            <div className="space-y-2">
              <Link to="/how-it-works" className="block text-muted-foreground hover:text-accent transition-colors font-rajdhani">
                How it Works
              </Link>
              <Link to="mailto:info@sasagames.com" className="block text-muted-foreground hover:text-accent transition-colors font-rajdhani">
                Support
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-orbitron font-bold text-foreground mb-4">Connect</h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com/sasagames"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/poma-protocol/arbitrum-integration"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="mailto:info@sasagames.com"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <div className="space-y-2">
                <Link to="/terms" className="block text-muted-foreground hover:text-accent transition-colors font-rajdhani text-sm">
                  Terms of Service
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-accent transition-colors font-rajdhani text-sm">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground font-rajdhani">
            © {currentYear} SasaGames. All rights reserved. Play. Earn. Repeat.
          </p>
        </div>
      </div>
    </footer>
  );
}