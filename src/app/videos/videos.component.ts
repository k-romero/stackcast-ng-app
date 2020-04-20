import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Video } from './model/video';
import { Comment } from './model/comment';
import {ApiService} from '../shared/api.service';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  animations: [
    trigger( 'isShow', [
      state('show', style({
        marginTop: '-5px',
        opacity: '1',
        display: 'block'
      })),
      state( 'notshow', style({
        marginTop: '-100px',
        opacity: '0',
        display: 'none'
      })),
      transition( 'show => notshow', [
        animate('1s')
      ]),
      transition('notshow => show', [
        animate('1s')
      ]),
    ]),
  ],
})
export class VideosComponent implements OnInit {

    allVideos: Video[] = [];
    allComments: Comment[] = [];


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
              this.allVideos.find(video => video.videoId === videoId).comments.push(this.newComment);
              this.clear = '';
            },
            error => {
                alert('Error saving comment!');
            }
        );
      this.clear = '';
    }
}

