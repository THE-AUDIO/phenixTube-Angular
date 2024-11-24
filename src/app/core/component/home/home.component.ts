import { VideoModel } from './../../models/video.model';
import { VideoService } from './../../service/video.service';
import {  AfterViewInit, Component, ElementRef, OnInit, QueryList, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  videoList!: VideoModel[]
  isDarkMode:boolean = false;
  isChoose:boolean = false
  @ViewChild('presentation')sectionPresentation!: ElementRef;
  @ViewChildren('videos') videoPlayers!: QueryList<any>

  constructor(
    private themeService: ThemeService,
    private videoService: VideoService,
    private route: Router
  ) {}
  advanceAllVideos(): void {
    this.videoPlayers.forEach((video) => {  
      const videoElement = video.nativeElement as HTMLVideoElement;
      if (videoElement) {
        videoElement.currentTime += 80;  // Avancer de 80 secondes
      }
    });
  }

  tggleDarokMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  chooseType(){    
     if (!this.isChoose) {
      this.sectionPresentation.nativeElement.innerHTML = '';
      this.isChoose = true
     }
  }
  async getAllvideo(){
       (this.videoService.getAllVideo()).subscribe((data)=>{
        this.videoList = data
        console.log(this.videoList);   
      })
  }
  playOne(id:number) {
      this.route.navigate([`phenixTube/${id}`])
      console.log(id);
    }
    onMouseEnter(event: MouseEvent): void {
      const videoElement = event.target as HTMLVideoElement;
      videoElement.play();  // Lance la vidéo quand l'utilisateur survole
      videoElement.currentTime = 0;  // Reviens au début pour voir un aperçu
    }
  
    onMouseLeave(event: MouseEvent): void {
      const videoElement = event.target as HTMLVideoElement;
      videoElement.pause();  // Met la vidéo en pause quand la souris quitte l'élément
    }
    ngOnInit(): void {
      this.getAllvideo()
    }
    ngAfterViewInit(): void {
      this.advanceAllVideos()
    }
}
