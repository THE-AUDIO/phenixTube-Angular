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
export class HomeComponent implements AfterViewInit, OnInit{
  type:string | null = sessionStorage.getItem('type_video');
  videoList!: VideoModel[]
  isDarkMode:boolean = false;
  isChoose:boolean = false;
  chooseState:boolean = true
  @ViewChild('presentation')sectionPresentation!: ElementRef;
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;

  constructor(
    private themeService: ThemeService,
    private videoService: VideoService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.displatVideo()
    this.chooseStateClicked();
  }


  ngAfterViewInit(): void {
    setTimeout(() => {
      this.handleVideoElements()
    }, 3000);
  }
  
  chooseStateClicked(){
    console.log(this.chooseState);
    if(this.type !=null){
      this.chooseState = false;
    console.log(this.chooseState);
    }
  }
  async displatVideo(){
    if(this.type !=null){
      await this.getAllvideo(this.type)
    }
  }
  handleVideoElements(): void {
    const allVideoElements = this.videoPlayers.toArray();
    console.log(allVideoElements);
    allVideoElements.forEach((videoElement: ElementRef) => {
      const video = videoElement.nativeElement as HTMLVideoElement;
      video.controls
      video.play()
      video.currentTime = 5
      video.pause()
    });
  }
  
  tggleDarokMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
  async chooseType(type:string){
    this.type = type
     if (!this.isChoose) {
      this.getAllvideo(this.type)
      sessionStorage.setItem('type_video', this.type)
      this.sectionPresentation.nativeElement.innerHTML = '';
      this.isChoose = true
     }
  }
  
  async getAllvideo(type:string){
      (this.videoService.getAllVideo(type)).subscribe((data)=>{
        this.videoList = data
        
      })  
  }
  playOne(id:number) {
      this.route.navigate([`phenixTube/${id}`])
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
  
}
