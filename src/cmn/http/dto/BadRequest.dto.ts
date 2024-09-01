export class BadRequestDto {
  field: string;
  message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }

  static toDto(t: BadRequestDto) {
    return {
      [t.field]: t.message,
    };
  }
}
