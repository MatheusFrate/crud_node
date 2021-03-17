import { AddClientComponent } from './components/add-client/add-client.component';
import { IClient } from './interfaces';
import { Component, OnInit } from '@angular/core';
// import { ClientServiceService } from './services/client.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{


  constructor() {}

  ngOnInit(): void {}
}
