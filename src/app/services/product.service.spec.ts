import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';

const httpClientMock = {
    get: jest.fn(),
}

const productsListMock = [{
    id: 'trj-crd',
    name: 'Tarjetas de Credito',
    description: 'Tarjeta de consumo bajo la modalidad de credito',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png',
    date_release: '2023-02-01T00:00:00.000+00:00',
    date_revision: '2024-02-01T00:00:00.000+00:00'
}]

describe('ProductService', ()=>{
    let service: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ProductService,
                {provide: HttpClient, useValue: httpClientMock }],
        });
        service = TestBed.inject(ProductService);
        httpClientMock.get.mockReturnValue(productsListMock)
    });

    it('getProducts return ProductsList', () => {
       service.getProducts();

       expect(httpClientMock.get).toHaveBeenCalled();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    })
})