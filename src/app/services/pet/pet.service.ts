import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pet } from '../../interfaces/modelpet';
import { ApiResponse } from '../../interfaces/apiResponse';
import { ZapOffIcon } from 'lucide-angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }
  private API_URL = 'https://petstore3.swagger.io/api/v3'

  // ==============================================
  // Services
  // ==============================================
  getPetsByStatus(status: string): Observable<ApiResponse<Pet[]>> {
    return this.http.get<Pet[]>(`${this.API_URL}/pet/findByStatus`, {
      params: { status: status }
    }).pipe(
      map((data) => ({ data } as ApiResponse<Pet[]>)),
      catchError(this.handleError)
    );
  }

  modifyPet(pet: Pet): Observable<Pet> {

    return this.http.put<Pet>(`${this.API_URL}/pet`, pet).pipe(
      catchError(this.handleError)
    );
  }

  createPet(pet: Pet): Observable<Pet>{
    return this.http.post<Pet>(`${this.API_URL}/pet`, pet).pipe(
      catchError(this.handleError)
    );
  }

  // ==============================================
  // Handling errors
  // ==============================================

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

