import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { IProduct } from 'src/app/interfaces/product.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productsList: IProduct[] = [];
  productsFilter: IProduct[] = [];
  productsQuantity: number = 5;
  quantityOptions = [5, 10, 15, 20];
  searchText: string = '';
  modalActive: boolean = false;
  isDropdownOpen: boolean = false;
  index!: number;
  selectedProduct: IProduct | undefined;

  constructor(
    private readonly productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  changeQuantity() {
    this.productsFilter = this.productsList.slice(0, this.productsQuantity);
  }
  //Funcion para ir a la pagina de agregar producto
  addProduct() {
    this.router.navigateByUrl('/addProduct');
  }
  //Filtramos los productos
  filterProducts() {
    this.productsFilter = this.productsList
      .filter((product) =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      )
      .filter((product) =>
        product.description
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
      );
    this.changeQuantity();
  }
  //Funcion para desplegar dropdown de editar y eliminar
  toggleDropdown(indicator: any) {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.index = indicator;
  }
  //Funcion para redigir a la vista de editar producto
  editProduct(product: IProduct) {
    this.router.navigate(['addProduct'], { state: product });
  }
  //Abrir modal
  openModal(product: IProduct) {
    this.selectedProduct = product;
    this.modalActive = true;
  }
  //Funcion para llamar el servicio de eliminar producto
  deleteProduct(id: string) {
    try {
      this.productService.deleteProducts(id).subscribe(() => {
        this.getData();
      });
    } catch (error) {
      console.log('mensaje de error', error);
    }
  }
  //Confirmar eliminar el producto de modal
  manageClose(isDelete: boolean) {
    if (isDelete) this.deleteProduct(this.selectedProduct!.id);
    this.modalActive = false;
  }
  //Funcion para obtener la data del servicio obtener productos
  getData() {
    this.productService.getProducts().subscribe((products: any) => {
      this.productsList = products;
      this.productsFilter = this.productsList;
      this.changeQuantity();
    });
  }
}
