import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private API_URL = "https://petstore3.swagger.io/api/v3"
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  // Estoy conciente de que el login tiene un metodo get y envia los datos por parametros, 
  // tambien que si enviamos los parametros vacios se completa el logeo
  // la api que estaba en el correo lo tiene creado de esta forma 
  // Realizo esta aclaracion por las dudas
  Login(username: string, password: string): Observable<string> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);
    
    return this.http.get(`${this.API_URL}/user/login`, {
      params,
      responseType: 'text' 
    }).pipe(
      tap((response: string) => {
        const token = response.split(': ')[1]; 
        this.authService.login(token)
        this.router.navigate(['/inicio']);
      }),
      catchError(this.handleError)
    );
  }
  
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'No hay conexión con el servidor';
          break;
        case 400:
          errorMessage = 'Solicitud incorrecta';
          if (error.error?.errors) {
            errorMessage += ': ' + Object.values(error.error.errors).join(', ');
          }
          break;
        case 401:
          errorMessage = 'No autorizado - Por favor inicie sesión';
          break;
        case 403:
          errorMessage = 'Acceso denegado';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          if (error.error?.message) {
            errorMessage += `: ${error.error.message}`;
          }
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.statusText || 'Error desconocido'}`;
      }
    }
     console.error(errorMessage, error);
    
    return throwError(() => new Error(errorMessage));
  }
}
