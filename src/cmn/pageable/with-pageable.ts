import { Injectable } from '@nestjs/common';
import { Repository, ILike, FindOptionsOrder, FindOptionsWhere } from 'typeorm';
import { PageableRequestDto } from './dto/pageable-request.dto';
import { PageableResponseDto } from './dto/pageable-response.dto';

export class WithOrder {
  field: string;
  order: 'ASC' | 'DESC';
}

export class WithFilter {
  field: string;
  value: string;
}

export class WithPageableOpt<T> {
  repo: Repository<T>;
  paginationDto: PageableRequestDto;
  withOrder?: WithOrder;
  withFilter?: WithFilter;
  relation?: string[] | string;
  withQuery?: any;
}

@Injectable()
export class WithPageable {
  async getPageableData<T>(
    options: WithPageableOpt<T>,
  ): Promise<PageableResponseDto<T>> {
    const DEFAULT_PAGE_LIMIT = 10;
    const DEFAULT_SORT_ORDER: FindOptionsOrder<T> = {
      createdAt: 'ASC',
    } as unknown as FindOptionsOrder<T>;

    const order: FindOptionsOrder<T> = options.withOrder
      ? ({
          [options.withOrder.field]: options.withOrder.order,
        } as FindOptionsOrder<T>)
      : DEFAULT_SORT_ORDER;
    const where: FindOptionsWhere<T> = options.withFilter
      ? ({
          [options.withFilter.field]: ILike(`%${options.withFilter.value}%`),
        } as FindOptionsWhere<T>)
      : {};

    const [data, total] = await options.repo.findAndCount({
      skip:
        ((options.paginationDto.page || 1) - 1) *
        (options.paginationDto.limit || DEFAULT_PAGE_LIMIT),
      take: options.paginationDto.limit || DEFAULT_PAGE_LIMIT,
      order,
      where,
      relations: options.relation,
      ...options.withQuery,
    });

    return new PageableResponseDto(data, options.paginationDto, total);
  }
}
