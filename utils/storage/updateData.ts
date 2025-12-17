import { Bip } from "@/types/Bip";
import { fetchEmployees, fetchOfficeData, fetchOpenHours } from "../data";
import { storage } from "./asyncStorage";
import { OpenHours, OpenHoursDTO } from "@/types/OpenHours";
import { Employee } from "@/types/Employee";
import { fetchDownloads } from "../articles";
import { OfficeData } from "@/types/OfficeData";
import { Document } from '@/types/Article'

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
    if (employees) {
        storage.remove(`${bip.id}/employees`);
        storage.set<Employee[]>(`${bip.id}/employees`, employees)
    }

    const officeData = await fetchOfficeData(bip.url);
    if (officeData) {
        storage.remove(`${bip.id}/officeData`);
        storage.set<OfficeData>(`${bip.id}/officeData`, officeData)
    }

    const downloads = await fetchDownloads(bip.url);
    if (downloads) {
        storage.remove(`${bip.id}/downloads`)
        storage.set<Document[]>(`${bip.id}/downloads`, downloads);
    }
}

export async function updateAllData() {
    console.log('update data');
    const saved = await storage.get<Bip[]>(`selectedBipCities`);
    if (saved) {
        for (const bip of saved) {
            try {
                if (bip.id != '-1' && bip.url != '') {
                    await updateData(bip); // ждём обновления каждой записи
                }
            } catch (err) {
                console.error('Error while updating bip Id: ' + bip.id, err);
            }
        }
    }
}