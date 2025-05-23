import { Feature } from 'src/feature/entities/feature.entity';
import { Column, Entity, Index, ManyToOne, PrimaryColumn } from 'typeorm';

@Index('poi_country_idx', ['country'])
@Index('poi_state_idx', ['state'])
@Index('poi_city_idx', ['city'])
@Index('poi_street_idx', ['street'])
@Index('poi_name_idx', ['name'])
@Entity('pois')
export class Poi {
  @PrimaryColumn('int8')
  id: number;

  @PrimaryColumn('char', { length: 1 })
  type: string;

  @Column('jsonb', { nullable: true })
  tags?: Record<string, any>;

  @Column('geometry', {
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  point: { type: string; coordinates: number[] };

  @Column('geometry', {
    spatialFeatureType: 'MultiPolygon',
    srid: 4326,
    nullable: true,
  })
  area?: { type: string; coordinates: number[][][] };

  @Column('timestamptz', { nullable: true })
  geocodedAt?: Date;

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  street?: string;

  @ManyToOne(() => Feature, (feature) => feature.pois, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  feature?: Feature;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  typeName?: string;
}
