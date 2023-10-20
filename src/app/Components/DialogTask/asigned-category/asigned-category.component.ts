import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/Interfaces/category';
import { Task } from 'src/app/Interfaces/task';
import { CategoryService } from 'src/app/Services/category.service';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-asigned-category',
  templateUrl: './asigned-category.component.html',
  styleUrls: ['./asigned-category.component.css']
})
export class AsignedCategoryComponent {

  formTask: FormGroup;
  CategoryList: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _serviceTask: TaskService,
    private _serviceCategory: CategoryService,
    private ReferenceDialog:MatDialogRef<AsignedCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask: Task
  ) {

    this.formTask = this.fb.group({
      categoryId: ['', Validators.required]
    });

    this._serviceCategory.getAllCategory().subscribe({
      next: (dataResponse) => {
        this.CategoryList = dataResponse;
      }, 
      error:(e) => {
        console.log(e);
      }
    })

  }

  ngOnInit(): void {
    
  }

  asignedCategory() {
    const task: Task = {
      taskId: (this.dataTask == null) ? 0 : this.dataTask.taskId,
      description: "",
      dateCreated: this.formTask.value.dateCreated,
      dateLimited: this.formTask.value.dateLimited,
      isCompleted: this.formTask.value.isCompleted,
      categoryId: this.formTask.value.categoryId,
      category: this.formTask.value.category
    }

      this._serviceTask.asignedCategory(this.dataTask.taskId, task.categoryId).subscribe({
        next:(dataResponse) => {
          this.showAlert("Categoría asignada correctamente", "Listo");
          this.ReferenceDialog.close("Asignado");
        }, error:(e) => {
          this.showAlert("No se puedo crear", "Error");
        }
      })
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }


}
