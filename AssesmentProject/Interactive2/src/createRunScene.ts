import { Vector3, Quaternion, CubeTexture, _ENVTextureLoader } from "@babylonjs/core";

import { SceneData } from "./interfaces";

import "@babylonjs/core/Materials/Textures/Loaders/envTextureLoader";



export default function createRunScene(runScene: SceneData) {

  const environmentTexture = new CubeTexture(
    "./assets/textures/NightSky.env",
    runScene.scene
  );

  const skybox = runScene.scene.createDefaultSkybox(
    environmentTexture,
    true,
    10000,
    0.1
  );

 runScene.scene.onAfterRenderObservable.add(() => {});
}
