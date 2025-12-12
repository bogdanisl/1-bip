import { Bip } from "@/types/Bip";
import { fetchEmployees, fetchOpenHours } from "../data";
import { storage } from "./asyncStorage";
import { OpenHours, OpenHoursDTO } from "@/types/OpenHours";
import { Employee } from "@/types/Employee";


export async function updateData(bip: Bip) {
    const hours = await fetchOpenHours(bip.url);
    if (hours && hours.length > 0) {
        const hoursTransfered: OpenHoursDTO[] = [];
        hours.map(h => {
            if (h.status != 0) {
                const startAtSplit = h.startAt.split(':')
                const endAtAtSplit = h.endAt.split(':')
                const startAtM = (Number(startAtSplit[0]) * 60) + Number(startAtSplit[1])
                const endAtM = (Number(endAtAtSplit[0]) * 60) + Number(endAtAtSplit[1])
                const hour: OpenHoursDTO = {
                    id: h.id,
                    name: h.name,
                    slug: h.slug,
                    startAt: h.startAt,
                    endAt: h.endAt,
                    startM: startAtM,
                    endAtM: endAtM,
                    status: h.status
                }
                hoursTransfered?.push(hour)
            }
        })
        storage.remove(`${bip.id}/hours`);
        storage.set<OpenHoursDTO[]>(`${bip.id}/hours`, hoursTransfered);
    }

    const employees = await fetchEmployees(bip.url);
    if(employees){
        storage.remove(`${bip.id}/employees`);
        storage.set<Employee[]>(`${bip.id}/employees`,employees)
    }
}

export async function updateAllData(){
    const saved = await storage.get<Bip[]>(`selectedBipCities`);
    if(saved){
        saved.map(bip=>{
            try{
                updateData(bip);
            }
            catch(err){
                console.error('Error while updateing bip Id: ' + bip.id)
            }
        })
    }
}