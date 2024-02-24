import { Treatment } from "../models/Treatment";

export async function getAllTreatments(): Promise<Treatment[]> {
    try {
        const res = await fetch("/api/treatment"); // Relative URL
        const responseData = await res.json();
        return responseData.treatments;
    } catch (error) {
        console.error("Error fetching treatments:", error);
        return [];
    }
}
