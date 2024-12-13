import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { AuthGoogleService } from "./auth-google.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class MarcadoresService {
  private apiUrl = environment.BACKEND_URL + "/marcadores/";
  private marcadores: any[] = [];
  private email: string | undefined = '';

  constructor(
    private http: HttpClient,
    private authService: AuthGoogleService,
    private userService: UserService,
  ) {

    console.log(this.userService.getUserEmail())
    this.email = this.userService.getUserEmail()  
   }

  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getTokenId();
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Incluir el token Bearer en los encabezados
    });
  }

  getMarcadores(): Observable<any[]> {
    let url = this.apiUrl;
    //Quiero ver la respuesta de la peticion
    //Aqui le pondremos como query el email del usuario
    this.email = this.userService.getUserEmail();
    console.log("Email del usuario: ", this.email);
    url = url + "?email=" + this.email;
    console.log("URL de la API: ", url);
    const headers = this.createAuthHeaders();
    return this.http.get<any[]>(url, { headers }).pipe(
      map((data) => {
        return data;
      }),
    );
  }

}
