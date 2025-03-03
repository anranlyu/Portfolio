import makeIcon, { imageData } from "./Icon";
import { GameObj, KAPLAYCtx, Vec2 } from "kaplay";
import { opacityTrickleDown } from "../utils";

export default function makeSkillIcon(k:KAPLAYCtx, parent:GameObj, posVec2:Vec2, imageData:imageData, subtitle:string) {
    const [icon, subtitleText] = makeIcon(
        k,
        parent,
        posVec2,
        imageData,
        subtitle
    );

    icon.use(
        k.area({ shape: new k.Rect(k.vec2(0), icon.width + 50, icon.height + 65) })
        );

    icon.use(k.body({ drag: 1 }));
    icon.use({ direction: k.vec2(0, 0) });

    k.onCollide(icon.tags[0], "player", (player: GameObj) => {
        
        icon.applyImpulse(player.direction.scale(1000));
        icon.direction = player.direction;
    });

    opacityTrickleDown(parent, [subtitleText]);

    return icon;
}

