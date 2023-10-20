import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/Interfaces/category';
import { Task } from 'src/app/Interfaces/task';

@Component({
  selector: 'app-delete-categories',
  templateUrl: './delete-categories.component.html',
  styleUrls: ['./delete-categories.component.css']
})
export class DeleteCategoriesComponent implements OnInit {
  constructor(
    private ReferenceDialog:MatDialogRef<DeleteCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public dataCategories: Category
  ) {

  }

  ngOnInit(): void {
    
  }

  deleteConfirmation() {
    if(this.dataCategories) {
      this.ReferenceDialog.close("Eliminar")
    }
  }
}
