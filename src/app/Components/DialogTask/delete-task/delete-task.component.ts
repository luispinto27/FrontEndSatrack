import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/Interfaces/task';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  constructor(
    private ReferenceDialog:MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask: Task
  ) {

  }

  ngOnInit(): void {
    
  }

  deleteConfirmation() {
    if(this.dataTask) {
      this.ReferenceDialog.close("Eliminar")
    }
  }
}
