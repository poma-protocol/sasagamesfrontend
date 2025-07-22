import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

interface BattleCardActionButtonProps {
    id: number,
    status: string,
    playerCount: number,
    maxPlayers: number
}

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function BattleCardActionButton(props: BattleCardActionButtonProps) {
    const { address } = useAccount();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    async function handleButtonClick() {
        if (props.status === 'active' && props.playerCount < props.maxPlayers) {
            console.log("I am here");
            if (address) {
                try {
                    setLoading(true);
                    const res = await axios.post(`${VITE_BACKEND_URL}/activity/join`, {
                        activity_id: props.id,
                        player_address: address,
                    });

                    setLoading(false);
                    toast.success("Joined battle");
                } catch (err) {
                    setLoading(false);
                    console.error("Error joining battle");
                    toast.error("Could not join battle");
                }
            } else {
                toast.error("Please connect wallet to join battle");
            }
        } else {
            console.log("I am not there", props.status, props.playerCount, props.maxPlayers);
            navigate(`/battles/${props.id}`);
        }
    }

    return (
        <Button
            onClick={handleButtonClick}
            className={`w-full font-rajdhani font-semibold ${props.status === "active" ? "btn-gradient" : "btn-neon"
                }`}
            // disabled={props.status === "completed" || props.playerCount >= props.maxPlayers}
        >
            {loading == false ? props.status === "completed"
                ? "View Results"
                : props.status === "active"
                    ? props.playerCount >= props.maxPlayers
                        ? "Battle Full"
                        : "Join Battle"
                    : "View Battle": "Joining battle..."}
        </Button>
    );
}