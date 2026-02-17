import { Bip } from "@/src/types/Bip";
import { OpenHours, OpenHoursDTO } from "@/src/types/OpenHours";
import { Employee } from "@/src/types/Employee";
import { OfficeData } from "@/src/types/OfficeData";
import { Document } from '@/src/types/Article'
import { storage } from "./asyncStorage";
import { apiRequest } from "../api/client";

export async function updateData(bip: Bip) {
    const hours = await apiRequest<OpenHours[]>('/api/v1/hour');
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

    const employees = await apiRequest<Employee[]>('/api/v1/employee/list');
    if (employees) {
        storage.remove(`${bip.id}/employees`);
        storage.set<Employee[]>(`${bip.id}/employees`, employees)
    }

    const publishers = await apiRequest<Employee[]>('/api/v1/publisher/list');
    if (publishers) {
        storage.remove(`${bip.id}/editors`);
        storage.set<Employee[]>(`${bip.id}/editors`, publishers)
    }

    const officeData = await apiRequest<OfficeData>('/api/v1/data')
    if (officeData) {
        storage.remove(`${bip.id}/officeData`);
        storage.set<OfficeData>(`${bip.id}/officeData`, officeData)
    }

    const documents = await apiRequest<Document[]>('/api/v1/document/list')
    if (documents) {
        storage.remove(`${bip.id}/documents`)
        storage.set<Document[]>(`${bip.id}/documents`, documents);
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