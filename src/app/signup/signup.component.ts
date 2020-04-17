import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/api.service";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {Video} from "../videos/model/video";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    userModel: DAOUser = {
        id: undefined,
        userName: '',
        password: '',
        dateCreated: '',
        isConnected: true,
        userVideos: []
    };

    constructor(private router: Router, private apiService: ApiService, private authService: AuthenticationService) { }

    ngOnInit(): void {
    }

    createUser(){
        console.log(this.userModel);
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

export class DAOUser {
    id:number;
    userName:string;
    password:string;
    dateCreated:string;
    isConnected: boolean;
    userVideos:Video[];
}
