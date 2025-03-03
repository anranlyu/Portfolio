 import { GameObj, KAPLAYCtx } from "kaplay";

export async function makeAppear(k:KAPLAYCtx, gameObj:GameObj) {
  await k.tween(
    gameObj.opacity,
    1,
    0.5,
    (val) => {
      gameObj.opacity = val;
      for (const child of gameObj.children) {
        child.opacity = gameObj.opacity;
      }
    },
    k.easings.linear
  );

  if (gameObj.opacityTrickleDown) gameObj.opacityTrickleDown.cancel();
}

// By default in Kaplay the opacity is not inherited from the parent.
// It becomes tricky to change the opacity of indirect children.
// This function makes sure the parent opacity's trickle down to indirect
// children.
export function opacityTrickleDown(parent:GameObj, indirectChildren:GameObj[]) {
  parent.opacityTrickleDown = parent.onUpdate(() => {
    for (const indirectChild of indirectChildren) {
      indirectChild.opacity = parent.opacity;
    }
  });
}