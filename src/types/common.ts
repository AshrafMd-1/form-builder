export type PaginationForms<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PaginationParams = {
  offset: number;
  limit: number;
};

export type PaginationData = {
  totalCount: number;
  offset: number;
  limit: number;
};