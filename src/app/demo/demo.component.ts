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
  videoViewFired = false;
  constructor() { }

  ngOnInit(): void {
  }

  trackTime(){
    // @ts-ignore
    const total = document.getElementById('elmEvent').duration;
    const player = document.getElementById('elmEvent');
    player.addEventListener('timeupdate', () => {
      // @ts-ignore
      this.time = player.currentTime;
      if (this.time > total / 2){
        if (!this.videoViewFired){
          this.videoViewFired = true;
          console.log('Fired Once!');
          this.videoViews++;
        }
      }
    });
  }

  ngAfterContentInit(): void {
  }





}
