import {Component, OnInit, TemplateRef} from '@angular/core';
import {DAOUser} from '../signup/signup.component';
import {ApiService} from '../shared/api.service';
import {Video} from '../videos/model/video';
import {Comment} from '../videos/model/comment';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    // For Modal
    modalRef: BsModalRef;
    config = {
      keyboard: false
    };

    userModel: DAOUser = undefined;

    allVideos: Video[] = [];
    allComments: Comment[] = [];
    isShow = false;
    isEmpty = false;
    videoId = 0;

    commentModel: Comment = {
      commentId: undefined,
      username: sessionStorage.getItem('username'),
      dateCreated: undefined,
      userId: undefined,
      message: '',
      video: undefined
    };

  constructor(private apiService: ApiService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.apiService.getUserDetails(sessionStorage.getItem('username')).subscribe(
        data => {
            this.userModel = data;
            this.getAllUserVideos();
        }
    );
  }

    public getAllUserVideos(){
        console.log('yes');
        this.apiService.getAllUserVideos(this.userModel.id).subscribe(
            res => {
                this.allVideos = res;
                this.toggleHiddenImage();
            },
            err => {
                alert('An error has occurred fetching videos!');
            });
    }

    toggleHiddenDiv() {
        this.isShow = !this.isShow;
    }

    toggleHiddenImage() {
      if (this.allVideos.length === 0){
        this.isEmpty = true;
      }
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
                location.reload();
            },
            error => {
                alert('Error saving comment!');
            }
        );
    }

    // TODO implement new modal show function
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, this.config);
    }

}
