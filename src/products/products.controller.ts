import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,
  ) {}

  @Post()
  createProduct() {
    return 'This action adds a new product';
  }

  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      const products = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_all_products' }, paginationDto),
      );
      return products;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new BadRequestException(error);
    }
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
