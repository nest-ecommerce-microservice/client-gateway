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
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  getAllProducts() {
    return 'This action returns all products';
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return `This action returns a product #${id}`;
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: any) {
    return `This action updates a product #${id}`;
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return `This action removes a product #${id}`;
  }
}
