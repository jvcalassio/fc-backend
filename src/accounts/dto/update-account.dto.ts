import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(CreateAccountDto) {
  @ApiProperty()
  name: string;
}
