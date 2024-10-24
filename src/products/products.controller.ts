import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  create() {
    return 'This creates a product';
  }

  @Get()
  findAll() {
    return 'This returns all products';
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return `This return the product with ID: #${id}`;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return body;
    // return `This updates the product with ID: #${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This delete the product with ID: #${id}`;
  }
}
