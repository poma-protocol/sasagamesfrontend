
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
import { Plus, Trash2, Upload, FileText } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import axios from "axios";
import { gameSchema, GameFormData } from "@/types";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export function RegisterGamePage() {
    const form = useForm<GameFormData>({
        resolver: zodResolver(gameSchema),
        defaultValues: {
            name: "",
            category: "",
            image: null,
            contract_address: "",
            abi: null,
            challenges: [{
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
            }],
        },
    });

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
            if (data.image instanceof File) {
                const imageUrl = await saveImage(data.image);
                if (!imageUrl) {
                    toast.error("Failed to upload game image.");
                    return;
                }
                const response = await axios.post(`${BACKEND_URL}/game/register`, {
                    ...data,
                    image: imageUrl,
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
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
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
                                            <h2 className="text-xl font-semibold">Challenges</h2>
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
                                                                    <FormLabel>Challenge Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., Survive 100 Waves" {...field} />
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
                                                                    <FormLabel>Player Address Variable</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., playerAddress" {...field} />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name={`challenges.${index}.function_name`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Function Name</FormLabel>
                                                                    <FormControl>
                                                                        <Input placeholder="e.g., completeWave" {...field} />
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
                                                                    <FormLabel>Contract Address</FormLabel>
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
                                                        name={`challenges.${index}.useForwarder`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex items-center space-x-2">
                                                                <FormControl>
                                                                    <Switch
                                                                        checked={field.value}
                                                                        onCheckedChange={field.onChange}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel>Use Forwarder</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {form.watch(`challenges.${index}.useForwarder`) && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`challenges.${index}.forwarderAddress`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Forwarder Address</FormLabel>
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
                                                                        <FormLabel>Forwarder ABI</FormLabel>
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
                                                                    <FormLabel>Method Data Attribute Name</FormLabel>
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
                                                                    <FormLabel>Wanted Data</FormLabel>
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
                                                                <FormLabel>Count Items</FormLabel>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name={`challenges.${index}.abi`}
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Challenge ABI</FormLabel>
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
            </div>
        </div>
    );
}
