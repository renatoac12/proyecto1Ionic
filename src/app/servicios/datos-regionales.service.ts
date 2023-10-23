import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosRegionalesService {

    private apiUrl = 'https://dev.matiivilla.cl/duoc/location/region'

    public apiUrl2 = 'https://dev.matiivilla.cl/duoc/location/comuna/'

  constructor(private http: HttpClient) { }

  obtenerRegiones():Observable<any>{
    return this.http.get<any>(this.apiUrl)
  }

  obtenerComunas(regionId:any):Observable<any>{
    return this.http.get<any>(this.apiUrl2+regionId)
  }
}
