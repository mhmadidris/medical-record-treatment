import { Medicine } from "../models/Medicine";

export async function getAllMedicines(): Promise<Medicine[]> {
    try {
        const res = await fetch("/api/medicine");
        const responseData = await res.json();
        return responseData.medicines as Medicine[];
    } catch (error) {
        console.error("Error fetching medicines:", error);
        return [];
    }
}

export async function deleteMedicine(medicineId: string): Promise<boolean> {
    try {
        const res = await fetch(`/api/medicine/delete?medicineId=${medicineId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            return true;
        } else {
            console.error("Failed to delete medicine:", res.statusText);
            return false;
        }
    } catch (error) {
        console.error("Error deleting medicine:", error);
        return false;
    }
}

export async function createMedicine(newMedicine: Medicine, selectedImage: Blob | null): Promise<Medicine | null> {
    try {
        let imageURL = '';
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const uploadResponse = await fetch("/api/medicine/upload", {
                method: "POST",
                body: formData
            });

            if (uploadResponse.ok) {
                const responseData = await uploadResponse.json();
                imageURL = responseData.fileUrl;

                const res = await fetch("/api/medicine", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ ...newMedicine, image: imageURL })
                });

                if (res.ok) {
                    const responseData = await res.json();
                    return responseData.createdMedicine as Medicine;
                } else {
                    console.error("Failed to create medicine:", res.statusText);
                }
            } else {
                throw new Error(`Failed to upload image: ${uploadResponse.statusText}`);
            }
        }
        return null;
    } catch (error) {
        console.error("Error saving medicine:", error);
        return null;
    }
}
