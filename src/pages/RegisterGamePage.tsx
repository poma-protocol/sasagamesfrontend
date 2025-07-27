
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Upload, FileText, AlertCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";
import { gameSchema, GameFormData } from "@/types";
import InfoHover from "@/components/InfoHover";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export function RegisterGamePage() {
    const form = useForm<GameFormData>({
        resolver: zodResolver(gameSchema),
        defaultValues: {
            name: "",
            category: "",
            image: null,
            challenges: [{
                name: "",
                player_address_variable: "",
                function_name: "",
                useForwarder: false,
                forwarderAddress: null,
                forwarderABI: null,
                methodDataAttributeName: null,
                wantedData: null,
                countItems: false,
                contract_address: "",
                abi: null,
            }],
        },
    });
    const token = localStorage.getItem("accessToken");

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "challenges",
    });
    async function saveImage(file: File): Promise<string | null> {
        try {
            const formData = new FormData();
            formData.append("image", file);
            const response = await axios.post(`${BACKEND_URL}/game/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status !== 201) {
                return null;
            }
            return response.data;
        }
        catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
            return null;
        }
    }
    const onSubmit = async (data: GameFormData) => {
        try {
             if (!token) {
                toast.error("You must be logged in to upload an image.");
                return null;
            }
            if (data.image instanceof File) {
                const imageUrl = await saveImage(data.image);
                if (!imageUrl) {
                    toast.error("Failed to upload game image.");
                    return;
                }
                const response = await axios.post(`${BACKEND_URL}/game/register`, {
                    ...data,
                    image: imageUrl,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                );
                if (response.status === 201) {
                    toast.success("Game registered successfully!");
                    form.reset();
                } else {
                    toast.error("Failed to register game.");
                }
            } else {
                toast.error("Please upload a valid game image.");
            }
        }
        catch (error) {
            console.error("Error registering game:", error);
            toast.error("Failed to register game.");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="container mx-auto px-4 py-8 grid md:grid-cols-3 gap-2">
                <div className="max-w-4xl col-span-2">
                    <Card className="border-primary/20 bg-card">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-end bg-clip-text text-transparent">
                                REGISTER NEW GAME
                            </CardTitle>
                            <CardDescription>
                                Register your game and define challenges for battles
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Game Information */}
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-semibold">Game Information</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Game Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter game name" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="category"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category</FormLabel>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="action">Action</SelectItem>
                                                                <SelectItem value="adventure">Adventure</SelectItem>
                                                                <SelectItem value="racing">Racing</SelectItem>
                                                                <SelectItem value="strategy">Strategy</SelectItem>
                                                                <SelectItem value="puzzle">Puzzle</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <FormField
                                            control={form.control}
                                            name="image"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Game Image</FormLabel>
                                                    <div className="flex items-center gap-4">
                                                        <FormControl>
                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        field.onChange(file);
                                                                    }
                                                                }}
                                                            />
                                                        </FormControl>

                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        {/* <FormField
                                            control={form.control}
                                            name="contract_address"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contract Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="0x..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}

                                        {/* <FormField
                                            control={form.control}
                                            name="abi"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Contract ABI</FormLabel>
                                                    <div className="flex items-center gap-4">
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder='[{"inputs":[{"name":"x","type":"uint256"}],"name":"increment","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]'
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                     
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        /> */}
                                    </div>

                                    <Separator />

                                    {/* Challenges */}
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h2 className="text-xl font-semibold flex flex-row gap-2">
                                                <span>Challenges</span>
                                                <InfoHover info="A challenge describes an action that you want to track in the game. This action creates a transaction on chain" />
                                            </h2>
                                            <Button
                                                type="button"
                                                onClick={() => append({
                                                    name: "",
                                                    player_address_variable: "",
                                                    function_name: "",
                                                    useForwarder: false,
                                                    forwarderAddress: "",
                                                    forwarderABI: "",
                                                    methodDataAttributeName: "",
                                                    wantedData: "",
                                                    countItems: false,
                                                    contract_address: "",
                                                    abi: null,
                                                })}
                                                variant="outline"
                                                size="sm"
                                            >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Challenge
                                            </Button>
                                        </div>

                                        {fields.map((field, index) => (
                                            <Card key={field.id} className="border-secondary/20 bg-secondary/5">
                                                <CardHeader>
                                                    <div className="flex justify-between items-center">
                                                        <CardTitle className="text-lg">Challenge {index + 1}</CardTitle>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => remove(index)}
                                                            disabled={fields.length === 1}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.name`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Challenge Name</span>
                                                                        <InfoHover info="Name of the action you want to track. It can be anything" />
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., Survive 100 Waves" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.contract_address`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Contract Address</span>
                                                                        <InfoHover info="Address of the smart contract that's called when player performs action" />
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="0x..." {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name={`challenges.${index}.abi`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="flex flex-row gap-2 items-center">
                                                                    <span>Contract ABI</span>
                                                                    <InfoHover info="ABI of the smart contract called" />
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Textarea
                                                                        placeholder='[{"inputs":[{"name":"x","type":"uint256"}],"name":"increment","outputs":[{"name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]'
                                                                        {...field}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.function_name`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Function Name</span>
                                                                        <InfoHover info="The name of the smart contract function that's executed when the player performs the action" />
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., completeWave" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.player_address_variable`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Player Address Variable</span>
                                                                        <InfoHover info="The name of the parameter in the smart contract function executed by the action that stores the player's address" />
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., playerAddress" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name={`challenges.${index}.useForwarder`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="flex flex-row gap-2 items-center">
                                                                    <span>Use Forwarder</span>
                                                                    <InfoHover info="There are games that use a proxy smart contract that forwards transactions to other contracts responsible for handling in game actions. If you use a proxy contract please check this and enter its details below" />
                                                                </FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {form.watch(`challenges.${index}.useForwarder`) && (
                                                        <div className="grid grid-cols-1 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`challenges.${index}.forwarderAddress`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Forwarder Address</span>
                                                                            <InfoHover info="Address of the proxy smart contract" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Input placeholder="0x..." {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`challenges.${index}.forwarderABI`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="flex flex-row gap-2 items-center">
                                                                            <span>Forwarder ABI</span>
                                                                            <InfoHover info="ABI of the proxy smartcontract" />
                                                                        </FormLabel>
                                                                        <FormControl>
                                                                            <Textarea
                                                                                placeholder='Forwarder ABI JSON'
                                                                                {...field}
                                                                            />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.methodDataAttributeName`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Item Variable</span>
                                                                        <InfoHover info="If the player interacts with something else in the action and you want to check for that other item you can give the name of the parameter that stores that other item in the smart contract function" />
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., methodData" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.wantedData`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel className="flex flex-row gap-2 items-center">
                                                                        <span>Wanted Data</span>
                                                                        <InfoHover info="The value of the item that you're checking for" />
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., waveNumber" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <FormField
                                                        control={form.control}
                                                        name={`challenges.${index}.countItems`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="flex flex-row gap-2 items-center">
                                                                    <span>Count Items</span>
                                                                    <InfoHover info="If the player can interact with multiple items in the action, check this to count them and have that count contribute to the goal" />
                                                                </FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full text-lg py-6 bg-gradient-to-r from-primary to-primary-end hover:opacity-90 transition-opacity"
                                    >
                                        REGISTER GAME
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card className="bg-slate-800/50 border-slate-700">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-slate-300 text-sm space-y-2">
                                <p>• If you have any issue registering a game you can reach out to us at info@pomaprotocol.com</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
