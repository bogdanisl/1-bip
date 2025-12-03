// utils/normalizeArticle.ts
import type { ArticleFull, Article, BaseArticle, HandleArticle, CaseArticle } from '@/types/Article';

export const normalizeArticle = (data: ArticleFull): Article => {
  const base = {
    id: data.id,
    categoryId: data.categoryId ?? 0,
    source: data.source,
    readCount: data.readCount,
    addedDate: new Date(data.addedDate),
    authorId: data.authorId,
    createdDate: new Date(data.createdDate),
    approvedAt: data.approvedAt ? new Date(data.approvedAt) : undefined,
    deleteDate: data.deleteDate ? new Date(data.deleteDate) : null,
    slug: data.slug,
    keywords: data.keywords,
    categoryId1: data.categoryId1,
    categoryId2: data.categoryId2,
    categoryId3: data.categoryId3,
    artTypeId: (data.artTypeId ?? 0) as 0 | 1 | 2,
    attachments: data.attachments ?? [],
  };

  switch (base.artTypeId) {
    case 0:
      return {
        ...base,
        artTypeId: 0,
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
      } as BaseArticle;

    case 1:
      return {
        ...base,
        artTypeId: 1,
        handleNumber: data.handleNumber,
        fromDay: data.fromDay,
        regarding: data.regarding,
        obliges: data.obliges,
        content: data.content,
      } as HandleArticle;

    case 2:
      return {
        ...base,
        artTypeId: 2,
        caseType: data.caseType,
        settlePlace: data.settlePlace,
        requiredDocuments: data.requiredDocuments,
        content: data.content,
      } as CaseArticle;

    default:
      return {
        ...base,
        artTypeId: 0,
        title: data.title ?? 'Artykuł',
        content: data.content,
      } as BaseArticle;
  }
};