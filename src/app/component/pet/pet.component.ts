import { Component } from '@angular/core';
import { Category, Pet, Tag } from '../../interfaces/modelpet';
import { PetService } from '../../services/pet/pet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Pencil, PencilOff } from 'lucide-angular/src/icons';
import { FormEditComponent } from "../form-edit/form-edit.component";

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



  constructor(private petService: PetService) { }

  selectPet(petId: number): void {
    if (this.selectedPetId === petId) {
      this.selectedPetId = null;
    } else {
      this.selectedPetId = petId;
    }
  }

  reloadpage(){
    this.loadPets()
  }

  ngOnInit() {
    this.loadPets()
  }

  onStatusChange() {
    this.loadPets(); 
  }

  onPetUpdated(updatedPet: Pet) {
    this.updatePets(updatedPet);
  }

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
        }
      }
    )
  }
  updatePets(updatedPet: Pet){
    this.petService.modifyPet(updatedPet).subscribe({
      next: () => {
        alert('Mascota actualizada');
        this.selectedPetId = null
        this.loadPets(); 
      },
      error: (err) => console.error('Error al actualizar mascota:', err)
    });
  }

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
