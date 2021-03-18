import { ClientService } from './../client.service';
import { FormControl, Validators } from '@angular/forms';
import { ModalMaterialService } from 'modal-material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  idLogin = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  submitted = false;


  constructor(private clientService: ClientService, private modal: ModalMaterialService ) { }

  ngOnInit(): void {  }

  addClient(): void {

    this.submitted = true;
    const client: any = {
      idLogin: this.idLogin.value,
      name: this.name.value };


    this.clientService.addClient(client).subscribe((res) => {
      this.modal.mTSuccessConfirm({
        btnConfirmTitle: 'boa',
        title: 'sucesso',
        description: res,
        btnCloseTitle: 'fechar',
        width: 'auto',
        height: 'auto',
        disableClose: true
      }).subscribe(() => {
        window.location.href = 'client';
      });
    }, (error) => {
      this.submitted = false;
      this.modal.mTError({
        btnCloseTitle: 'Fechar',
        description: error.error,
        disableClose: true,
        height: 'auto',
        width: 'auto',
        title: 'Deu erro'
      });
      console.log(error);
    });
  }

  getErrorMessageIdLogin(): any {
    if (this.idLogin.hasError('required')) {
      return 'Campo idLogin é Obrigatório.';
    }
  }
  getErrorMessageName(): any {
    if (this.name.hasError('required')) {
      return 'Campo nome é Obrigatório.';
    }
  }
}


