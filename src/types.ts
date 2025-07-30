import z from "zod";
export const challengeSchema = z.object({
    name: z.string().min(1, "Challenge name is required"),
    player_address_variable: z.string().min(1, "Player address variable is required"),
    function_name: z.string().min(1, "Function name is required"),
    useForwarder: z.boolean(),
    forwarderAddress: z.string().nullable(),
    forwarderABI: z.string().nullable(),
    methodDataAttributeName: z.string().nullable(),
    wantedData: z.string().nullable(),
    countItems: z.boolean(),
    contract_address: z.string().min(1, "Contract address is required"),
    abi: z.any().nullable(),
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
    goal: z.number(),
    endDate: z.string(),
    status: z.enum(["upcoming", "active", "completed"]),
    players: z.array(z.string()),
    commissionPaid: z.boolean(),
    rewardLocked: z.boolean(),
    instructions: z.array(z.string()),
    about: z.string().nullable()
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

export const gameDetailsSchema = z.object({
    name: z.string(),
    image: z.string(),
    category: z.string(),
    createdAt: z.string()
});

export const createChallengeSchema = z.object({
    name: z.string({ message: "Please enter name" }),
    player_address_variable: z.string({ message: "Please enter player address variable" }),
    function_name: z.string({ message: "Please enter function name" }),
    useForwarder: z.boolean().default(false),
    forwarderAddress: z.string({ message: "Please enter forwarder address" }).regex(/^(0x)?[0-9a-fA-F]{40}$/, {message: "Forwarder address must be a valid ethereum address"}).optional().nullable(),
    forwarderABI: z.any().optional().nullable(),
    methodDataAttributeName: z.string({ message: "Enter item attribute" }).optional().nullable(),
    wantedData: z.string({ message: "Enter wanted data" }).optional().nullable(),
    countItems: z.boolean().default(false),
    contract_address: z.string({ message: "Please enter contract address" }).regex(/^(0x)?[0-9a-fA-F]{40}$/, {message: "Contract address must be a valid ethereum address"}),
    abi: z.any(),
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
    about: string | null,
    reward: number | null,
    image: string,
    startDate: string,
    endDate: string,
    goal: number,
    playerCount: number,
    maxPlayers: number,
    status: string,
    commissionPaid: boolean,
    rewardLocked: boolean,
    instructions: string[],
}

export type GameDetails = z.infer<typeof gameDetailsSchema>;
export type GamesChallenges = z.infer<typeof gameChallengesSchema>;
export type FilteredGames = z.infer<typeof filteredGamesSchema>;
export type GameCategories = z.infer<typeof gameAndCategoriesSchema>;
export type FeaturedDeal = z.infer<typeof featuredDealsSchema>;
export type GameFormData = z.infer<typeof gameSchema>;