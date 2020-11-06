import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  cover: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  // @OneToMany(
  //   () => Book,
  //   book => book.user,
  //   { eager: false },
  // )
  // books: Book[];
  books: string[];
  // func to Validate every user pass
  async isPasswordValid(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
