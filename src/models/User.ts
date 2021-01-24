import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  typeOfBlood: string;
}
