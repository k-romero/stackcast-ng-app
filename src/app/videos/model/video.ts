import {Comment} from './comment';

export class Video {
  videoId: number;
  videoName: string;
  videoPath: string;
  videoType: string;
  videoViews: number;
  originalVideoKey: string;
  userId: number;
  comments: Comment[];
}
