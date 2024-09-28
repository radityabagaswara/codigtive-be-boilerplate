import { ApiProperty } from '@nestjs/swagger';

/**
 * Dto for the response
 */
export class ResponseDto<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'Success' })
  status: string;

  @ApiProperty()
  data: T;

  @ApiProperty({ example: 1617826799860 })
  timestamp: number;
}
