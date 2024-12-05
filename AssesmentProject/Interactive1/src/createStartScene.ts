import {
    Scene,
    ArcRotateCamera,
    Vector3,
    DirectionalLight,
    HemisphericLight,
    PointLight,
    SpotLight,
    MeshBuilder,
    Mesh,
    Light,
    Color3,
    Camera,
    Engine,
    StandardMaterial,
    ShadowGenerator,
  } from "@babylonjs/core";
import { SceneData } from "./interfaces";

  function createBox(scene: Scene) {
    let box = MeshBuilder.CreateBox("box",{size: 2}, scene);
    box.position.y = 1;
    return box;
  }

  function createSphere(scene: Scene) {
    let sphere = MeshBuilder.CreateSphere(
      "sphere",
      { diameter: 4, segments: 64 },
      scene,
    );
    sphere.position.y = 6;
    return sphere;
  }

  function createGround(scene: Scene){
    let ground = MeshBuilder.CreateGround("ground", { width: 12, height: 12 }, scene);
    var groundMaterial = new StandardMaterial("groundMaterial", scene);
    groundMaterial.backFaceCulling = false;
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    return ground;
}

function createDirectionalLight(scene: Scene ){
  const light = new DirectionalLight("light", new Vector3(0.2, -1, 0.2),scene);
  light.position = new Vector3(20, 40, 20);
  light.intensity = 0.7;
  light.diffuse = new Color3(0, 0, 10);
  light.specular = new Color3(0, 1, 0);
  return light;
}

  function createPointLight(scene: Scene ){
    const light = new PointLight("light", new Vector3(-1, 1, 0),scene);
    light.position = new Vector3(5, 20, 10);
    light.intensity = 0.3;
    light.diffuse = new Color3(0.5, 1, 1);
    light.specular = new Color3(0.8, 1, 1);
    return light;
}

function createSpotLight(scene: Scene ){
  const light = new SpotLight("light", new Vector3(1, 5, -3), 
      new Vector3(0, -1, 0), Math.PI / 3, 20, scene);
  light.intensity = 0.5;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  return light;
}

function createHemisphericLight(scene: Scene ){
  const light:HemisphericLight = new HemisphericLight("light", new Vector3(1, 10, 0),scene);
  light.intensity = 0.3;
  light.diffuse = new Color3(1, 0, 0);
  light.specular = new Color3(0, 1, 0);
  light.groundColor = new Color3(0, 1, 0);
  return light;
}

  function createShadows(light: DirectionalLight, sphere: Mesh ,box: Mesh){
    const shadower = new ShadowGenerator(1024, light);
    const sm : any = shadower.getShadowMap();
    sm.renderList.push(sphere, box);

    shadower.setDarkness(0.5);
    shadower.useBlurExponentialShadowMap = true;
    shadower.blurScale = 4;
    shadower.blurBoxOffset = 1;
    shadower.useKernelBlur = true;
    shadower.blurKernel = 64;
    shadower.bias = 0;
    return shadower;
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
    let scene = new Scene(engine);
    let box = createBox(scene);
    let lightBulb = createPointLight(scene);
    let lightDirectional = createDirectionalLight(scene);
    let lightSpot = createSpotLight(scene);
    let lightHemispheric = createHemisphericLight(scene);
    let sphere = createSphere(scene);
    let ground = createGround(scene);
    let camera = createArcRotateCamera(scene);
    let shadowGenerator = createShadows(lightDirectional, sphere, box);

    let that: SceneData = {
     scene,
     box,
     lightBulb,
     lightDirectional,
     lightSpot,
     lightHemispheric,
     sphere,
     ground,
     camera,
     shadowGenerator,
     };
    return that;
  }