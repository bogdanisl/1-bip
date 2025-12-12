import { Employee } from "@/types/Employee";
import { OpenHours } from "@/types/OpenHours";

export async function fetchOpenHours(url:string): Promise<OpenHours[] | null> {
    try {
        console.log(`${url}/api/v1/hour`)
        const response = await fetch(`${url}/api/v1/hour`, {
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

export async function fetchEmployees(url:string): Promise<Employee[] | null> {
    try {
        const response = await fetch(`${url}/api/v1/employee`, {
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