import {Component, OnInit} from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Observable} from "rxjs";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})



export class UploadComponent implements OnInit {
    selectedFiles: FileList;
    currentFile: File;
    videoName: string = '';
    progress: number = 0;
    message: string = '';

    fileInfos: Observable<any>;

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
    }



    onFileSelected(event) {
        this.selectedFiles = event.target.files;
        console.log(event);
    }

    upload() {
        this.progress = 0;
        this.currentFile = this.selectedFiles.item(0);
        this.apiService.upload(this.videoName,this.currentFile).subscribe(
            event => {
                if(event.type === HttpEventType.UploadProgress) {
                    this.progress = Math.round(100 * event.loaded / event.total);
                } else if (event instanceof HttpResponse) {
                    this.message = event.body.message;
                }
            },
            err => {
                this.progress = 0;
                this.message = 'Could not upload the file!';
                this.currentFile = undefined;
            }
        )

    }
}

