import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ModalMaterialService } from 'modal-material';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  submitted = false;

  constructor(private clientService: ClientService, private modal: ModalMaterialService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.submitted = true;

    const obj = { email: this.email.value, password: this.password.value };

    this.clientService.login(obj).subscribe(() => {
      setTimeout(() => {
        window.location.href = 'addClient';
      }, 1000);
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

  getErrorMessageEmail(): any {
    if (this.email.hasError('required')) {
      return 'Campo E-mail é Obrigatório.';
    }

    return this.email.hasError('email') ? 'E-mail Informado Não é Valido.' : '';
  }
  getErrorMessagePassword(): string {
    if (this.password.hasError('required')) {
      return 'Campo Senha é Obrigatório.';
    }

    return '';
  }
}
