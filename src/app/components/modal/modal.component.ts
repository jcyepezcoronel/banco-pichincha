import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() name: string = '';
  @Output() submit: EventEmitter<boolean> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  //Funcion para cerrar la modal
  closeModal(action: boolean) {
    this.submit.emit(action);
  }
}
