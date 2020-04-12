import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Video} from "./model/video";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  allVideos: Video[] = [];


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllVideos();
  }

  public getAllVideos(){
    this.apiService.getAllVideos().subscribe(
      res => {
        this.allVideos = res;
      },
      err => {
        alert("An error has occurred fetching videos")
      });

  }

}
