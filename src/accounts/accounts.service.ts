import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EmptyResultError } from 'sequelize';
import { Op } from 'sequelize';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account) private accountModel: typeof Account) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountModel.create(createAccountDto);
  }

  findAll() {
    return this.accountModel.findAll();
  }

  findOne(id_or_token: string) {
    // return this.accountModel.findByPk(id);
    return this.accountModel.findOne({
      where: {
        [Op.or]: {
          id: id_or_token,
          token: id_or_token,
        },
      },
      rejectOnEmpty: new EmptyResultError(
        `Account with ID/Token ${id_or_token} not found.`,
      ),
    });
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    return account.update(updateAccountDto);
  }

  async remove(id: string) {
    const account = await this.findOne(id);
    return account.destroy();
  }
}
