import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/app/interfaces';
import { ModalMaterialService } from 'modal-material';


@Component({
  selector: 'app-get-all-clients',
  templateUrl: './get-all-clients.component.html',
  styleUrls: ['./get-all-clients.component.css']
})
export class GetAllClientsComponent implements OnInit {


  clients: IClient[] = [];
  idLog = 0;
  idClient = 0;
  isAuth = false;
  constructor(private clientService: ClientService, private modal: ModalMaterialService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe((res) => {
      this.isAuth = true;
      this.clients = res;
      console.log(res);
    }, (error) => {
      this.isAuth = false;
      this.modal.mTErrorConfirm({
        btnConfirmTitle: 'entendido',
        btnCloseTitle: 'Fechar',
        description: error.error,
        disableClose: true,
        height: 'auto',
        width: 'auto',
        title: 'Erro'
      }).subscribe(() => {
          window.location.href = 'addClient';
      });
    });
  }

  delete(idClient: any): void {
    const obj: any = {
      id: idClient
    };
    this.clientService.deleteClient(obj).subscribe((res) => {
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
