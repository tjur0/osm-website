import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { TagType } from '../enums/tag-type';

@Index(['key', 'value'], { unique: true })
@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column({ nullable: true }) // if this is null it mean this is representing a key only
  value?: string;

  @Column({ nullable: true })
  wikiLink?: string;

  @Column({ type: 'timestamp', nullable: true })
  wikiLinkLastChecked?: Date;

  @Column({ type: 'enum', enum: TagType })
  type: TagType;
}
