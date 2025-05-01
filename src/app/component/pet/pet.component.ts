import { Component } from '@angular/core';
import { Category, Pet, Tag } from '../../interfaces/modelpet';
import { PetService } from '../../services/pet/pet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Pencil, PencilOff } from 'lucide-angular/src/icons';
import { FormEditComponent } from "../form-edit/form-edit.component";
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pet',
  imports: [FormsModule, CommonModule, LucideAngularModule, FormEditComponent],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {
  loading: boolean = false;
  error: string | null = null
  pets: Pet[] = [];
  pagedPets: Pet[] = [];
  currentPage = 1;
  pageSize = 9;
  totalPets: number = 0;
  status: string = 'available'
  Pencil = Pencil;
  PencilOff = PencilOff;
  selectedPetId: number | null = null;
  showNewPetForm: boolean = false;


  constructor(private petService: PetService, private authService: AuthService, private toastService: ToastrService) { }

  ngOnInit() {
    this.loadPets()
  }


  // ==============================================
  // PET SERVICE METHODS
  // ==============================================


  loadPets() {
    this.loading = true;
    this.error = null
    this.petService.getPetsByStatus(this.status).subscribe(
      {
        next: (response) => {
          this.pets = response.data;
          this.totalPets = this.pets.length;
          this.updatePagedPets();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message
          this.toastService.error('Error al cargar mascotas');

        }
      }
    )
  }

  updatePets(updatedPet: Pet) {
    this.petService.modifyPet(updatedPet).subscribe({
      next: () => {
        this.selectedPetId = null
        this.loadPets();
        this.toastService.success('Mascota Actualizada')
      },
      error: (err) => {
        console.error('Error al actualizar mascota:', err);
        this.toastService.error('Error al actualizar la mascota');
      }
    });
  }

  createPet(updatedPet: Pet) {
    const x = {
      "id": 1020,
      "name": "Meme",
      "category": {
        "id": 891,
        "name": "Meme"
      },
      "photoUrls": [
        "Meme"
      ],
      "tags": [
        {
          "id": 0,
          "name": "Meme"
        }
      ],
      "status": "available"
    }
    this.petService.createPet(updatedPet).subscribe({
      next: () => {
        this.selectedPetId = null
        this.toastService.success('Mascota creada Correctamente')
        this.loadPets();
      },
      error: (err) => {
        console.error('Error al crear mascota:', err);
        this.toastService.error('Error al crear la mascota');
      }
    });
  }

  // ==============================================
  // HANDLERS
  // ==============================================

  onStatusChange() {
    this.currentPage = 1;
    this.loadPets();
  }

  onPetUpdated(updatedPet: Pet) {
    this.updatePets(updatedPet);
  }

  onPetCreate(updatedPet: Pet) {
    this.createPet(updatedPet)
  }

  reloadpage() {
    this.loadPets()
  }

  selectPet(petId: number): void {
    if (this.selectedPetId === petId) {
      this.selectedPetId = null;
    } else {
      this.selectedPetId = petId;
    }
  }


  Logout() {
    this.authService.logout();
  }
  // ==============================================
  // PAGINATION 
  // ==============================================

  updatePagedPets() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPets = this.pets.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalPets) {
      this.currentPage++;
      this.updatePagedPets();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedPets();
    }
  }

  setPage(page: number) {
    this.currentPage = page;
    this.updatePagedPets();
  }

  get totalPages() {
    return Math.ceil(this.totalPets / this.pageSize);
  }



}
