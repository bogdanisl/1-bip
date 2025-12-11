import { Employee } from "@/types/Employee";
import { OpenHours } from "@/types/OpenHours";

export async function fetchOpenHours(): Promise<OpenHours[] | null> {
    try {
        const response = await fetch(`https://www.bip.alpanet.pl/api/v1/hour`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.warn('Failed to get Open hours: ', response);
            return null;
        }

        const res = await response.json();
        //console.log(res.data)
        return res.data;
    }
    catch (err) {
        console.warn('Failed to get open hours: ', err);
        return null;
    }
}

export async function fetchEmployees(): Promise<Employee[] | null> {
    try {
        const response = await fetch(`https://www.bip.alpanet.pl/api/v1/employee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.warn('Failed to get Open hours: ', response);
            return null;
        }

        const res = await response.json();
        //console.log(res.data)
        return res.data;
    }
    catch (err) {
        console.warn('Failed to get open hours: ', err);
        return null;
    }
}