export interface Employee{
    id:number,
    name: string | null,
    surname:string | null,
    position:string | null,
    phone:number | null,
    extension?:number | null,
    email:string | null,
    notes?:string | null,
    sort?:number | null
}