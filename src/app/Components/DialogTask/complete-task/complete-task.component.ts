import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/Interfaces/task';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.component.html',
  styleUrls: ['./complete-task.component.css']
})
export class CompleteTaskComponent {

  constructor(
    private ReferenceDialog:MatDialogRef<CompleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask: Task
  ) {

  }

  ngOnInit(): void {
    
  }

  completeConfirmation() {
    if(this.dataTask) {
      this.ReferenceDialog.close("Completar");
    }
  }

}
