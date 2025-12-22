export interface OfficeData {
    logo?:{
        src:string
    }
    title:string,
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
}

export interface BankCredentials{
    name:string,
    number:string,
}

interface dataItem{
    label:string,
    value:string
}