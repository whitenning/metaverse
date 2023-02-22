import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() modal: any = {
    header: '',
    type: '',
    text: '',
    link: '',
    linkText: '',
    textButton: ''
  }
  @Output() closeModal = new EventEmitter();

 
}
