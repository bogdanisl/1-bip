export interface Response<T>{
    data:T,
    meta?:any,
    status:number,
    title:string
}