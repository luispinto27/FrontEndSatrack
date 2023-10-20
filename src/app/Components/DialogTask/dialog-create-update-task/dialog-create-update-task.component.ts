import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';



@Component({
  selector: 'app-dialog-create-update-task',
  templateUrl: './dialog-create-update-task.component.html',
  styleUrls: ['./dialog-create-update-task.component.css']
})


export class DialogCreateUpdateTaskComponent implements OnInit{

  formTask: FormGroup;
  actionTitle: string = "Nueva";
  actionButton: string = "Guardar";


  constructor(
    private ReferenceDialog:MatDialogRef<DialogCreateUpdateTaskComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _serviceTask: TaskService,
    @Inject(MAT_DIALOG_DATA) public dataTask: Task
  ) {
    
    this.formTask = this.fb.group({
      description: ['', Validators.required],
      dateCreated: ['', Validators.required]
    });
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  createUpdateTask() {
    const task: Task = {
      taskId: (this.dataTask == null) ? 0 : this.dataTask.taskId,
      description: this.formTask.value.description,
      dateCreated: this.formTask.value.dateCreated,
      dateLimited: (this.dataTask == null) ? this.formTask.value.date : this.dataTask.dateLimited,
      isCompleted: (this.formTask.value.isCompleted && !this.dataTask) ? true : false,
      category: (this.dataTask == null) ? this.formTask.value.categoryId : this.dataTask.category,
      categoryId: (this.dataTask == null) ? 0 : this.dataTask.category.categoryId
    }

    if(this.dataTask == null) {
      this._serviceTask.createTask(task).subscribe({
        next:(dataResponse) => {
          this.showAlert("Tarea creada correctamente", "Listo");
          this.ReferenceDialog.close("Creado");
        }, error:(e) => {
          this.showAlert("No se puedo crear", "Error");
        }
      })
    } else {
      this._serviceTask.updateTask(task).subscribe({
        next:(dataResponse) => {
          this.showAlert("Tarea editada correctamente", "Listo");
          this.ReferenceDialog.close("Editado");
        }, error:(e) => {
          this.showAlert("No se puedo editar", "Error");
        }
      }) 
    }
  }

  ngOnInit(): void {

    if(this.dataTask) {
      this.formTask.patchValue({
        description: this.dataTask.description,
        dateCreated: this.dataTask.dateCreated
      });

      this.actionTitle = "Editar";
      this.actionButton = "Actualizar";

    }   
  }

}
