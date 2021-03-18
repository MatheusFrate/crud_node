import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalMaterialService } from 'modal-material';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  submitted = false;
  constructor(private clientService: ClientService, private modal: ModalMaterialService) { }

  ngOnInit(): void {  }

  logout(): void {
    this.submitted = true;
    this.clientService.logout(this.name.value).subscribe((res) => {
      console.log(res);
      this.modal.mTSuccessConfirm({
        btnConfirmTitle: 'boa',
        title: 'sucesso',
        description: 'logout efetuado com sucesso',
        btnCloseTitle: 'fechar',
        width: 'auto',
        height: 'auto',
        disableClose: true
      }).subscribe(() => {
        window.location.href = 'login';
      });
    }, (error) => {
      this.submitted = false;
      this.modal.mTError({
        btnCloseTitle: 'Fechar',
        description: error.error && typeof error.error.error !== 'string' ? error.message : error.error.error,
        disableClose: true,
        height: 'auto',
        width: 'auto',
        title: 'Erro'
      });
      console.log(error);
    });
    }

getErrorMessageName(): any {
  if (this.name.hasError('required')) {
    return 'Campo nome é Obrigatório.';
  }

  return this.name.hasError('name') ? 'nome Informado Não é Valido.' : '';
}
}


