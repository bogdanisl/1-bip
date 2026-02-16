export interface OpenHours {
    id: number,
    name: string,
    slug: string,
    startAt: string,
    endAt: string,
    status: number
}
export interface OpenHoursDTO {
    id: number,
    name: string,
    slug: string,
    startAt: string,
    endAt: string,
    startM: number,
    endAtM: number,
    status: number,
}