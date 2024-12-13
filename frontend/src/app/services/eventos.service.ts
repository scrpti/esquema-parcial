import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { AuthGoogleService } from "./auth-google.service";

@Injectable({
  providedIn: "root",
})
export class EventosService {
  private apiUrl = environment.BACKEND_URL + "/eventos/";
  private eventos: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthGoogleService,
  ) { }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getTokenId();
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Incluir el token Bearer en los encabezados
    });
  }

  getEventos(): Observable<any[]> {
    let url = this.apiUrl;
    //Quiero ver la respuesta de la peticion

    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data) => {
        this.eventos = data;
        return data;
      }),
    );
  }
}
