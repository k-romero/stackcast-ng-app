import {AfterViewInit, Component, Directive, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { Video } from './model/video';
import { Comment } from './model/comment';
import {ApiService} from '../shared/api.service';

// @Directive({
//   selector: '[appDirectVideo]'
// })
// export class CardHoverDirective {
//   constructor(private el: ElementRef) {
//     el.nativeElement.onplaying.call(increment);
//   }
//
//
// }


@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, AfterViewInit {
  allVideos: Video[] = [];
  allComments: Comment[] = [];
  singleVideoModel: Video = undefined;
  singleVideo = false;
  eventVideo = undefined;
  newComment = null;
  clear: string;
  isShow = false;
  videoId = 0;
  commentModel: Comment = {
    commentId: undefined,
    username: sessionStorage.getItem('username'),
    dateCreated: undefined,
    userId: undefined,
    message: '',
    video: undefined
  };

  constructor(private apiService: ApiService) {
  }

  ngAfterViewInit(): void {
    console.log(this.videoId);
  }

  ngOnInit() {
    this.getAllVideos();
    console.log(this.videoId);
    this.videoId++;
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
    console.log(this.eventVideo);
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

  increment() {
    this.singleVideoModel.videoViews += 1;
  }

}


