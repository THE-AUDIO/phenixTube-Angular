import { Injectable } from '@angular/core';
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

  // Récupérer toutes les vidéos
  getAllVideo(): Observable<VideoModel[]> {
    return this.http.get<VideoModel[]>(`${environnement.apiUrl}/video`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des vidéos', error);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }

  // Récupérer une vidéo par son ID
  getVideoById(videoId: number): Observable<VideoModel | undefined> {
    return this.getAllVideo().pipe(
      map(allVideos => allVideos.find(video => video.id === videoId))
    );
  }
}
