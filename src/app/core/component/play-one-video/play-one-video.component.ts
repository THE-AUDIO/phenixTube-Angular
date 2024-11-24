import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../service/video.service';
import { VideoModel } from '../../models/video.model';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-play-one-video',
  templateUrl: './play-one-video.component.html',
  styleUrls: ['./play-one-video.component.scss']
})
export class PlayOneVideoComponent implements OnInit {
  videoFound$!: Observable<VideoModel | undefined>;

  constructor(
    private activeRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.getOneVideoToPlay();
  }

  getOneVideoToPlay(): void {
    // Utilisation de switchMap pour gérer les changements de paramètres de route dynamiquement
    this.videoFound$ = this.activeRoute.params.pipe(
      switchMap(params => {
        const videoId = +params['id'];
        return this.videoService.getVideoById(videoId);
      })
    );
  }
}
