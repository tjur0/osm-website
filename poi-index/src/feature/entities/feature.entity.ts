import { Poi } from 'src/poi/entities/poi.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Feature {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column()
  value: string;

  @Column()
  name: string;

  @Column()
  color: string;

  //   @Column({ nullable: true })
  //   wikiUrl?: string;

  @OneToMany(() => Poi, (poi) => poi.feature)
  pois: Poi[];

  // number from 0 to 1, where 1 is the most important
  @Column('float', { nullable: true })
  importance?: number;
}
