import { ElementRef, Injectable, QueryList } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environnement } from 'src/environnements/environnement';
import { VideoModel } from '../models/video.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private http: HttpClient) {}
  VideoList!: Observable<VideoModel[]>
  // Récupérer toutes les vidéos
  getAllVideo(type:string): Observable<VideoModel[]> {
    return this.VideoList = this.http.get<VideoModel[]>(`${environnement.apiUrl}/${type}`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des vidéos', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  // Récupérer une vidéo par son ID
  getVideoById(videoId: number): Observable<VideoModel | undefined> {
    const type = sessionStorage.getItem('type_video')
    console.log(type); 
    if(type){
      this.getAllVideo(type)
    }
    return this.VideoList.pipe(
      map(allVideos => allVideos.find(video => video.id === videoId))
    );
  }
  handleVideoElements(videoPlayers:QueryList<ElementRef>): void {
    const allVideoElements = videoPlayers.toArray();
    console.log(allVideoElements);
    allVideoElements.forEach((videoElement: ElementRef) => {
      const video = videoElement.nativeElement as HTMLVideoElement;
      video.controls
      video.play()
      video.currentTime = 15
      video.pause()
    });
  }
  onMouseEnter(event: MouseEvent): void {
    const videoElement = event.target as HTMLVideoElement;
    videoElement.play();  // Lance la vidéo quand l'utilisateur survole
    videoElement.currentTime = 0;  // Reviens au début pour voir un aperçu
  }

  onMouseLeave(event: MouseEvent): void {
    const videoElement = event.target as HTMLVideoElement;
    videoElement.currentTime = 15
    videoElement.pause(); 
     // Met la vidéo en pause quand la souris quitte l'élément
  }
}
