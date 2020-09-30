import { adaptCanvas, getCenter, drawTiltedCircle } from "./canvas-funcs.js";

const canvas = document.createElement("canvas");
document.body.append(canvas);

adaptCanvas(canvas);
window.onresize = () => {
  adaptCanvas(canvas);
  drawEquator();
};

const equator = { radius: 6378.137, color: "orange" };

const drawEquator = () => {
  const canvasSpace = equator.radius * 4;
  const pxSpace = canvasSpace / canvas.width;

  drawTiltedCircle(
    canvas,
    getCenter(canvas),
    equator.radius / pxSpace,
    70,
    equator.color
  );
};
drawEquator();
