import { Poi } from 'src/poi/entities/poi.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feature {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  name: string;

  //   @Column({ nullable: true })
  //   wikiUrl?: string;

  @OneToMany(() => Poi, (poi) => poi.feature)
  pois: Poi[];
}
