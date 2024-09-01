import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const statusOk = () => {
  return 'OK';
};

export const statusError = () => {
  throw new InternalServerErrorException('Terjadi kesalahan');
};

export const statusBadRequest = () => {
  throw new BadRequestException('Bad Request');
};

export const statusNotFound = () => {
  throw new NotFoundException('Not Found');
};

export const statusUnauthorized = () => {
  throw new ForbiddenException('Unauthorized');
};
