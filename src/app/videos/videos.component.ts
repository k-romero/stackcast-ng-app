import { Component, OnInit } from '@angular/core';
import { Video } from './model/video';
import { Comment } from './model/comment';
import {ApiService} from '../shared/api.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  allVideos: Video[] = [];
  allComments: Comment[] = [];

  singleVideoModel: Video = undefined;
  singleVideo = false;

  newComment = null;
  clear: string;
  commentModel: Comment = {
    commentId: undefined,
    username: sessionStorage.getItem('username'),
    dateCreated: undefined,
    userId: undefined,
    message: '',
    video: undefined
  };

  isShow = false;
  videoId = 0;

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
        alert('An error has occurred fetching videos!');
      });
  }

  toggleHiddenDiv() {
    this.isShow = !this.isShow;
  }

  populateSingleVideoAndShow(currVideoId: number){
    this.singleVideoModel = this.allVideos.find(value => value.videoId === currVideoId);
    this.singleVideo = !this.singleVideo;
  }

  onVideoSelect(id: number) {
    this.videoId = id;
    this.apiService.getAllCommentsFromVideo(this.videoId).subscribe(
      res => {
        this.allComments = res;
      },
      err => {
        alert('An error has occurred fetching comments!');
      });
    console.log(this.videoId);
  }

  public addCommentToVideo(videoId: number, ){
    this.apiService.addCommentToVideo(videoId, this.commentModel).subscribe(
      res => {
        this.newComment = res;
        this.singleVideoModel.comments.push(this.newComment);
        this.clear = '';
      },
      error => {
        alert('Error saving comment!');
      }
    );
    this.clear = '';
  }
}

