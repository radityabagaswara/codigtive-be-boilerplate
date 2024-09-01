import { UsePageable } from '../use-pageable';
import { PageableRequestDto } from './pageable-request.dto';

export class PageableResponseDto<T> {
  data: T[];
  metadata: UsePageable;

  constructor(data: T[], pageable: PageableRequestDto, count: number) {
    this.data = data;
    this.metadata = new UsePageable(pageable.page, pageable.limit, count);
  }
}
