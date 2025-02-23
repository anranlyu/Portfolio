import kaplay from "kaplay";

const makeKaplayCtx = () => {
    return kaplay({
        global: false,
        pixelDensity: 2,
        touchToMouse: true,
        debug: true, //TODO: set it false production
        debugKey: "f2",
        canvas: document.getElementById("game") as HTMLCanvasElement,
    })
}

export default makeKaplayCtx;