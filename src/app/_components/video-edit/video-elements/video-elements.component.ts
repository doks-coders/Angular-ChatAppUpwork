import { Component } from '@angular/core';

@Component({
  selector: 'app-video-elements',
  templateUrl: './video-elements.component.html',
  styleUrls: ['./video-elements.component.css']
})
export class VideoElementsComponent {
  private isResizing = false;

  onMouseDown(event: MouseEvent) {
    if ((event.target as HTMLElement).id === 'resizer') {
      this.isResizing = true;
      document.addEventListener('mousemove', this.resize.bind(this));
      document.addEventListener('mouseup', this.stopResize.bind(this));
    }
  }

  resize(event: MouseEvent) {
    if (this.isResizing) {
      const resizableElement = document.getElementById('resizable');
      if (resizableElement) {
        const newHeight = event.clientX - resizableElement.getBoundingClientRect().left;
        resizableElement.style.width = `${newHeight}px`;
      }
    }
  }

  stopResize() {
    this.isResizing = false;
    document.removeEventListener('mousemove', this.resize.bind(this));
    document.removeEventListener('mouseup', this.stopResize.bind(this));
  }
}
