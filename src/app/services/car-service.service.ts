import { Injectable } from '@angular/core';
import { ServiceModel } from '../models/service.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarServiceService {

  constructor(private http: HttpClient) {}

  getServicesByCategory(category: string) {
    console.log(category, "from service");
    return this.http.get(`http://localhost:8080/api/productModels/search/findByCategory?category=${encodeURIComponent(category)}`);
  }
}
