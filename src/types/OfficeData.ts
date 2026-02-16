export interface OfficeData {
    logo?:{
        src:string
    }
    title:dataItem,
    name?:dataItem
    street?:dataItem,
    postalCode?:dataItem,
    city?:dataItem,
    region?:dataItem,
    phone?:dataItem,
    phoneSecond?:dataItem,
    phoneThird?:dataItem,
    email?:dataItem,
    emailSecond?:dataItem,
    website?:dataItem,
    nip?:dataItem,
    regon?:dataItem,
    fax?:dataItem,
    bankName?:dataItem,
    bankAccountNumber?: dataItem,
    map?:MapParams
}

interface dataItem{
    label?:string,
    value?:string
}
export interface MapParams {
    lat: number,
    lng: number,
    zoom: number
}