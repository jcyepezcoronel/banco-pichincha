import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/services/product.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddProductComponent', () => {
  let fixture: ComponentFixture<AddProductComponent>;
  let component: AddProductComponent;
  let productServiceStub: any;
  let routerStub: any;
  let router: Router;
  let fb : FormBuilder;

  beforeEach(() => {
    productServiceStub = {
      sendProducts: jest.fn(() => Promise.resolve()),
      editProducts: jest.fn(() => Promise.resolve()),
    };
    
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule, FormsModule,RouterTestingModule.withRoutes([])],
      declarations: [AddProductComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ProductService, useValue: productServiceStub },
        Router,
        FormBuilder,
      ],
    })
    fixture = TestBed.createComponent(AddProductComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid register form', () => {
    expect(component.registerForm.valid).toBeFalsy();

    component.registerForm.controls['id'].setValue('1234567890');
    component.registerForm.controls['name'].setValue('Test Product');
    component.registerForm.controls['description'].setValue('This is a test product');
    component.registerForm.controls['logo'].setValue('https://example.com/logo.png');
    component.registerForm.controls['date_release'].setValue('2023-10-19');
    component.registerForm.controls['date_revision'].setValue('2024-10-19');

    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should call the product service when submitting the form', () => {
    const productService = TestBed.inject(ProductService);
    const spy = jest.spyOn(productService, 'sendProducts');

    component.sendForm();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(component.registerForm.value);
  });

  it('should call the product service when editing the form', () => {
    const productService = TestBed.inject(ProductService);
    const spy = jest.spyOn(productService, 'editProducts');

    component.editForm();

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(component.registerForm.value);
  });
});
