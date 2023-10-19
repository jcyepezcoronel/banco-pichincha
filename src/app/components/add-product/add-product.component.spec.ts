import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from 'src/app/services/product.service';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [FormBuilder, ProductService],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    formBuilder = fixture.debugElement.injector.get(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with the correct initial values', () => {
    const form = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      logo: [''],
      date_release: [''],
      date_revision: [''],
    });
    component.registerForm = form;
    expect(component.registerForm.get('id')!.value).toBe('');
    expect(component.registerForm.get('name')!.value).toBe('');
    expect(component.registerForm.get('description')!.value).toBe('');
    expect(component.registerForm.get('logo')!.value).toBe('');
    expect(component.registerForm.get('date_release')!.value).toBe('');
    expect(component.registerForm.get('date_revision')!.value).toBe('');
  });

  it('should validate the form when the submit button is clicked', () => {
    const form = formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      logo: [''],
      date_release: [''],
      date_revision: [''],
    });
    component.registerForm = form;

    fixture.detectChanges();
    component.sendForm();

    expect(component.registerForm.invalid).toBe(true);
  });

  it('should set the form as valid when all fields are valid', () => {
    const form = formBuilder.group({
      id: ['trj-crd'],
      name: ['Tarjetas de credito'],
      description: ['tarjeta de consumo'],
      logo: ['https://google.com'],
      date_release: ['2023-02-01'],
      date_revision: ['2024-02-01'],
    });
    component.registerForm = form;

    fixture.detectChanges();
    component.sendForm();

    expect(component.registerForm.valid).toBe(true);
  });
});
