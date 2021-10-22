import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Game extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: false, type: 'varchar' })
  image: string;

  @Column({ nullable: false, type: 'varchar', length: 300 })
  bio: string;

  @Column({ nullable: false, length: 200 })
  ano_lancamento: number;
}
