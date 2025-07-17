
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FeaturedDeal } from "@/types";
import { Calendar, Users, Trophy, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface BattleCardProps {
  id?: number;
  name?: string;
  image?: string;
  reward?: number;
  playerCount?: number;
  maxPlayers?: number;
  startDate?: string;
  endDate?: string;
  status?: "upcoming" | "active" | "completed";
  onJoin?: (id: number) => void;
  onView?: (id: number) => void;
}

const ACTIVITY_IMAGE_URL = import.meta.env.VITE_ACTIVITY_IMAGE_URL;

export function BattleCard(props: BattleCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "upcoming":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "completed":
        return "bg-gradient-to-r from-gray-500 to-slate-500";
      default:
        return "bg-gradient-to-r from-primary to-primary-end";
    }
  };

  const handleCardClick = () => {
    if (props.id) {
      navigate(`/battles/${props.id}`);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (props.status === "active" && props.id) {
      props.onJoin?.(props.id);
    } else if (props.id) {
      navigate(`/battles/${props.id}`);
    }
  };

  return (
    <Card className="game-card group cursor-pointer" onClick={handleCardClick}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={props.image ? `${ACTIVITY_IMAGE_URL}/${props.image}` : "/placeholder.svg"}
            alt={props.name || "Battle"}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Status Badge */}
          <Badge
            className={`absolute top-3 right-3 font-rajdhani font-semibold text-white ${getStatusColor(
              props.status || "active"
            )}`}
          >
            {(props.status || "active").toUpperCase()}
          </Badge>

          {/* Reward */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="font-orbitron font-bold text-white text-lg">
              {props.reward || 0} ETH
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Battle Name */}
        <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:text-accent transition-colors">
          {props.name || "Battle"}
        </h3>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="font-rajdhani">
              {props.playerCount || 0}/{props.maxPlayers || 0}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span className="font-rajdhani text-sm">
              {props.status === "active" ? "Ends" : "Starts"} {props.status === "active" ? props.endDate : props.startDate}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="font-rajdhani">{props.startDate || ""}</span>
          </div>
          <span className="font-rajdhani">to</span>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span className="font-rajdhani">{props.endDate || ""}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleButtonClick}
          className={`w-full font-rajdhani font-semibold ${
            props.status === "active" ? "btn-gradient" : "btn-neon"
          }`}
          disabled={props.status === "completed" || (props.playerCount || 0) >= (props.maxPlayers || 0)}
        >
          {props.status === "completed"
            ? "View Results"
            : props.status === "active"
            ? (props.playerCount || 0) >= (props.maxPlayers || 0)
              ? "Battle Full"
              : "Join Battle"
            : "View Battle"}
        </Button>
      </CardContent>
    </Card>
  );
}
