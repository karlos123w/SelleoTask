import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeOrm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Users id' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Users first name' })
  firstName: string;

  @Column()
  @ApiProperty({ description: 'Users last name' })
  lastName: string;

  @Column()
  @ApiProperty({ description: 'Users phone number' })
  phoneNumber: number;

  @Column()
  @ApiProperty({ description: 'Users shirt size' })
  shirtSize: number;

  @Column()
  @ApiProperty({ description: 'Users preffered technology' })
  preferredTechnology: string;

  @Column()
  @ApiProperty({ description: 'date of creation of the user account  ' })
  createdAt: string;

  @Column()
  @ApiProperty({ description: 'Users email' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Users hashed password' })
  hashedPass: string;

  @Column({ default: false })
  @ApiProperty({ description: 'role of user' })
  role: string;
}
