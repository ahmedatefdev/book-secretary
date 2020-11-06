import { BaseEntity, Entity, Column, Unique, ManyToOne } from 'typeorm';

@Entity()
@Unique(['title'])
export default class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  cover: any;

  @Column()
  author: string;

  @Column()
  publication_date: string;

  @Column()
  type: BOOK_TYPE;
  // @ManyToOne(
  //   () => User,
  //   user => user.books,
  //   { eager: true },
  // )
  // user: User;
  user: any;
}

export enum BOOK_TYPE {
  PUBLIC = 'PUBLIC',
  PRIVET = 'PRIVET',
}
