import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getAllProducts', () => {
    it('should return an array of products', () => {
      const products = appController.getAllProducts();
      console.log(products);
      expect(typeof products === 'object').toBe(true);
    });
  });

  describe('getProduct', () => {
    it('should return a specific product', async () => {
      const id = 'T9t6vcngIY';
      const product = await appController.getProduct(id);
      expect(product).toBeDefined();
      expect(product.id).toBe(id);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a specific product', () => {
      const id = 'T9t6vcngIY';
      const response = appController.deleteProduct(id);
      expect(response).toBe(`Le produit ${id} a été supprimé !`);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', () => {
      const productDto = {
        name: 'Laptop',
        description: 'A powerful laptop for professional use',
        price: 1500,
        quantity: 7,
      };
      const response = appController.createProduct(productDto);
      expect(response).toContain('Product');
      expect(response).toContain('created successfully');
    });
  });
});
