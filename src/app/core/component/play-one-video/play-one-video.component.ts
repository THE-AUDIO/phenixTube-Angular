import { AfterViewInit, Component, OnInit } from '@angular/core';
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
export class PlayOneVideoComponent implements AfterViewInit, OnInit{
  videoFound$!: Observable<VideoModel | undefined>;
  videoSuggestion!:VideoModel[]
  constructor(
    private activeRoute: ActivatedRoute,
    private videoService: VideoService
  ) {}
  ngOnInit(): void {
    this.getVideosuggestion()
  }
  ngAfterViewInit(): void {
    this.getOneVideoToPlay();
  }

  getVideosuggestion(){
    const type = sessionStorage.getItem('type_video')
    console.log('je suis '+type);
    
    if(type){
    this.videoService.getAllVideo(type).subscribe((data)=>{
      this.videoSuggestion = data
      console.log(this.videoSuggestion);
      
    })
    }
  }

  getOneVideoToPlay(): void {
    // Utilisation de switchMap pour gérer les changements de paramètres de route dynamiquement
    this.videoFound$ = this.activeRoute.params.pipe(
      switchMap(params => {
        const videoId = +params['id'];
        console.log(videoId);
        return this.videoService.getVideoById(videoId);
      })
    );
  }
}
