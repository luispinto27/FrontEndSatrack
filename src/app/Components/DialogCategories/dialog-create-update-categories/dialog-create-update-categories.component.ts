import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/Interfaces/category';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-dialog-create-update-categories',
  templateUrl: './dialog-create-update-categories.component.html',
  styleUrls: ['./dialog-create-update-categories.component.css']
})
export class DialogCreateUpdateCategoriesComponent {
  formCategories: FormGroup;
  actionTitle: string = "Nueva";
  actionButton: string = "Guardar";


  constructor(
    private ReferenceDialog:MatDialogRef<DialogCreateUpdateCategoriesComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _serviceCategories: CategoryService,
    @Inject(MAT_DIALOG_DATA) public dataCategories: Category
  ) {
    
    this.formCategories = this.fb.group({
      description: ['', Validators.required]
    });
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  createUpdateCategories() {
    const category: Category = {
      categoryId: (this.dataCategories == null) ? 0 : this.dataCategories.categoryId,
      description: this.formCategories.value.description,
      status: true
    }

    if(this.dataCategories == null) {
      this._serviceCategories.createCategory(category).subscribe({
        next:(dataResponse) => {
          this.showAlert("Categoría creada correctamente", "Listo");
          this.ReferenceDialog.close("Creado");
        }, error:(e) => {
          this.showAlert("No se puedo crear", "Error");
        }
      })
    } else {
      this._serviceCategories.updateCategory(category).subscribe({
        next:(dataResponse) => {
          this.showAlert("Categoria editada correctamente", "Listo");
          this.ReferenceDialog.close("Editado");
        }, error:(e) => {
          this.showAlert("No se puedo editar", "Error");
        }
      }) 
    }
  }

  ngOnInit(): void {

    if(this.dataCategories) {
      this.formCategories.patchValue({
        description: this.dataCategories.description,
        status: this.dataCategories.status
      });

      this.actionTitle = "Editar";
      this.actionButton = "Actualizar";

    }   
  }
}
