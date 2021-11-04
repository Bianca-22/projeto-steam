import { User } from 'src/users/user.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @CreateDateColumn({ nullable: false, type: 'varchar', length: 10 })
  data_lancamento: string;

  @CreateDateColumn()
  createdAd: Date;

  @UpdateDateColumn()
  updatedAd: Date;

  @Column()
  curtidas: number;

  @ManyToOne(() => User, (user) => user.game)
  users: User;
}
