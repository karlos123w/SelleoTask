import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeOrm';

@Entity()
export class Files {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Users id' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Users first name' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'Users last name' })
  lastName: string;

  @Column()
  @ApiProperty({ description: 'Users phone number' })
  phoneNumber: number;
}
