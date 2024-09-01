export class UsePageable {
  readonly page: number;
  readonly total_page: number;
  readonly total_count: number;
  readonly limit: number;
  readonly has_prev: boolean;
  readonly has_next: boolean;

  constructor(page: number, limit: number, total: number) {
    this.page = page;
    this.total_page = Math.ceil(total / limit);
    this.total_count = total;
    this.limit = limit;
    this.has_prev = this.page > 1;
    this.has_next = this.page < this.total_page;
  }
}
