import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'accounts',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class Account extends Model {
  @ApiProperty()
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @ApiProperty()
  @Column({ allowNull: false })
  name: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    defaultValue: () => Math.random().toString(36).slice(2),
  })
  token: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;
}
