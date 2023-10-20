import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Task } from 'src/app/Interfaces/task';
import { TaskService } from 'src/app/Services/task.service';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogCreateUpdateTaskComponent } from '../DialogTask/dialog-create-update-task/dialog-create-update-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteTaskComponent } from '../DialogTask/delete-task/delete-task.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoryService } from 'src/app/Services/category.service';
import { Category } from 'src/app/Interfaces/category';
import { DialogCreateUpdateCategoriesComponent } from '../DialogCategories/dialog-create-update-categories/dialog-create-update-categories.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  displayedColumns: string[] = ['Descripcion', 'Estado', 'Acciones' ];
  dataSource = new MatTableDataSource<Category>();

  constructor(  private categoriesService: CategoryService,
                public dialog: MatDialog,
                private _snackBar: MatSnackBar
    ) {

  }

  ngOnInit(): void {
    this.getAllCategories();   
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllCategories() {
    this.categoriesService.getAllCategory().subscribe({
      next:(dataResponse) => {
        this.dataSource.data = dataResponse;
      }, error:(e) => {
        console.log(e);
      }
    });
  }

  openDialogCreateCategories() {
    this.dialog.open(DialogCreateUpdateCategoriesComponent, {
      disableClose: true,
      width:"350px"
    }).afterClosed().subscribe(result => {
      if(result === "Creado") {
        this.getAllCategories();
      }
    });
  }

  openDialogUpdateCategories(dataCategories: Category) {
    this.dialog.open(DialogCreateUpdateCategoriesComponent, {
      disableClose: true,
      width:"350px",
      data: dataCategories
    }).afterClosed().subscribe(result => {
      if(result === "Editado") {
        this.getAllCategories();
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

  openDialogDeleteCategories(dataCategories: Category) {
    this.dialog.open(DeleteTaskComponent, {
      disableClose: true,
      data: dataCategories
    }).afterClosed().subscribe(result => {
      if(result === "Eliminar") {
        this.categoriesService.deleteCategory(dataCategories.categoryId).subscribe({
          next:(dataResponse) => {
            this.showAlert("Categoría eliminada correctamente", "Listo");
            this.getAllCategories();
          }, error:(e) => {
            console.log(e);
          }
        })
      }
    });
  }


}
