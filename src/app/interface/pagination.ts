export interface Pagination {
  currentPage: number;
  search: string;
  filter: any;
}

export const defaultPagination = (): Pagination => ({
  currentPage: 0,
  search: '',
  filter: {},
});

export interface Totalpage {
  total: number;
}

export const defaultTotal = (): Totalpage => ({
  total: 0,
});



export interface PaginationDetails {
  currentPage: number;
  search: string;
  filter: object;
  total: number;
}

export const defaultPaginationDetails = {
  currentPage: 0,
  search: '',
  filter: {},
  total: 0,
}