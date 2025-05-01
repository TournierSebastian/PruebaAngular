import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../../interfaces/apiResponse';
import { Profile } from '../../interfaces/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private API_URL = 'https://petstore3.swagger.io/api/v3'

  constructor(private http: HttpClient) { }


  getProfile(username: string): Observable<ApiResponse<Profile>> {
    return this.http.get<Profile>(`${this.API_URL}/user/${username}`).pipe(
      map((data) => ({ data } as ApiResponse<Profile>)),
      catchError(this.handleError)
    );
  }

  updateProfile(user: Profile, username: string): Observable<Profile>{
     return this.http.put<Profile>(`${this.API_URL}/user/${username}`,user).pipe(
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
