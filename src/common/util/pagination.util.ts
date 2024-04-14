export class PaginationResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
  totalPage: number;

  constructor(data: T[], page: number, limit: number, totalCount: number) {
    this.data = data;
    this.page = page;
    this.limit = limit;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / limit);
  }
}

export function createPaginationResult<T>(
  data: T[],
  page: number,
  limit: number,
  totalCount: number
): PaginationResult<T> {
  return new PaginationResult(data, page, limit, totalCount);
}