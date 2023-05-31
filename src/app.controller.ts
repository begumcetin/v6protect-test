import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { JsonDB, Config } from 'node-json-db';

@Controller('products')
export class AppController {
  constructor(private readonly appService: AppService) {}

  db = new JsonDB(new Config('products', true, false, '/'));

  @Get()
  getAllProducts() {
    return this.db.getData(`/`);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const data = await this.db.getObjectDefault<object>(`/${id}`, {});

    return {
      id,
      ...data,
    };
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.db.delete(`/${id}`);
    return `Le produit ${id} a été supprimé !`;
  }

  @Post()
  createProduct(@Body() productDto: any) {
    function makeid(length) {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length),
        );
      }
      return result;
    }
    const id = makeid(10);

    this.db.push(`/${id}`, productDto);
    return `Product ${id} created successfully`;
  }
}
