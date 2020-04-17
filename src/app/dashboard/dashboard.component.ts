import { Component, OnInit } from '@angular/core';
import {DAOUser} from "../signup/signup.component";
import {ApiService} from "../shared/api.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    userModel: DAOUser = undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getUserDetails(sessionStorage.getItem('username')).subscribe(
        data => {
            this.userModel = data;
            console.log(this.userModel);
        }
    )
  }


}
