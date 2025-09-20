import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MarqueService } from './marque.service';
import { CreateMarqueDto } from './dto/create-marque.dto';
import { UpdateMarqueDto } from './dto/update-marque.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('marque')
@Controller('marque')
export class MarqueController {
  constructor(private readonly marqueService: MarqueService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new marque' })
  @ApiBody({ type: CreateMarqueDto })
  create(@Body() createMarqueDto: CreateMarqueDto) {
    return this.marqueService.create(createMarqueDto);
  }

  @Post(':nom')
  @ApiOperation({ summary: 'Crée marque by name' })
  @ApiParam({ name: 'nom', type: 'string' })
  async createByName(@Body('nom') nom: string) {
    return this.marqueService.createMarqueByName(nom);
  }

  @Get()
  @ApiOperation({ summary: 'Get marques' })
  findAll() {
    return this.marqueService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get marque by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: number) {
    return this.marqueService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update marque by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateMarqueDto })
  update(@Param('id') id: number, @Body() updateMarqueDto: UpdateMarqueDto) {
    return this.marqueService.update(+id, updateMarqueDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete marque by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: number) {
    return this.marqueService.remove(+id);
  }
}