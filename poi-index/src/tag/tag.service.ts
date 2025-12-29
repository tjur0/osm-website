import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { TagType } from './enums/tag-type';
import {
  MAIN_TAG_KEYS,
  FLOATING_PREFIXES,
  DEFAULT_TAG_TYPE,
  WIKI_CHECK_TTL_MS,
} from './tag-config';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private readonly logger: Logger,
  ) {}

  async createTag(key: string, value?: string): Promise<Tag> {
    const tag = new Tag();
    tag.key = key;
    tag.value = value;
    tag.type = await this.getTagType(key, value || '');
    const wiki = await this.getWikiLink(key, value || null);
    tag.wikiLink = wiki;
    tag.wikiLinkLastChecked = new Date();

    return this.tagRepository.save(tag);
  }

  async getTagType(key: string, value: string): Promise<TagType> {
    const k = key.toLowerCase();

    for (const prefix of FLOATING_PREFIXES) {
      if (k.startsWith(prefix) || k === prefix) return TagType.FLOATING;
    }

    if (MAIN_TAG_KEYS.includes(k)) return TagType.MAIN;

    return DEFAULT_TAG_TYPE;
  }

  private readonly excludedKeys = [
    'addr*',
    'name*',
    'contact*',
    'website',
    'email',
    'phone',
    'url',
    'operator',
    'check_date*',
    'start_date*',
    'opening_hours*',
    'ref*',
  ];

  private tagShouldNotBeChecked(tagKey: string): boolean {
    for (const ex of this.excludedKeys) {
      if (ex.endsWith('*')) {
        const prefix = ex.slice(0, -1);
        if (tagKey.startsWith(prefix)) return true;
      } else if (tagKey === ex) {
        return true;
      }
    }
    return false;
  }

  async getWikiLink(key: string, value?: string | null): Promise<string> {
    const base = 'https://wiki.openstreetmap.org/wiki/';
    const now = Date.now();

    const isFresh = (t?: Tag | null) =>
      !!t && !!t.wikiLinkLastChecked && now - new Date(t.wikiLinkLastChecked).getTime() < WIKI_CHECK_TTL_MS;

    const fetchAndSave = async (existing: Tag | undefined, url: string, logMsg?: string) => {
      if (logMsg) this.logger.log(logMsg);
      try {
        const res = await fetch(url, { method: 'HEAD' });
        const link = res.ok ? url : '';
        if (existing) {
          existing.wikiLink = link;
          existing.wikiLinkLastChecked = new Date();
          await this.tagRepository.save(existing);
        }
        return link;
      } catch (e) {
        return '';
      }
    };

    if (value) {
      if (this.tagShouldNotBeChecked(key)) return '';

      const existing = await this.tagRepository.findOne({ where: { key, value } });
      if (isFresh(existing)) return existing?.wikiLink || '';

      const valueUrl = `${base}Tag:${encodeURIComponent(key)}%3D${encodeURIComponent(value)}`;
      return fetchAndSave(existing || undefined, valueUrl, `FETCHING VALUE WIKI LINK FOR ${key}=${value}`);
    }

    const existingKey = await this.tagRepository.findOne({ where: { key }, order: { wikiLinkLastChecked: 'DESC' } });
    if (isFresh(existingKey)) return existingKey?.wikiLink || '';

    const keyUrl = `${base}Key:${encodeURIComponent(key)}`;
    return fetchAndSave(existingKey || undefined, keyUrl, `FETCHING KEY WIKI LINK FOR ${key}`);
  }
}
