import { Article, DateObject } from './Article';

export interface ChangeRegisterVersionData {
  versionId: number;
  version: string | null;
  versionUuid: string | null;
  versionDate: string | DateObject | null;
  versionLink: string | null;
  article?: Article | Record<string, unknown> | null;
}

export interface ChangeRegisterVersionDetail {
  versionId: number;
  version: string | null;
  versionUuid: string | null;
  versionDate: DateObject | null;
  versionLink: string | null;
  article: Article | null;
}

export interface ChangeRegisterEntry {
  objId: number;
  id: number;
  slug: string;
  title: string;
  date: string;
  operation: string;
  itemType: string;
  name: string | null;
  additionalDescription: string | null;
  author: string | null;
  versionData?: ChangeRegisterVersionData | null;
}
