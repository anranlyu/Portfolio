import { GameObj } from "kaplay";
import { PALETTE } from "./constants";
import makePlayer from "./entities/Player";
import makeSection from "./kaplayComponents/Section";
import makeKaplayCtx from "./kaplayCtx";
import { cameraZoomValueAtom, store } from "./store";
import makeEmailIcon from "./kaplayComponents/EmailIcon";
import makeSocialIcon from "./kaplayComponents/SocialIcon";
import { makeAppear } from "./utils";
// @ts-expect-error SkillIco will cause werid bug if it is ts
import makeSkillIcon from "./kaplayComponents/SkillIcon.js";
import makeWorkExperienceCard from "./kaplayComponents/WorkExperienceCard.js";


export default async function initGame() {
    const generalData = await (await fetch("./configs/generalData.json")).json();
    const socialsData = await (await fetch("./configs/socialsData.json")).json();
    const skillsData = await (await fetch("./configs/skillsData.json")).json();
    const experiencesData = await (
        await fetch("./configs/experiencesData.json")
    ).json();
    // const projectsData = await (
    //     await fetch("./configs/projectsData.json")
    // ).json();
    const k = makeKaplayCtx();
    k.loadSprite("player", "./sprites/player.png", {
        sliceX: 4,
        sliceY: 8,
        anims: {
            "walk-down-idle": 0,
            "walk-down": { from: 0, to: 3, loop: true },
            "walk-left-down": { from: 4, to: 7, loop: true },
            "walk-left-down-idle": 4,
            "walk-left": { from: 8, to: 11, loop: true },
            "walk-left-idle": 8,
            "walk-left-up": { from: 12, to: 15, loop: true },
            "walk-left-up-idle": 12,
            "walk-up": { from: 16, to: 19, loop: true },
            "walk-up-idle": 16,
            "walk-right-up": { from: 20, to: 23, loop: true },
            "walk-right-up-idle": 20,
            "walk-right": { from: 24, to: 27, loop: true },
            "walk-right-idle": 24,
            "walk-right-down": { from: 28, to: 31, loop: true },
            "walk-right-down-idle": 28,
        },
    })
    k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
    k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");
    k.loadSprite("github-logo", "./logos/github-logo.png");
    k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
    k.loadSprite("substack-logo", "./logos/substack-logo.png");
    k.loadSprite("javascript-logo", "./logos/js-logo.png");
    k.loadSprite("typescript-logo", "./logos/ts-logo.png");
    k.loadSprite("react-logo", "./logos/react-logo.png");
    k.loadSprite("nodejs-logo", "./logos/nodejs-logo.png");
    k.loadSprite("mongodb-logo", "./logos/mongodb-logo.png");
    k.loadSprite("html-logo", "./logos/html-logo.png");
    k.loadSprite("css-logo", "./logos/css-logo.png");
    k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
    k.loadSprite("java-logo", "./logos/java-logo.png");
    k.loadSprite("email-logo", "./logos/email-logo.png");
    k.loadSprite("sonic-js", "./projects/sonic-js.png");
    k.loadSprite("kirby-ts", "./projects/kirby-ts.png");
    k.loadSprite("platformer-js", "./projects/platformer-js.png");
    k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");

    const setInitCamZoomValue = () => {
        if (k.width() < 1000) {
            k.setCamScale(0.5, 0.5);
            store.set(cameraZoomValueAtom, 0.5);
            return;
        }

        k.setCamScale(0.7, 0.7);
        store.set(cameraZoomValueAtom, 0.7);
    }

    setInitCamZoomValue();

    k.onUpdate(() => {
        const camZoomValue = store.get(cameraZoomValueAtom);
        if (k.vec2(camZoomValue) !== k.getCamScale()) {
            k.setCamScale(k.vec2(camZoomValue))
        }
    })

    const tiledBackground = k.add([
        k.uvquad(k.width(), k.height()),
        k.shader("tiledPattern", () => ({
            u_time: k.time() / 20,
            u_color1: k.Color.fromHex(PALETTE.color3),
            u_color2: k.Color.fromHex(PALETTE.color2),
            u_speed: k.vec2(1, -1),
            u_aspect: k.width() / k.height(),
            u_size: 5,
        })),
        k.pos(0, 0),
        k.fixed(),
    ]);

    k.onResize(() => {
        tiledBackground.width = k.width();
        tiledBackground.height = k.height();
        if (tiledBackground.uniform) {
            tiledBackground.uniform.u_aspect = k.width() / k.height();
        }

    });

    //Make About Section
    makeSection(
        k,
        k.vec2(k.center().x, k.center().y - 400),
        generalData.section1Name,
        (parent: GameObj) => {
            const container = parent.add([k.pos(-805, -700), k.opacity(0)]);
            container.add([
                k.text(generalData.header.title, { font: "ibm-bold", size: 88 }),
                k.color(k.Color.fromHex(PALETTE.color1)),
                k.pos(395, 0),
                k.opacity(0),
            ]);

            container.add([
                k.text(generalData.header.subtitle, {
                font: "ibm-bold",
                size: 48,
                }),
                k.color(k.Color.fromHex(PALETTE.color1)),
                k.pos(485, 100),
                k.opacity(0),
            ]);

            const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

            for (const socialData of socialsData) {
                if (socialData.name === "Email") {
                makeEmailIcon(
                    k,
                    socialContainer,
                    k.vec2(socialData.pos.x, socialData.pos.y),
                    socialData.logoData,
                    socialData.name,
                    socialData.address
                );
                continue;
                }

                makeSocialIcon(
                    k,
                    socialContainer,
                    k.vec2(socialData.pos.x, socialData.pos.y),
                    socialData.logoData,
                    socialData.name,
                    socialData.link,
                    socialData.description
                );
            }
            makeAppear(k, container);
            makeAppear(k, socialContainer);
        }
    );

    //make skills section
    makeSection(
        k,
        k.vec2(k.center().x - 400, k.center().y),
        generalData.section2Name,
        (parent) => {
        /* make the container independent of the section
        so that the skill icons appear on top of every section's children.
        so that when the skill icons are pushed around by the player
        they always remain on top */
        const container = k.add([
            k.opacity(0),
            k.pos(parent.pos.x - 300, parent.pos.y),
        ]);

        for (const skillData of skillsData) {
            makeSkillIcon(
            k,
            container,
            k.vec2(skillData.pos.x, skillData.pos.y),
            skillData.logoData,
            skillData.name
            );
        }

        makeAppear(k, container);
        }
    );
    
    //make experience section
    makeSection(
        k,
        k.vec2(k.center().x + 400, k.center().y),
        generalData.section3Name,
        (parent) => {
        const container = parent.add([k.opacity(0), k.pos(0)]);
        for (const experienceData of experiencesData) {
            makeWorkExperienceCard(
            k,
            container,
            k.vec2(experienceData.pos.x, experienceData.pos.y),
            experienceData.cardHeight,
            experienceData.roleData
            );
        }

        makeAppear(k, container);
        }
    );

    makeSection(k, k.vec2(k.center().x, k.center().y + 400), "Projects");

    makePlayer(k, k.center(), 700)
}