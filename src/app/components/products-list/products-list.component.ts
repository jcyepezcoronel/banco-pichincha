import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/interfaces/product.interface';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  productsList: IProduct[] = []
  productsFilter: IProduct[] = []
  productsQuantity: number = 5
  quantityOptions = [5,10,15,20]
  searchText: string = ""

  constructor(
    private readonly productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) =>{
      this.productsList = products
      this.productsFilter = this.productsList
      this.changeQuantity()
    })
  }

  changeQuantity(){
    this.productsFilter = this.productsFilter.slice(0,this.productsQuantity)
  }

  filterProducts() {
    this.productsFilter = this.productsList
      .filter((product) => product.name.toLowerCase().includes(this.searchText.toLowerCase()))
      .filter((product) => product.description.toLowerCase().includes(this.searchText.toLowerCase()));
    this.changeQuantity()
  }
}
