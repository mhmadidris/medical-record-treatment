import { Treatment } from "../models/Treatment";

export async function getAllTreatments(searchParam?: string): Promise<Treatment[]> {
    try {
        const res = await fetch(`/api/treatment?search=Paramedical`);
        const responseData = await res.json();
        return responseData.treatments as Treatment[];
    } catch (error) {
        console.error("Error fetching treatments:", error);
        return [];
    }
}

export async function createTreatment(newTreatment: Treatment): Promise<Treatment | null> {
    try {
        const res = await fetch("/api/treatment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTreatment)
        });

        if (res.ok) {
            const responseData = await res.json();
            return responseData.createdTreatment as Treatment;
        } else {
            console.error("Failed to create treatment:", res.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error creating treatment:", error);
        return null;
    }
}

export async function deleteTreatment(treatmentId: string): Promise<boolean> {
    try {
        const res = await fetch(`/api/treatment/delete?treatmentId=${treatmentId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            return true;
        } else {
            console.error("Failed to delete treatment:", res.statusText);
            return false;
        }
    } catch (error) {
        console.error("Error deleting treatment:", error);
        return false;
    }
}