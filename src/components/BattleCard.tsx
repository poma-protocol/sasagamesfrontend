
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FeaturedDeal } from "@/types";
import { Calendar, Users, Trophy, Clock, Eye } from "lucide-react";
import BattleCardActionButton from "./BattleCardActionButton";
import { useAccount } from "wagmi";
import { Link } from "react-router-dom";

const ACTIVITY_IMAGE_URL = import.meta.env.VITE_ACTIVITY_IMAGE_URL;

export function BattleCard(props: FeaturedDeal) {
  const { address } = useAccount();
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

  let joined = false;
  if (address) {
    joined = props.players.some((p) => p.toLowerCase() === address.toLowerCase());
  }

  return (
    <Card className="game-card group cursor-pointer">
      <CardHeader className="p-0">
        <Link to={`/battles/${props.id}`}>
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
        </Link>
      </CardHeader>

      <CardContent className="p-6 space-y-4">
        {/* Battle Name */}
        <div className="flex flex-row justify-between items-center">
          <Link to={`/battles/${props.id}`}>
            <h3 className="font-orbitron font-bold text-xl text-foreground group-hover:text-accent transition-colors">
              {props.name || "Battle"}
            </h3>
          </Link>
          <Link to={`/battles/${props.id}`}>
            <Eye className="h-5 w-5 text-white hover:text-accent" />
          </Link>
        </div>

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
        <BattleCardActionButton
          playerCount={props.playerCount}
          maxPlayers={props.maxPlayers}
          id={props.id}
          status={props.status}
          joined={joined}
          commissionPaid={props.commissionPaid}
          rewardLocked={props.rewardLocked}
        />
      </CardContent>
    </Card>
  );
}
