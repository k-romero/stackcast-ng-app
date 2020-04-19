import {Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-videomodal',
  templateUrl: './videomodal.component.html',
  styleUrls: ['./videomodal.component.scss']
})
export class VideomodalComponent implements OnInit {

  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
  }

}
