import { FeaturedDeal, featuredDealsSchema } from "@/types";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function getFeaturedDeals(): Promise<FeaturedDeal[]> {
    try {
        const data = await axios.get(`${BACKEND_URL}/activity/featured`);
        const featuredDeals: FeaturedDeal[] = [];

        for (const d of data.data) {
            const parsed = featuredDealsSchema.safeParse(d);
            if (parsed.success) {
                featuredDeals.push(parsed.data);
            }
        }

        return featuredDeals;
    } catch(err) {
        console.error("Error getting featured deals", err);
        throw new Error("Error getting featured deals");
    }
}

export default function featuredDealsLoader() {
    try {
        const featured = getFeaturedDeals();
        return {featured};
    } catch(err) {
        throw new Error("Could not get featured deals");
    }
}