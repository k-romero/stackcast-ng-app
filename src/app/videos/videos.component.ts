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
  viewsHasBeenIncremented = false;
  singleVideo = false;
  eventVideo = undefined;
  newComment = null;
  clear: string;
  isShow = false;
  videoId = 0;
  time = '00.00';
  totalTime = '00.00';
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

  trackTime(){
    this.time = document.getElementsByTagName('video')[0].currentTime.toFixed(2);
    this.totalTime = document.getElementsByTagName('video')[0].duration.toFixed(2);
    setInterval(() => {
     const elTime = document.getElementsByTagName('video')[0].currentTime;
     this.time = elTime.toFixed(2);
     this.checkElapsedTime();
    }, 200);
  }

  checkElapsedTime(){
    const t = Number(this.time);
    const total = Number(this.totalTime);
    if (t > total / 2 ){
      this.increment();
    }
  }

  increment() {
    if (!this.viewsHasBeenIncremented){
      this.singleVideoModel.videoViews += 1;
      this.apiService.incrementViews(this.singleVideoModel.videoId).subscribe();
      console.log('----------------------------------------');
      console.log('Api called from component!');
      console.log('----------------------------------------');
      this.viewsHasBeenIncremented = true;
    }
  }
}


