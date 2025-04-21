import * as THREE from "three";

export class arrowHelper {
  // making this since there are a crap ton of arrows
  constructor(dir_vec, org_vec, scene) {
    //dx = dir ox = origin
    this.dx = dir_vec.x;
    this.dy = dir_vec.x;
    this.dz = dir_vec.x;
    this.ox = org_vec.x;
    this.oy = org_vec.x;
    this.oz = org_vec.x;
  }
}
