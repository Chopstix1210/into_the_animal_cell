import * as THREE from "three";

export class CameraControls {
  constructor(camera, canvas, sensitivity = 0.002) {
    this.camera = camera;
    this.canvas = canvas;
    this.sensitivity = sensitivity;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };

    // binding event handlers to class
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.enable();
  }

  enable() {
    this.canvas.addEventListener("mousedown", this.onMouseDown, false);
    this.canvas.addEventListener("mousemove", this.onMouseMove, false);
    this.canvas.addEventListener("mouseup", this.onMouseUp, false);
    this.canvas.addEventListener("mouseleave", this.onMouseUp, false);
  }

  disable() {
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
    this.canvas.addEventListener("mouseleave", this.onMouseUp);
  }

  onMouseMove(e) {
    if (!this.isDragging) return;

    const deltaMove = {
      x: e.clientX - this.previousMousePosition.x,
      y: e.clientY - this.previousMousePosition.y,
    };

    // horizontal camera move
    this.camera.rotation.y -= deltaMove.x * this.sensitivity;
    //vertical camera move
    this.camera.rotation.x -= deltaMove.y * this.sensitivity;

    // this is to stop the view from flipping
    const piHalf = Math.PI / 2;
    this.camera.rotation.x = Math.max(
      -piHalf,
      Math.min(piHalf, this.camera.rotation.x),
    );
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  onMouseDown(e) {
    this.isDragging = true;
    this.previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  onMouseUp(e) {
    this.isDragging = false;
  }

  dispose() {
    this.disable();
  }
}
