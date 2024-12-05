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

  function createBox(scene: Scene) {
    let box = MeshBuilder.CreateBox("box",{size: 1}, scene);
    box.position.y = 3;
    return box;
  }

  function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    light.intensity = 2;
    light.diffuse = new Color3(0, 5 , 0);
    light.specular = new Color3(0, 0, 0);
    light.groundColor = new Color3(0, 0, 1);
    return light;
  }

  function createArcRotateCamera(scene: Scene) {
    let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 2.5,
      camDist = 10,
      camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
      "camera1",
      camAlpha,
      camBeta,
      camDist,
      camTarget,
      scene,
    );
    camera.attachControl(true);
    return camera;
  }

  export default function createStartScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      box?: Mesh;
      light?: Light;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
    }

    let that: SceneData = { scene: new Scene(engine) };

    that.box = createBox(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    that.light = createLight(that.scene);
    return that;
  }