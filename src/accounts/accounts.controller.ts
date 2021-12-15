import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @ApiCreatedResponse({
    description: 'Account created successfully',
    type: Account,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post()
  create(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(createAccountDto);
  }

  @ApiOkResponse({
    description: 'List of accounts successfully retrieved',
    type: Account,
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @ApiOkResponse({
    description: 'Account by ID successfully retrieved',
    type: Account,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Account with ID successfully updated',
    type: Account,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @ApiNoContentResponse({
    description: 'Account with ID sucessfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Not found',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
}
