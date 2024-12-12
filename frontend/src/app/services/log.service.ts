import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = environment.BACKEND_URL + '/parcial/usuarios/';

  constructor(private http: HttpClient) {}
  
  getLog(): Observable<any[]> {
    let url = this.apiUrl;

    return this.http
      .get<{ wikis: any[] }>(url)
      .pipe(map((response) => response.wikis));
  }
}
