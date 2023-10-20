import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { DatePipe } from '@angular/common';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [DatePipe],
})
export class AddProductComponent implements OnInit {
  registerForm;
  minDate: any = Date.now();
  date_start: any;
  date_end: any;
  state: any;
  editButton: boolean = false;
  constructor(
    fb: FormBuilder,
    private readonly productService: ProductService,
    private datePipe: DatePipe,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.state = this.activatedRoute.snapshot.queryParams;
    this.registerForm = fb.group({
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ]),
      logo: new FormControl('', Validators.required),
      date_release: new FormControl('', Validators.required),
      date_revision: new FormControl(this.date_end, Validators.required),
    });
    if (this.state) {
      this.editButton = true;
      this.setValueEdit(this.state);
    }
    this.minDate = this.datePipe.transform(this.minDate, 'yyyy-MM-dd');
  }
  //Funcion para setear el segundo input de fecha con respecto al primero, sumando un ano
  onChange(value: any) {
    this.date_start = new Date(value.target.value);
    this.date_start = this.addDays(this.date_start, 1);

    let date_end = this.date_start.setFullYear(
      this.date_start.getFullYear() + 1
    );

    this.date_end = this.datePipe.transform(date_end, 'dd/MM/yyyy');
    this.registerForm.value.date_revision = this.datePipe.transform(
      date_end,
      'yyyy-MM-dd'
    );
  }

  ngOnInit(): void {}
  //Funcion para llamar al servicio y agregar los productos
  sendForm() {
    if (this.registerForm) {
      this.productService.sendProducts(this.registerForm.value).subscribe();
      this.router.navigateByUrl('/');
    }
  }
  //Funcion para resetear el formulario
  resetForm() {
    this.registerForm.reset();
  }
  //Cargar los valores del formulario editar
  setValueEdit(state: any) {
    this.registerForm.controls['id'].setValue(state.id);
    this.registerForm.controls['name'].setValue(state.name);
    this.registerForm.controls['description'].setValue(state.description);
    this.registerForm.controls['logo'].setValue(state.logo);
    this.registerForm.controls['date_release'].setValue(
      this.datePipe.transform(state.date_release, 'yyyy-MM-dd')
    );
    this.registerForm.controls['date_revision'].setValue(
      this.datePipe.transform(state.date_revision, 'dd/MM/yyyy')
    );
  }
  //Funcion para llamar al servicio de editar, modificando la fecha
  editForm() {
    this.registerForm.value.date_revision =
      this.registerForm.value.date_revision.replaceAll('/', '-');

    this.productService.editProducts(this.registerForm.value).subscribe();
    this.router.navigateByUrl('/');
  }
  //Agregar dias a la fecha
  public addDays(date: any, days: any) {
    return new Date(date.valueOf() + days * 24 * 60 * 60 * 1000);
  }

  backHome() {
    this.router.navigateByUrl('/');
  }
}
