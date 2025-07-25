import z from "zod";
export const challengeSchema = z.object({
    name: z.string().min(1, "Challenge name is required"),
    player_address_variable: z.string().min(1, "Player address variable is required"),
    function_name: z.string().min(1, "Function name is required"),
    useForwarder: z.boolean(),
    forwarderAddress: z.string().optional(),
    forwarderABI: z.string().optional(),
    methodDataAttributeName: z.string().optional(),
    wantedData: z.string().optional(),
    countItems: z.boolean(),
    contract_address: z.string().min(1, "Contract address is required"),
    abi: z.any().optional(),
});
export const gameSchema = z.object({
    name: z.string().min(1, "Game name is required"),
    category: z.string().min(1, "Category is required"),
    image: z.instanceof(File).optional(),
    challenges: z.array(challengeSchema).min(1, "At least one challenge is required"),
});
export const featuredDealsSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    reward: z.number(),
    playerCount: z.number(),
    maxPlayers: z.number(),
    startDate: z.string(),
    endDate: z.string(),
    status: z.enum(["upcoming", "active", "completed"]),
    players: z.array(z.string())
});

export const activitySchema = z.object({
    challenge_id: z.number().min(1, "Challenge ID is required"),
    goal: z.number().min(1, "Goal is required"),
    reward: z.number().min(0, "Reward must be non-negative"),
    name: z.string().min(1, "Activity name is required"),
    startDate: z.date({ message: "Start date is required" }),
    endDate: z.date({ message: "End date is required" }),
    image: z.instanceof(File).optional(),
    about: z.string().optional(),
    instructions: z.array(z.string()).optional(),
    maximum_num_players: z.number().min(1, "Maximum players must be at least 1"),
});
export const gameAndCategoriesSchema = z.object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    category: z.string(),
});

export const filteredGamesSchema = z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    image: z.string(),
    challenges: z.number(),
    activeBattles: z.number(),
    totalPlayers: z.number(),
    createdAt: z.string()
});

export const gameChallengesSchema = z.object({
    id: z.number(),
    name: z.string(),
    function_name: z.string(),
    player_address_variable: z.string(),
    countItems: z.boolean(),
    battles: z.number()
});
export interface MyBattle {
    id: number;
    name: string;
    image: string;
    playerCount: number;
    maxPlayers: number;
    startDate: string;
    endDate: string;
    reward: number;
    userdone: boolean;
    battleDone: boolean;
}
export interface Activity {
    id: number,
    name: string,
    reward: number | null,
    image: string,
    startDate: string,
    endDate: string,
    playerCount: number,
    maxPlayers: number,
    status: string
}

export type GamesChallenges = z.infer<typeof gameChallengesSchema>;
export type FilteredGames = z.infer<typeof filteredGamesSchema>;
export type GameCategories = z.infer<typeof gameAndCategoriesSchema>;
export type FeaturedDeal = z.infer<typeof featuredDealsSchema>;
export type GameFormData = z.infer<typeof gameSchema>;