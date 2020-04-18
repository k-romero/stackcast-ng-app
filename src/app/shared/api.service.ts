import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Video } from "../videos/model/video";
import { Comment } from "../videos/model/comment";
import { DAOUser } from "../signup/signup.component";
import {map} from "rxjs/operators";

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
    private USER_VIDEOS = `${this.BASE_URL_VIDEOS}\\showUserVideos`;

    //COMMENT ENDPOINTS
    private  ALL_COMMENTS_BY_VIDEO_ID = `${this.BASE_URL_COMMENTS}\\showByVideo`;
    private  CREATE_COMMENT = `${this.BASE_URL_COMMENTS}\\create`;

    //USERS ENDPOINTS
    private  CREATE_USER =  `${this.BASE_URL_USERS}\\create`;
    private  FIND_USER_BY_USERNAME =  `${this.BASE_URL_USERS}\\find`;

    //AUTHENTICATION ENDPOINT
    private REGISTER_NEW_USER = `${this.BASE_URL}\\register`;

    constructor(private http: HttpClient) {}

    //VIDEO RELATED CALLSw
    getAllVideos() : Observable<Video[]>{
        return this.http.get<Video[]>(this.ALL_VIDEOS);
    }

    getAllUserVideos(userId:number) : Observable<Video[]>{
        console.log('Api Service Firing off with userId' + userId);
        return this.http.get<Video[]>(this.USER_VIDEOS + '/' + userId);
    }

    upload(videoName: string,userId: number ,file: File): Observable<HttpEvent<any>> {
        const formData: FormData = new FormData();
        formData.append('file',file);
        formData.append('videoName',videoName);
        const req = new HttpRequest('POST', this.UPLOAD_VIDEO + '/' + userId ,formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    //COMMENT RELATED CALLS
    getAllCommentsFromVideo(videoId: number) : Observable<Comment[]>{
        return this.http.get<Comment[]>(this.ALL_COMMENTS_BY_VIDEO_ID + '/' + videoId);
    }

    addCommentToVideo(videoId: number, comment:Comment) : Observable<any>{
        return this.http.post(this.CREATE_COMMENT + '/' + videoId,comment);
    }

    //USER RELATED CALLS
    createUser(user: DAOUser) : Observable<any>{
        return this.http.post<any>('http://localhost:8080/register',user);
    }

    getUserDetails(userName:string) : Observable<any>{
        // const formData: FormData = new FormData();
        // formData.append('userName',userName);
        return this.http.get<DAOUser>(this.FIND_USER_BY_USERNAME + '/' + userName);
    }

}
