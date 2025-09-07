import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { AddProduct } from '../add-product/add-product';
import { EditProduct } from '../edit-product/edit-product';

@Component({
  selector: 'app-products',
  imports: [CommonModule, AddProduct, EditProduct],
  /*   template:`<p>Chamath is a software engineer.</p><br><p>products works!</p>`, */
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {
  public productQuantityLimit = 0;
  public rowIndexNumber: number | undefined;
  public isRowSelected: boolean | undefined;
  public showaddproduct: boolean = false;
  public showeditproduct: boolean = false;

  public productList: Product[] = [];
  public isQuantityAvailable = true;

  constructor(private productService: ProductService) {
    this.productList = this.productService.getProducts();
  }

  public getProductQuantity(productList: Product[]): boolean {
    return productList.some((product) => product.quantity > 0);
  }

  public selectProduct(index: number) {
    this.rowIndexNumber = index;
    this.isRowSelected = true;
    console.log(this.rowIndexNumber);
  }

  public showAddProduct() {
    this.showaddproduct = true;
    this.showeditproduct = false;
  }

  public hideAddProduct() {
    this.showaddproduct = false;
  }

  public editProduct(index: number) {
    this.rowIndexNumber = index;
    this.isRowSelected = true;
    this.showeditproduct = true;
    this.showaddproduct = false;
    console.log('Editing product at index:', index);
  }

  public addProduct(product: Product) {
    this.productService.addProduct(product);
    this.productList = this.productService.getProducts();
    this.showaddproduct = false;
  }

  public updateProduct(index: number, product: Product) {
    this.productService.updateProduct(index, product);
    this.productList = this.productService.getProducts();
    this.showeditproduct = false;
  }
  public deleteProduct(index: number) {
    this.productService.deleteProduct(index);
    this.productList = this.productService.getProducts();
    this.isRowSelected = false;
  }
}
