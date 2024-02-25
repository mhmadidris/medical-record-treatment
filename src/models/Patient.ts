import { Medicine } from "./Medicine";
import { Treatment } from "./Treatment";

export interface Patient {
    id?: string;
    patientID?: string;
    patientName: string;
    date: Date;
    treatmentIds?: string[];
    medicineIds?: string[];
    treatments?: Treatment[];
    medicines?: Medicine[];
    cost: number;
}
