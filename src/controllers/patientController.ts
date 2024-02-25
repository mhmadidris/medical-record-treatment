import { Patient } from "../models/Patient";

export async function getAllPatients(): Promise<Patient[]> {
    try {
        const res = await fetch("/api/patient");
        const responseData = await res.json();
        return responseData.patients as Patient[];
    } catch (error) {
        console.error("Error fetching patients:", error);
        return [];
    }
}

export async function createPatient(newPatient: Patient): Promise<Patient | null> {
    try {
        const res = await fetch("/api/patient", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPatient)
        });

        if (res.ok) {
            const responseData = await res.json();
            return responseData.createdPatient as Patient;
        } else {
            console.error("Failed to create patient:", res.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error creating patient:", error);
        return null;
    }
}

export async function deletePatient(patientId: string): Promise<boolean> {
    try {
        const res = await fetch(`/api/patient/delete?patientId=${patientId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            return true;
        } else {
            console.error("Failed to delete patient:", res.statusText);
            return false;
        }
    } catch (error) {
        console.error("Error deleting patient:", error);
        return false;
    }
}

export async function getPatientDetail(patientId: string): Promise<Patient | null> {
    try {
        const res = await fetch(`/api/patient/detail?patientId=${patientId}`);
        if (res.ok) {
            const responseData = await res.json();
            return responseData.patient as Patient;
        } else {
            console.error("Failed to fetch patient detail:", res.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching patient detail:", error);
        return null;
    }
}