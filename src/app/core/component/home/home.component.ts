import { VideoModel } from './../../models/video.model';
import { VideoService } from './../../service/video.service';
import {  AfterViewInit, Component, ElementRef, OnInit, QueryList, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ThemeService } from '../../service/theme.service';
import { Router } from '@angular/router';
import { FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit{
  type:string | null = sessionStorage.getItem('type_video')
  autrevideo!: VideoModel[]
  videoList!: VideoModel[]
  isDarkMode:boolean = false;
  isChoose:boolean = false;
  chooseState:boolean = true
  searchCtrl!: FormControl
  @ViewChild('presentation')sectionPresentation!: ElementRef;
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;

  constructor(
    private themeService: ThemeService,
    private videoService: VideoService,
    private route: Router,
    private formBuilder:FormBuilder
  ) {}
  ngOnInit(): void {
    this.displatVideo()
    this.chooseStateClicked();
    setTimeout(() => {
      this.handleVideoElements()
    }, 1000);
   this.iniSearch()

  }

  iniSearch() {
    this.searchCtrl = this.formBuilder.control('');
  
    this.searchCtrl.valueChanges.pipe(
      debounceTime(100),               // Délai de 300ms avant d'exécuter la recherche
      distinctUntilChanged()           // Ne déclenche la recherche que si la valeur a changé
    ).subscribe((searchTerm: string) => {
      if (searchTerm.length !=0) {
        // Filtrage de la liste des vidéos en fonction de la recherche
        this.videoList = this.autrevideo.filter((video) =>
          video.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(this.videoList);
        
      } else {
        // Si le champ de recherche est vide, on réinitialise la liste
        this.videoList = this.autrevideo;  // Assuming allVideos is the full unfiltered list
      }
    });
  }
  ngAfterViewInit(): void {
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
  
  handleVideoElements(){
    this.videoService.handleVideoElements(this.videoPlayers)
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
        this.autrevideo = data
      })  
  }
  playOne(id:number) {
      this.route.navigate([`phenixTube/${id}`])
    }
    onMouseEnter(event: MouseEvent): void {
      const videoElement = event.target as HTMLVideoElement;
      // videoElement.play();  // Lance la vidéo quand l'utilisateur survole
      videoElement.currentTime = 0;  // Reviens au début pour voir un aperçu
    }
  
    onMouseLeave(event: MouseEvent): void {
      const videoElement = event.target as HTMLVideoElement;
      videoElement.pause();  // Met la vidéo en pause quand la souris quitte l'élément
    }
  
}
