export interface OfficeData {
    logo?:{
        src:string
    }
    title:string,
    name?:dataItem
    address?:dataItem,
    postalCode?:dataItem,
    city?:dataItem,
    province?:dataItem,
    district?:dataItem,
    phone?:dataItem,
    email?:dataItem,
    website?:dataItem,
    NIP?:dataItem,
    REGON?:dataItem,
    bankAccount?:dataItem,
    bankName?:dataItem,
}
interface dataItem{
    label:string,
    content:string
}