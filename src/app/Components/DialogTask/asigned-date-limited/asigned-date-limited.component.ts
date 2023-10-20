import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';


@Component({
  selector: 'app-asigned-date-limited',
  templateUrl: './asigned-date-limited.component.html',
  styleUrls: ['./asigned-date-limited.component.css']
})
export class AsignedDateLimitedComponent {

  formTask: FormGroup;

  constructor(
    private ReferenceDialog:MatDialogRef<AsignedDateLimitedComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _serviceTask: TaskService,
    @Inject(MAT_DIALOG_DATA) public dataTask: Task
  ) {
    
    this.formTask = this.fb.group({
      dateLimited: ['', Validators.required]
    });
  }


  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  asignedDateLimited() {
    const task: Task = {
      taskId: (this.dataTask == null) ? 0 : this.dataTask.taskId,
      description: this.dataTask.description,
      dateCreated: this.dataTask.dateCreated,
      dateLimited: this.formTask.value.dateLimited,
      isCompleted: (this.dataTask == null) ? false : true,
      category: this.dataTask.category,
      categoryId: (this.dataTask == null) ? 0 : this.dataTask.category.categoryId
    }

      this._serviceTask.asignedDateLimited(task).subscribe({
        next:(dataResponse) => {
          this.showAlert("Fecha limite agregada correctamente", "Listo");
          this.ReferenceDialog.close("Limite");
        }, error:(e) => {
          this.showAlert("No se puedo editar", "Error");
        }
      }) 
  }

}
