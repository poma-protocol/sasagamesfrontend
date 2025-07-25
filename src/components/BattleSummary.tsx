import { Gamepad2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount } from "wagmi";
import { parseFloat } from "@/helpers";

interface DealSummaryProps {
    rewardPerUser: number,
    maxUsers: number,
    totalFunding: number,
    platformCommission: number,
    totalRequired: number,
}

export default function BattleSummary(props: DealSummaryProps) {
    const {isConnected} = useAccount();

    return (
        <section className="space-y-6">
            {/* Deal Summary */}
            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Gamepad2 className="h-6 w-6" />
                        Battle Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-slate-400">Reward per User:</span>
                            <span className="text-white font-semibold">
                                {parseFloat(props.rewardPerUser)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Max Users:</span>
                            <span className="text-white font-semibold">
                                {props.maxUsers}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Total Rewards:</span>
                            <span className="text-white font-semibold">
                                {parseFloat(props.totalFunding)} ETH
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-400">Platform Commission (10%):</span>
                            <span className="text-slate-400 font-semibold">
                                {parseFloat(props.platformCommission)} ETH
                            </span>
                        </div>
                        <div className="border-t border-slate-600 pt-3">
                            <div className="flex justify-between">
                                <span className="text-slate-400">Total Required:</span>
                                <span className="text-yellow-400 font-bold text-lg">
                                    {parseFloat(props.totalRequired)} ETH
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Warning */}
            <Card className="bg-amber-400/5 border-amber-400/20">
                <CardHeader>
                    <CardTitle className="text-amber-400 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Important
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-slate-300 text-sm space-y-2">
                        <p>• You'll need to send {parseFloat(props.totalRequired)} ETH to the treasury to activate this deal</p>
                        <p>• Includes {parseFloat(props.platformCommission)} platform commission (10%)</p>
                        <p>• Funds are held securely until deal completion</p>
                        <p>• Unused rewards are refunded after deal ends</p>
                    </div>
                </CardContent>
            </Card>

            {/* Connection Warning */}
            {!isConnected && (
                <section>
                    <Card className="bg-red-400/5 border-red-400/20">
                        <CardContent className="pt-6">
                            <div className="text-red-400 text-sm text-center">
                                Connect your wallet to create battle
                            </div>
                        </CardContent>
                    </Card>
                </section>
            )}

            {/* Warning */}
            <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Support
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-slate-300 text-sm space-y-2">
                        <p>• If you have any issue creating a battle you can reach out to us at info@pomaprotocol.com</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}