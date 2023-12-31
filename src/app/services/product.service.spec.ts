import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

const httpClientMock = {
  get: jest.fn(),
};

const productsListMock = [
  {
    id: 'trj-crd',
    name: 'Tarjetas de Credito',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00',
  },
];

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    service = TestBed.inject(ProductService);
    httpClientMock.get.mockReturnValue(productsListMock);
  });

  //   Verificacion de la lista de producto
  describe('getProducts', () => {
    it('should return ProductsList', () => {
        const spy = jest.spyOn(httpClientMock, 'get').mockReturnValue(of(productsListMock));
        service.getProducts();
        expect(spy).toHaveBeenCalled(); 
    });
  });

  //   Valida que el servicio haya sido creado
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
