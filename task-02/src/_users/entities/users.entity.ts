import { Entity, PrimaryGeneratedColumn, Column } from 'typeOrm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: number;

  @Column()
  shirtSize: number;

  @Column()
  preferredTechnology: string;

  @Column()
  createdAt: string;

  @Column()
  email: string;

  @Column()
  hashedPass: string;
}
