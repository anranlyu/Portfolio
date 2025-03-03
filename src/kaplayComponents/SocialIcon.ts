import { PALETTE } from "../constants";
import { GameObj, KAPLAYCtx, Vec2 } from "kaplay";
import {
  isSocialModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
  store,
} from "../store";
import { opacityTrickleDown } from "../utils";
import makeIcon, { imageData } from "./Icon";

export default function makeSocialIcon(
  k:KAPLAYCtx,
  parent:GameObj,
  posVec2:Vec2,
  imageData:imageData,
  subtitle:string,
  link:string,
  description:string,
) {
  const [socialIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );

  const linkSwitch = socialIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
    k.opacity(0),
  ]);

  linkSwitch.onCollide("player", () => {
    store.set(isSocialModalVisibleAtom, true);
    store.set(selectedLinkAtom, link);
    store.set(selectedLinkDescriptionAtom, description);
  });

  opacityTrickleDown(parent, [subtitleText, linkSwitch]);

  return socialIcon;
}