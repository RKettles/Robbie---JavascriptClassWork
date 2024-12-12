import {
  AbstractMesh,
  ActionManager,
  CubeTexture,
  Mesh,
  Skeleton
} from "@babylonjs/core";
import { SceneData } from "./interfaces";
import {
  keyActionManager,
  keyDownMap,
  keyDownHeld,
  getKeyDown,
} from "./keyActionManager";
import { characterActionManager } from "./characterActionManager";
import { bakedAnimations, walk, run, left, right, idle, stopAnimation, getAnimating, toggleAnimating } from "./bakedAnimations";
import { collisionDeclaration } from "./collisionDeclaration";

export default function createRunScene(runScene: SceneData) {
  runScene.scene.actionManager = new ActionManager(runScene.scene);
  keyActionManager(runScene.scene);
  collisionDeclaration(runScene);


  // add baked in animations to player
  runScene.player.then((result) => {
    let skeleton: Skeleton = result!.skeletons[0];
    bakedAnimations(runScene.scene, skeleton);
  });

  runScene.scene.onBeforeRenderObservable.add(() => {
    // check and respond to keypad presses


    runScene.player.then((result) => {
      let characterMoving: Boolean = false;
      let character: AbstractMesh = result!.meshes[0];
      if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
        character.position.x -= 0.1;
        character.rotation.y = (3 * Math.PI) / 2;
        characterMoving = true;
      }
      if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
        character.position.z -= 0.1;
        character.rotation.y = (2 * Math.PI) / 2;
        characterMoving = true;
      }
      if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
        character.position.x += 0.1;
        character.rotation.y = (1 * Math.PI) / 2;
        characterMoving = true;
      }
      if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
        character.position.z += 0.1;
        character.rotation.y = (0 * Math.PI) / 2;
        characterMoving = true;
      }

      if (getKeyDown() && characterMoving) {
        if (!getAnimating()) {
          walk();
          toggleAnimating(); 
        }
      } else {
        if (getAnimating()) {
          idle();
          toggleAnimating();
        }
      }  
    });
  });


// add incremental action to player
runScene.player.then((result) => {  
  let characterMesh = result!.meshes[0];
  characterActionManager(runScene.scene, characterMesh as Mesh);
});

  runScene.scene.onAfterRenderObservable.add(() => { });
}
