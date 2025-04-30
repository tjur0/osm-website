import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoiService } from './poi.service';
import { CreatePoiDto } from './dto/create-poi.dto';
import { UpdatePoiDto } from './dto/update-poi.dto';

@Controller('poi')
export class PoiController {
  constructor(private readonly poiService: PoiService) {}

 
}
