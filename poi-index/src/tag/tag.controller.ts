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
      return await this.tagService.createTag(key, value);
    }

    if (!tag.wikiLink) {
      this.tagService.getWikiLink(key, value ?? null);
    }

    return tag;
  }
}
