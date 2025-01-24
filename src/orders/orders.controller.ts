import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NAST_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NAST_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(
        this.client.send({ cmd: 'create_order' }, createOrderDto),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send({ cmd: 'find_all_orders' }, orderPaginationDto);
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send({ cmd: 'find_order' }, { id }),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':status')
  findOrdersByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    try {
      const orders = this.client.send(
        { cmd: 'find_all_orders' },
        { ...paginationDto, status: statusDto.status },
      );
      return orders;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      const order = await firstValueFrom(
        this.client.send(
          { cmd: 'change_order_status' },
          { id, status: statusDto.status },
        ),
      );
      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
