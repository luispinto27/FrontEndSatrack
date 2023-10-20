import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCommonModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskComponent } from './Components/task/task.component';
import { TaskService } from './Services/task.service';
import { DialogCreateUpdateTaskComponent } from './Components/DialogTask/dialog-create-update-task/dialog-create-update-task.component';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { DeleteTaskComponent } from './Components/DialogTask/delete-task/delete-task.component';
import { CompleteTaskComponent } from './Components/DialogTask/complete-task/complete-task.component';
import { AsignedCategoryComponent } from './Components/DialogTask/asigned-category/asigned-category.component';
import { AsignedDateLimitedComponent } from './Components/DialogTask/asigned-date-limited/asigned-date-limited.component';
import { HeaderComponent } from './Components/header/header.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { DialogCreateUpdateCategoriesComponent } from './Components/DialogCategories/dialog-create-update-categories/dialog-create-update-categories.component';
import { DeleteCategoriesComponent } from './Components/DialogCategories/delete-categories/delete-categories.component';
import { MatCheckboxModule } from '@angular/material/checkbox';




@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    DialogCreateUpdateTaskComponent,
    DeleteTaskComponent,
    CompleteTaskComponent,
    AsignedCategoryComponent,
    AsignedDateLimitedComponent,
    HeaderComponent,
    CategoriesComponent,
    DialogCreateUpdateCategoriesComponent,
    DeleteCategoriesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatCommonModule,
    MomentDateModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatMomentDateModule,
    MatTooltipModule,
    MatTabsModule,
    MatToolbarModule,
    MatCheckboxModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
