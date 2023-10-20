import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogCreateUpdateTaskComponent } from '../DialogTask/dialog-create-update-task/dialog-create-update-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteTaskComponent } from '../DialogTask/delete-task/delete-task.component';
import { CompleteTaskComponent } from '../DialogTask/complete-task/complete-task.component';
import { AsignedCategoryComponent } from '../DialogTask/asigned-category/asigned-category.component';
import { AsignedDateLimitedComponent } from '../DialogTask/asigned-date-limited/asigned-date-limited.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Descripcion', 'FechaCreacion', 'FechaLimite', 'Completada', 'Categoria', 'Acciones' ];
  dataSource = new MatTableDataSource<Task>();

  constructor(  private serviceTask: TaskService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar
    ) {

  }

  ngOnInit(): void {
    this.getAllTasks();   
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllTasks() {
    this.serviceTask.getAllTasks().subscribe({
      next:(dataResponse) => {
        this.dataSource.data = dataResponse;
      }, error:(e) => {
        console.log(e);
      }
    });
  }

  openDialogCreateTask() {
    this.dialog.open(DialogCreateUpdateTaskComponent, {
      disableClose: true,
      width:"350px"
    }).afterClosed().subscribe(result => {
      if(result === "Creado") {
        this.getAllTasks();
      }
    });
  }

  openDialogUpdateTask(dataTask: Task) {
    this.dialog.open(DialogCreateUpdateTaskComponent, {
      disableClose: true,
      width:"350px",
      data: dataTask
    }).afterClosed().subscribe(result => {
      if(result === "Editado") {
        this.getAllTasks();
      }
    });
  }

  showAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  openDialogDeleteTask(dataTask: Task) {
    this.dialog.open(DeleteTaskComponent, {
      disableClose: true,
      data: dataTask
    }).afterClosed().subscribe(result => {
      if(result === "Eliminar") {
        this.serviceTask.deleteTask(dataTask.taskId).subscribe({
          next:(dataResponse) => {
            this.showAlert("Tarea eliminada correctamente", "Listo");
            this.getAllTasks();
          }, error:(e) => {
            console.log(e);
          }
        })
      }
    });
  }

  openDialogCompletedTask(dataTask: Task) {
    this.dialog.open(CompleteTaskComponent, {
      disableClose: true,
      data: dataTask
    }).afterClosed().subscribe(result => {
      if(result === "Completar") {
        this.serviceTask.completedTask(dataTask.taskId).subscribe({
          next:(dataResponse) => {
            this.showAlert("Tarea Completada Correctamente", "Listo");
            this.getAllTasks();
          }, error:(e) => {
            console.log(e);
          }
        })
      }
    });
  }

  openDialogAsignedCategory(dataTask: Task) {
    this.dialog.open(AsignedCategoryComponent, {
      disableClose: true,
      width:"350px",
      data: dataTask
    }).afterClosed().subscribe(result => {
      if(result === "Asignado") {
        this.getAllTasks();
      }
    });
  }

  openDialogAsignedDateLimited(dataTask: Task) {
    this.dialog.open(AsignedDateLimitedComponent, {
      disableClose: true,
      width:"350px",
      data: dataTask
    }).afterClosed().subscribe(result => {
      if(result === "Limite") {
        this.getAllTasks();
      }
    });
  }
}
