import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TvShow } from '../models/TvShow';
import { ResponseData } from '../models/response';
import { RequestData } from '../models/request';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class TvShowService {

  constructor(private http: HttpClient) { }

  getAllShows(): Observable<TvShow[]> {
    return this.http.get<any>(`${environment.baseUrl}/tvShow/allShows`);
  }

  getGenres(): Observable<string[]>{
    return this.http.get<any>(`${environment.baseUrl}/tvShow/genres`);
  }

  getOnlyRecommended(request: RequestData): Observable<ResponseData>{
    return this.http.post<any>(`${environment.baseUrl}/tvShow/listByRecommended`, request);
  }
  
  getRecommendation(request: RequestData): Observable<ResponseData>{
    return this.http.post<any>(`${environment.baseUrl}/tvShow/listByGenre`, request);
  }
  resetRecommendation(user: User): Observable<User>{
    let queryParams = new HttpParams();
    let id: any = user.id;
    queryParams = queryParams.append("id",id);
    return this.http.get<any>(`${environment.baseUrl}/tvShow/resetRecommendation`,{params: queryParams} );
  }
}
