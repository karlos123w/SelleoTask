import { Entity, PrimaryGeneratedColumn, Column } from 'typeOrm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ default: false })
  isPremium: boolean;
}
