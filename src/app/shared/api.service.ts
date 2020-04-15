import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../videos/model/video";
import {Comment} from "../videos/model/comment";
import {UserViewModel} from "../signup/signup.component";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    //BASE URLS
    private BASE_URL = "http://localhost:8080/zc-video-app";
    private BASE_URL_VIDEOS = `${this.BASE_URL}\\videos`;
    private BASE_URL_COMMENTS = `${this.BASE_URL}\\comments`;
    private BASE_URL_USERS = `${this.BASE_URL}\\users`;

    //VIDEO ENDPOINTS
    private  ALL_VIDEOS = `${this.BASE_URL_VIDEOS}\\show`;
    private  UPLOAD_VIDEO = `${this.BASE_URL_VIDEOS}\\upload`;

    //COMMENT ENDPOINTS
    private  ALL_COMMENTS_BY_VIDEO_ID = `${this.BASE_URL_COMMENTS}\\showByVideo`;
    private  CREATE_COMMENT = `${this.BASE_URL_COMMENTS}\\create`;

    //USERS ENDPOINTS
    private  CREATE_USER =  `${this.BASE_URL_USERS}\\create`;
    private  FIND_USER_BY_USERNAME =  `${this.BASE_URL_USERS}\\find`;

    constructor(private http: HttpClient) {}


    getAllVideos() : Observable<Video[]>{
        return this.http.get<Video[]>(this.ALL_VIDEOS);
    }

    createUser(user: UserViewModel) : Observable<any>{
        return this.http.post(this.CREATE_USER,user);
    }

    upload(videoName: string ,file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file',file);
        formData.append('videoName',videoName);
        const req = new HttpRequest('POST', this.UPLOAD_VIDEO,formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    getAllCommentsFromVideo(videoId: number) : Observable<Comment[]>{
        return this.http.get<Comment[]>(this.ALL_COMMENTS_BY_VIDEO_ID + '/' + videoId);
    }

    addCommentToVideo(videoId: number, comment:Comment) : Observable<any>{
        return this.http.post(this.CREATE_COMMENT + '/' + videoId,comment);
    }


}
