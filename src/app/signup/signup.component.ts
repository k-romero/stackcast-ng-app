import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  createUser(): void{
    let url = "http://localhost:8080/zc-video-app/users/create";
    this.http.post(url,this.userModel).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert("An error has occurred while creating user")
      }
    );
  }

}

export interface UserViewModel {
  userName:string;
  password:string;
  isConnected: boolean;
}
