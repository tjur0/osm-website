import {
  Controller,
  Get,
  Query,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';

@Controller('tag')
export class TagController {
  constructor(
    private readonly tagService: TagService,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  @Get()
  private async getTag(
    @Query('key')
    key: string,
    @Query('value')
    value?: string,
  ): Promise<Tag | null> {
    if (!key) {
      throw new BadRequestException('Tag key is required');
    }

    const tag = await this.tagRepository.findOne({
      where: {
        key,
        value: value ?? IsNull(),
      },
    });

    if (tag === null) {
      // this takes long so lets not await it, it is not critical to have tag created immediately
      await this.tagService.createTag(key, value);

      return null;
    }

    if (!tag.wikiLink) {
      tag.wikiLink = await this.tagService.getWikiLink(key, value ?? null);
      tag.wikiLinkLastChecked = new Date();
      await this.tagRepository.save(tag);
    }

    return tag;
  }
}
