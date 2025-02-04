import { Injectable } from '@angular/core';
import { ServiceModel } from '../models/service.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarServiceService {
  private apiUrl = 'http://localhost:8080/api/productModels';

  constructor(private http: HttpClient) {}

  getServices(): Observable<ServiceModel[]> {
    return this.http.get<ServiceModel[]>(this.apiUrl);
  }
}
