import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { ILogin } from './../../interfaces/iLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: ILogin = {
    email: '',
    password: ''
  };
  submitted = false;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.clientService.login(this.loginUser)
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
    this.loginUser = {
      email: '',
      password: ''
    };
  }

}
