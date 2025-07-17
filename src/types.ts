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
export type GameFormData = z.infer<typeof gameSchema>;