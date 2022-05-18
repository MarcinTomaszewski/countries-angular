import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css'],
})
export class DragAndDropComponent {
  @ViewChild('drop') child!: ElementRef;
  isClicked = false;
  inputFile: HTMLInputElement;
  @ViewChild('image', { static: false }) image!: ElementRef;
  constructor() {
    this.inputFile = this.createInputFile();
  }

  addImage(ref: HTMLDivElement) {
    this.inputFile.click();
    this.inputFile.addEventListener('change', () => {
      const files = this.inputFile.files;
      this.handleFiles(files, ref);
    });
  }

  handleFiles(files: FileList | null, ref?: HTMLDivElement) {
    console.log(files);

    if (!files) return;
    for (var i = 0, len = files.length; i < len; i++) {
      this.createImage(files[i], ref);
    }
  }

  handleDrop(event: DragEvent, ref: HTMLDivElement) {
    const data: DataTransfer = event.dataTransfer;
    const files = data.files as FileList;
    if (files.length) {
      this.handleFiles(files, ref);
    }
  }

  createImage(image: File, ref?: HTMLDivElement) {
    ref?.removeChild(ref.childNodes[1]);
    var imgView = document.createElement('div');
    imgView.className = 'image-view';

    ref?.appendChild(imgView);

    var img = document.createElement('img');
    imgView.appendChild(img);

    var overlay = document.createElement('div');
    overlay.className = 'overlay';
    imgView.appendChild(overlay);

    var reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result as string;

      this.image.nativeElement.src = e.target.result;
    };

    reader.readAsDataURL(image);
  }

  preventDefault(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  createInputFile() {
    let inputFile: HTMLInputElement;
    inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.multiple = true;
    return inputFile;
  }
}
