import { useAccount, useSendTransaction } from "wagmi";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import ABI from "../../coin.json";
import { arbitrumSepolia, arbitrum } from 'viem/chains';
import axios from "axios";
import { parseEther } from "viem";
import { API_CONFIG } from "@/config";

interface ActivateButtonProps {
    activityID: number,
    activated: boolean,
    commissionPaid: boolean,
    rewardPerUser: number,
    maxUsers: number,
}


const CHAIN_ID = import.meta.env.VITE_ENVIRONMENT === "prod" ? 42161 : 421614;
const CHAIN = import.meta.env.VITE_ENVIRONMENT === "prod" ? arbitrum : arbitrumSepolia;
const COMMISSION = 0.1;

export default function ActivateDealButton(props: ActivateButtonProps) {
    const { isConnected, address } = useAccount();
    const {sendTransactionAsync} = useSendTransaction();
    const [loading, setLoading] = useState<boolean>(false);
    const [activated, setActivated] = useState<boolean>(props.activated);
    const [commissionPaid, setCommissionPaid] = useState<boolean>(props.commissionPaid);
    const token = localStorage.getItem("accessToken");

    const activateDeal = async () => {
        try {
            if (!API_CONFIG.CONTRACT_ADDRESS || !API_CONFIG.COMMISSION_WALLET) {
                toast.error("Could not get VITE_CONTRACT or VITE_COMMISION_WALLET");
                return;
            }

            if (activated === true && commissionPaid == true) {
                toast.info("Battle has already been activated");
                return;
            }

            setLoading(true);

            if (commissionPaid === false) {
                // Send commission to commision account
                const commissionTxHash = await sendTransactionAsync({to: API_CONFIG.COMMISSION_WALLET, value: parseEther((props.rewardPerUser * props.maxUsers * COMMISSION).toString())})

                // Send amount to our wallet
                await axios.post(`${API_CONFIG.BACKEND_URL}/activity/commission`, {
                    activityID: props.activityID,
                    txHash: commissionTxHash
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCommissionPaid(true);

                toast.success("Commission has been sent successfully");
            }

            if (activated === false) {
                // Send amount to contract
                const rewardSentTxHash = await sendTransactionAsync({to: API_CONFIG.CONTRACT_ADDRESS, value: parseEther((props.rewardPerUser * props.maxUsers).toString())})

                // Send amount to our wallet
                await axios.post(`${API_CONFIG.BACKEND_URL}/activity/reward`, {
                    activityID: props.activityID,
                    txHash: rewardSentTxHash,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setActivated(true);

                toast.success("Reward has been locked in contract successfully");
            }

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error activating deal", err);
            toast.error("Could not activate deal");
        }
    }

    return (
        activated !== true ? (
            <Button
                type="submit"
                disabled={!isConnected || (activated && commissionPaid) || loading}
                className="w-full font-rajdhani font-semibold btn-gradient"
                onClick={activateDeal}
            >
                {!isConnected
                    ? "Connect Wallet To Activate Battle"
                    : commissionPaid === false
                        ? "Pay Commission"
                            : loading === true
                                ? "Loading ..."
                                : "Activate Battle"}
            </Button>
        ) : null
    );
}