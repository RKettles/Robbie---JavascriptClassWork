import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Color3,
    Camera,
    Engine,
  } from "@babylonjs/core";

  function createBox(scene) {
    let box = MeshBuilder.CreateBox("box", scene);
    box.position.y = 3;
    box.position.y = 0.51;
    return box;
  }