import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, Pet, Tag } from '../../interfaces/modelpet';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.css'
})
export class FormEditComponent {
  @Input() pet: any;
  @Input() isEditMode: boolean = false; 
  @Output() petUpdated = new EventEmitter<Pet>();
  @Output() petCreated = new EventEmitter<Pet>(); 

  petId?: number; 
  name: string = '';
  categories: Category = {} as Category;
  photoUrl: string = '';
  newTag: string = ''
  Tag: Tag[] = []
  idTag: number = 0
  statusform: string = 'available'
  petData: Pet = {} as Pet

  handleEdit() {
    this.petData = {
      id: this.isEditMode ? this.pet.id : this.petId , 
      category: this.categories,
      name: this.name,
      photoUrls: [this.photoUrl],
      tags: this.Tag,
      status: this.statusform
    };
    if (this.isEditMode) {
      this.petUpdated.emit(this.petData);
    } else {
      this.petCreated.emit(this.petData);
    }

    if (!this.pet?.id) {
      this.resetForm();
    }
    console.log('updatedPet:', this.petData);

  }


  resetForm() {
    this.petId = undefined;
    this.name = '';
    this.categories = {} as Category;
    this.photoUrl = '';
    this.Tag = [];
    this.statusform = 'available';
    this.newTag = '';
    this.idTag = 0;
  }
  
  addTag() {
    if (this.newTag.trim() !== '' && this.idTag > 0) {
      const nuevotag: Tag = {
        id: this.idTag,
        name: this.newTag.trim()
      };
  
      this.Tag.push(nuevotag);
      alert(`Tag agregado: ID ${nuevotag.id}, Nombre: ${nuevotag.name}`);

      this.newTag = '';
      this.idTag = 0;
    }
  }

  removeTag() {
    this.Tag = this.Tag.filter(tag => tag.id !== this.idTag);
    alert(`Tag con ID ${this.idTag} eliminado correctamente.`);
  }

}
