import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  mode:string = "resize";
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;

  onMouseDown(event: MouseEvent) {
    if ((event.target as HTMLElement).id === 'draggable') {
      console.log("dragged")
      this.isDragging = true;
      this.startX = event.clientX;
      this.startY = event.clientY;

      const draggableElement = document.getElementById('draggable');
      
      if (draggableElement) {
        const rect = draggableElement.getBoundingClientRect();
        this.offsetX = this.startX - rect.left;
        this.offsetY = this.startY - rect.top;
      }
    }
  }

  changeValue(){
    
  }
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const draggableElement = document.getElementById('draggable');
      const displacementEL = document.getElementById('displacement'); 

      const containerElement = document.getElementById('container');
      if (draggableElement && containerElement && displacementEL) {
        const containerRect = containerElement.getBoundingClientRect();
        let newLeft = event.clientX - this.offsetX - containerRect.left;
        let newTop = event.clientY - this.offsetY - containerRect.top;

        // Ensure the draggable element stays within the container
        if (newLeft < 0) newLeft = 0;
        if (newTop < 0) newTop = 0;
        if (newLeft + draggableElement.offsetWidth > containerElement.offsetWidth) {
          newLeft = containerElement.offsetWidth - draggableElement.offsetWidth;
        }
        if (newTop + draggableElement.offsetHeight > containerElement.offsetHeight) {
          newTop = containerElement.offsetHeight - draggableElement.offsetHeight;
        }

       // draggableElement.style.left = `${newLeft}px`;
       // draggableElement.style.top = `${newTop}px`;

        displacementEL.style.left = `${newLeft}px`;
        displacementEL.style.top = `${newTop}px`;
      }
    }
  }

  onMouseUp() {
    this.isDragging = false;
  }
}


