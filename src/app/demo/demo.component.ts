import {AfterContentInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, AfterContentInit {

  videoViews = 0;
  video = undefined;
  time = 0;
  constructor() { }

  ngOnInit(): void {
  }

  trackTime(){
    setInterval(() => {
      this.time = document.getElementsByTagName('video')[0].currentTime;
    }, 100);
  }

  ngAfterContentInit(): void {
  }





}
