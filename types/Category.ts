import { Article } from "./Article";

export interface Section {
    id: number,
    name: string,
    order: number,
    expanded: boolean,
    categories?: Category[],
}

export interface Category {
    id: number,
    sectionId?: number,
    categoryId?: number,
    title: string,
    views: number,
    type: string,
    matched?: boolean,
    articles?: Article[],
    subCategories?: Category[],
    articleCount?: number,
    subcategoryCount?: number
}

export interface CategoryStat {
    id: number,
    title: string,
    percentage: number,
}