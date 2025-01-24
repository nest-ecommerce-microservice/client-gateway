import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NAST_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NAST_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'create_product' }, createProductDto),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      const products = await firstValueFrom(
        this.client.send({ cmd: 'find_all_products' }, paginationDto),
      );
      return products;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'find_one_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const product = await firstValueFrom(
        this.client.send(
          { cmd: 'update_product' },
          { id, ...updateProductDto },
        ),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.client.send({ cmd: 'delete_product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
