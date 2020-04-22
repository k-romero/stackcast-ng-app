import {AfterContentInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, AfterContentInit {

  videoViews = 0;
  videoEvent = undefined;
  video = undefined;

  constructor() { }

  ngOnInit(): void {
  }

  incrementViews(event){
    this.videoEvent = event;
    const dur = event.target.duration;
    const curr = event.target.currentTime;
    const half = dur / 2;
    if (curr > half){
      this.videoViews++;
    } else {
      console.log('___________________');
      console.log(event);
      console.log('___________________');
      console.log(event.target.duration);
      console.log('___________________');
      console.log(event.target.currentTime);
    }
  }

  ngAfterContentInit(): void {
  }





}
