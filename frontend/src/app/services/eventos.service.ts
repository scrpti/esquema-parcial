import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = environment.BACKEND_URL + '/eventos/';
  private eventos: any[] = [];

  constructor(private http: HttpClient) {}
  
  getEventos(): Observable<any[]> {
    let url = this.apiUrl;
    //Quiero ver la respuesta de la peticion
    
    
    return this.http.get<any[]>(url).pipe(
      map((data) => {
        this.eventos = data;
        return data;
      })
    );
  }
}
