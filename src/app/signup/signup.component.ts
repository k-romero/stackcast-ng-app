import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userModel:UserViewModel = {
    userName: '',
    password: '',
    isConnected: true
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  createUser(): void{
    this.apiService.createUser(this.userModel).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("Error creating user. Please try entering your information again.")
      }
    );
  }

}

export interface UserViewModel {
  userName:string;
  password:string;
  isConnected: boolean;
}
