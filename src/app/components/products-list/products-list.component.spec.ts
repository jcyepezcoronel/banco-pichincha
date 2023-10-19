import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './products-list.component';
import { ProductService } from 'src/app/services/product.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let service: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ProductsListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // Esperar que el componente este creado
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
