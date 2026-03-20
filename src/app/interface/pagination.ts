export interface Pagination {
  pageIndex: number;
  search: string;
  filter: string;
}

export const defaultPagination = (): Pagination => ({
  pageIndex: 1,
  search: '',
  filter: '',
});

export interface Totalpage {
  total: number;
}

export const defaultTotal = (): Totalpage => ({
  total: 0,
});

export interface PaginationDetails<T> {
  data: T[];
  pageIndex: number;
  search: string;
  filter: string;
  total: number;
}

export const defaultPaginationDetails = <T>(): PaginationDetails<T> => ({
  data: [],
  pageIndex: 0,
  search: '',
  filter: '',
  total: 0,
});
