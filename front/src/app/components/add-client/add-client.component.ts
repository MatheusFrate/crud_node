import { ClientService } from './../client.service';
import { IClient } from './../../interfaces/iClient';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: IClient = {
    idLogin: 0,
    name: ''
  };
  submitted = false;


  constructor(private clientService: ClientService ) { }

  ngOnInit(): void {  }

  addClient(): void {
    this.clientService.addClient(this.client)
        .subscribe(
            res => {
              console.log(res);
              this.submitted = true;
            },
            error => {
              console.log(error);
            }
        );
  }

  newTutorial(): void {
    this.submitted = false;
    this.client = {
      idLogin: 0,
      name: ''
    };
  }
}

