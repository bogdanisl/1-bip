import { Employee } from "@/types/Employee";
import { OfficeData } from "@/types/OfficeData";
import { OpenHours } from "@/types/OpenHours";
import { storage } from "./storage/asyncStorage";
import { officeDataExample } from "@/constants/data_example";

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

export async function fetchOfficeData(url:string): Promise<OfficeData | null>{
    try{
        const response = await fetch(`${url}/api/v1/officeData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            console.warn('Failed to get office data: ', response);
            return null;
        }
        const res = await response.json();
        return res.data;
    }
    catch(err){
        console.error('Failed to fetch office data: ', err);
        return null;
    }
}