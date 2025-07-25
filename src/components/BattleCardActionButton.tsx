import { useAccount } from "wagmi";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { Dialog, DialogClose, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";

interface BattleCardActionButtonProps {
    id: number,
    status: string,
    playerCount: number,
    maxPlayers: number,
    joined: boolean,
}

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const storeOperatorAddress = z.object({
    operatorAddress: z.string({ message: "Please enter operator address" }).regex(/^(0x)?[0-9a-fA-F]{40}$/, { message: "Operator address must be a valid ethereum address" })
})

export default function BattleCardActionButton(props: BattleCardActionButtonProps) {
    const { address } = useAccount();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [enterOperatorAddress, setEnterOperatorAddress] = useState<boolean>(false);
    const [joined, setJoined] = useState<boolean>(props.joined)

    const form = useForm<z.infer<typeof storeOperatorAddress>>({
        resolver: zodResolver(storeOperatorAddress),
    })

    async function handleButtonClick() {
        if (props.status === 'active' && props.playerCount < props.maxPlayers) {
            if (address) {
                try {
                    setLoading(true);

                    // Check if operator wallet for user is stored
                    const operatorWalletres = await axios.get(`${VITE_BACKEND_URL}/activity/operatorAddress`, {
                        params: {
                            activityid: props.id,
                            userwallet: address
                        }
                    });

                    let operatorWallet: string | null = operatorWalletres.data['operatorWallet'];
                    if (!operatorWallet) {
                        setLoading(false);
                        setEnterOperatorAddress(true);
                        return;
                    }

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
            navigate(`/battles/${props.id}`);
        }
    }

    async function submitOperatorAddress(values: z.infer<typeof storeOperatorAddress>) {
        try {
            await axios.post(`${VITE_BACKEND_URL}/activity/operatorAddress`, {
                activity_id: props.id,
                useraddress: address,
                operatoraddress: values.operatorAddress
            });
            toast.success("Operator address saved");
            setEnterOperatorAddress(false);
        } catch (err) {
            console.error("Error storing operator address", err);
            toast.error("Could not store operator address");
        }
    }

    if (enterOperatorAddress === true) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        onClick={handleButtonClick}
                        disabled={joined}
                        className="w-full font-rajdhani font-semibold btn-gradient"
                    >
                        Enter Operator Address
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Enter Operator Address</DialogTitle>
                    </DialogHeader>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(submitOperatorAddress)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="operatorAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Operator Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0x..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Save</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }

    let statusText = "";

    if (joined === true) {
        statusText = "Already Joined Battle"
    } else if (loading === true) {
        statusText = "Joining Battle"
    } else {
        if (props.status === "completed") {
            statusText = "View Results";
        } else if (props.status === "active") {
            if (props.playerCount >= props.maxPlayers) {
                statusText = "Battle Full";
            } else {
                statusText = "Join Battle"
            }
        } else {
            statusText = "View Battle"
        }
    }

    return (
        <Button
            onClick={handleButtonClick}
            disabled={joined}
            className={`w-full font-rajdhani font-semibold ${props.status === "active" ? "btn-gradient" : "btn-neon"
                }`}
            // disabled={props.status === "completed" || props.playerCount >= props.maxPlayers}
        >
            {statusText}
        </Button>
    );
}