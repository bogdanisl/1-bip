import { Attachment } from "./Attachment";

export interface ArticleFull {
    id: number; // id
    categoryId?: number //id_kat
    title?: string; // tytul
    slug: string; // slug
    content?: string; // tresc
    addedDate: Date; // data_dodania
    readCount?: number; // czytano
    source?: string; // zrodlo
    status?: '0' | '1'; // status
    fromDate?: Date; // data_od
    toDate?: Date; // data_do
    createdDate: Date; // data_wytworzenia
    contains?: '0' | '1'; // zatwierdz
    authorId?: number; // autor
    main?: '0' | '1'; // glowna
    keywords?: string; // keywords
    artTypeId?: number; // rodzaj_art
    subtitle?: string; // podtytul
    handleNumber?: string; // uchwala_numer
    fromDay?: string; // z_dnia
    regarding?: string; // w_sprawie
    obliges?: string; // obowiazuje
    categoryId1?: number; // pow1
    categoryId2?: number; // pow2
    categoryId3?: number; // pow3
    caseType?: string; // rodzaj_sprawy
    settlePlace?: string; // miejsce_zalatwienia
    requiredDocuments?: string; // wymagane_dokumenty
    recipientPlace?: string; // miejsce_odbioru
    payments?: string; // oplaty
    settleTerm?: string; // termin_zalatwienia
    cancelMode?: string; // tryb_odwolawczy
    remarks?: string; // uwagi
    legalBasis?: string; // podstawa_prawna
    caseContent?: string; // tresc_sprawy
    accepted?: string; // akceptowal
    confirmedBy?: string; // zatwierdzil
    archive?: '0' | '1'; // archive
    modifiedAt?: Date; // moded
    deleteDate?: Date | null; // data_usuniecia
    approvedAt?: Date; // data_zatwierdzenia
    oldId?: number; // old_id
    oldCategoryId?: number; // old_id_kat
    articleReferenceId?: number; // id_art
    type?: string; // typ
    isOld?: number; // stare
    attachments?: Attachment[] //załączniki
}


//ArtTypeId -> 0

/*
 Art type id -> 0 (Normalny artykuł)
 - categoruId - id_kat
 - source - zrodlo
 - addedDAte - data_dodania
 - authorId - autor
 - createdDate - data_wytworzenia
 - approvedAt - data_zatwierdzenia
 - deleteDate - data_usuniecia
 - id - id
 - title - tytul
 - slug - slug
 - subtitle - podtytul
 - content - tresc
 - keywords - keywords
 - categoryId1 - pow1
 - categoryId2 - pow2
 - categoryId3 - pow3

 ============== Art type id -> 1 (Uchwala)
 - categoryId - id_kat
 - source - zrodlo
 - addedDAte - data_dodania
 - authorId - autor
 - createdDate - data_wytworzenia
 - approvedAt - data_zatwierdzenia
 - deleteDate - data_usuniecia
 - id - id
 - handleNumber - uchwala_numer
 - slug - slug
 - fromDay - z_dnia
 - regarding - w_sprawie
 - obliges - obowiazuje
 - content - tresc
 - keywords - keywords
 - categoryId1 - pow1
 - categoryId2 - pow2
 - categoryId3 - pow3

 ============== Art type id -> 2 (Jak załatwić sprawę)
 - categoryId - id_kat
 - source - zrodlo
 - addedDate - data_dodania
 - authorId - autor
 - createdDate - data_wytworzenia
 - approvedAt - data_zatwierdzenia
 - deleteDate - data_usuniecia
 - id - id
 - caseType - rodzaj_sprawy
 - slug - slug
 - settlePlace - miejsce_zalatwienia
 - requiredDocuments - wymagane_dokumenty
 - recipientPlace - miejsce_odbioru
 - payments - oplaty
 - settleTerm - termin_zalatwienia
 - accepted - akceptowal
 - content - tresc
 - keywords - keywords
 - categoryId1 - pow1
 - categoryId2 - pow2
 - categoryId3 - pow3

 ===== universalne
 - categoryId - id_kat
 - source - zrodlo
 - addedDate - data_dodania
 - authorId - autor
 - createdDate - data_wytworzenia
 - approvedAt - data_zatwierdzenia
 - deleteDate - data_usuniecia
 - id - id
 - caseType - rodzaj_sprawy
 - slug - slug
 - keywords - keywords
 - categoryId1 - pow1
 - categoryId2 - pow2
 - categoryId3 - pow3
 */



// types.ts
export interface BaseArticle {
    id: number; // id
    categoryId: number; // id_kat
    source?: string; // zrodlo
    readCount?: number; // czytano
    addedDate: Date; // data_dodania
    authorId?: number; // autor
    createdDate: Date; // data_wytworzenia
    approvedDate?: Date; // data_zatwierdzenia
    deletedAt?: Date | null; // data_usuniecia
    slug: string; // slug
    keywords?: string; // keywords
    categoryId1?: number; // pow1
    categoryId2?: number; // pow2
    categoryId3?: number; // pow3
    artTypeId: 0 | 1 | 2;
    attachments?:Attachment[]
}

export interface NormalArticle extends BaseArticle {
    artTypeId: 0;
    title?: string; // tytul
    subtitle?: string; // podtytul
    content?: string; // tresc
}

export interface HandleArticle extends BaseArticle {
    artTypeId: 1;
    handleNumber?: string; // uchwala_numer
    fromDay?: string; // z_dnia
    regarding?: string; // w_sprawie
    obliges?: string; // obowiazuje
    content?: string; // tresc
}

export interface CaseArticle extends BaseArticle {
    artTypeId: 2;
    caseType?: string; // rodzaj_sprawy
    settlePlace?: string; // miejsce_zalatwienia
    requiredDocuments?: string; // wymagane_dokumenty
    recipientPlace?: string; // miejsce_odbioru
    content?: string; // tresc
    payments?: string; // oplaty
    settleTerm?: string; // termin_zalatwienia
    cancelMode?: string; // tryb_odwolawczy
    remarks?: string; // uwagi
    legalBasis?: string; // podstawa_prawna
    caseContent?: string; // tresc_sprawy
    accepted?: string; // akceptowal
    confirmedBy?: string; // zatwierdzil
}

export type Article = NormalArticle | HandleArticle | CaseArticle;