import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { AuthGoogleService } from "./auth-google.service";

@Injectable({
  providedIn: 'root'
})
export class CrearMarcadorService {

  private apiUrl = environment.BACKEND_URL + "/marcadores/";
  constructor(
    private http: HttpClient,
    private authService: AuthGoogleService,
  ) { }

  crearMarcador(marcadorData: any): Observable<any> {
    console.log("URL de la API: ", this.apiUrl);
    console.log(marcadorData);
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.authService.getTokenId()}`,
    });
    return this.http.post(this.apiUrl, marcadorData, { headers });
  }
}
