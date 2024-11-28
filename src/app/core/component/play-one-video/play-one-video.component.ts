import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../service/video.service';
import { VideoModel } from '../../models/video.model';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-play-one-video',
  templateUrl: './play-one-video.component.html',
  styleUrls: ['./play-one-video.component.scss']
})
export class PlayOneVideoComponent implements AfterViewInit, OnInit{
  videoFound$!: Observable<VideoModel | undefined>;
  videoSuggestion!:VideoModel[]
  autreVideo!:VideoModel[]
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef>;
  @ViewChild('play') playedVideo!: ElementRef;
  searchCtrl!: FormControl<string | null>;
  constructor(
    private activeRoute: ActivatedRoute,
    private videoService: VideoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getVideosuggestion()
    this.iniSearch()
  }

  ngAfterViewInit(): void {
    this.getOneVideoToPlay();
    setTimeout(() => {
      this.handleVideoElements()
    }, 1000); 
  }

  handleVideoElements() {
    this.videoService.handleVideoElements(this.videoPlayers)
  }

  getVideosuggestion(){
    const type = sessionStorage.getItem('type_video')    
    if(type){
      const videoId = this.activeRoute.snapshot.params['id'];
    this.videoService.getAllVideo(type).subscribe((data)=>{
      this.autreVideo = data
      this.videoSuggestion = data.filter((video)=>{
        return video.id != videoId
      })
      
    })
    }
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
  onMouseEnter(event: MouseEvent){
    this.videoService.onMouseEnter(event);
  }
  onMouseLeave(event: MouseEvent){
    this.videoService.onMouseLeave(event)
  }
 playAnOtherVideo(id:number){
     this.videoFound$ = this.videoService.getVideoById(id)
 }

  iniSearch() {
    this.searchCtrl = this.formBuilder.control('');
  
    this.searchCtrl.valueChanges.pipe(
      debounceTime(100),               // Délai de 300ms avant d'exécuter la recherche
      distinctUntilChanged()           // Ne déclenche la recherche que si la valeur a changé
    ).subscribe((searchTerm) => {
      if (searchTerm) {
        // Filtrage de la liste des vidéos en fonction de la recherche
        this.videoSuggestion = this.autreVideo.filter((video) =>
          video.name.toLowerCase().includes(searchTerm.toLowerCase())
        );        
      } else {
        // Si le champ de recherche est vide, on réinitialise la liste
        this.videoSuggestion = this.autreVideo;  // Assuming allVideos is the full unfiltered list
      }
    });
  }
}
