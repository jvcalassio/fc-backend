import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Account } from 'src/accounts/entities/account.entity';

export enum OrderStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

@Table({
  tableName: 'orders',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Order extends Model {
  @ApiProperty()
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @ApiProperty()
  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
  amount: number;

  @ApiProperty()
  @Column({ allowNull: false })
  credit_card_number: string;

  @ApiProperty()
  @Column({ allowNull: false })
  credit_card_name: string;

  @ApiProperty({ enum: OrderStatus })
  @Column({ allowNull: false, defaultValue: OrderStatus.Pending })
  status: OrderStatus;

  @ApiProperty()
  @ForeignKey(() => Account)
  @Column({ allowNull: false, type: DataType.UUID })
  account_id: string;

  @BelongsTo(() => Account)
  account: Account;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}
