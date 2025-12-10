import { Attachment } from "./Attachment";

export interface Article {
    id: number;
    categoryId: number;
    title: string;
    slug: string;
    content: string;
    createdAt: DateObject | null ;
    position: number | null ;
    views: number | null ;
    author: string | null ;
    status: number | null ;
    startAt: DateObject | null ;
    endAt: DateObject | null ;
    producedAt: DateObject | null ;
    isApproved: boolean | null ;
    userId: string | null ;
    isMain: boolean | null ;
    keywords: string | null ;
    articleType: number | null ;
    subtitle: string | null ;
    resolutionNumber: string | null ;
    resolutionDate: DateObject | null ;
    resolutionSubject: string | null ;
    resolutionText: string | null ;
    category1Id: number | null ;
    category2Id: number | null ;
    category3Id: number | null ;
    resolutionType: string | null ;
    resolutionPlace: string | null ;
    requiredDocuments: string | null ;
    pickupLocation: string | null ;
    fees: string | null ;
    appealProcedure: string | null ;
    comments: string | null ;
    legalBasis: string | null ;
    resolutionContent: string | null ;
    approvedBy: string | null ;
    acceptedBy: string | null ;
    isArchived: boolean | null ;
    modifiedAt: DateObject | null ;
    isDeleted: boolean | null ;
    deletedAt: DateObject | null | null ;
    publishedAt: DateObject | null ;
    type: string | null ;
    documents: Document[] | null;
}

export interface DateObject {
    date: string | null ; // ISO format
    timezone_type: number | null ;
    timezone: string | null ;
}

export interface Document{
    id: number,
    articleId: number,
    articleType: string,
    fullPath: string,
    fileName: string,
    extension:string,
    description:string,
    position:number,
    fileSize: number,
    language: string
}


