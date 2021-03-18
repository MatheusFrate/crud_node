import { AddClientComponent } from './components/add-client/add-client.component';
import { IClient } from './interfaces';
import { Component, OnInit } from '@angular/core';
import { ClientService } from './components/client.service';
import { ModalMaterialService } from 'modal-material';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor(private clientService: ClientService, private modal: ModalMaterialService) {}

  ngOnInit(): void {}

  logout(): void {
    this.clientService.logout().subscribe((res) => {
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
}
