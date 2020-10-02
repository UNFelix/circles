import { adaptCanvas, getCenter, drawTiltedCircle } from "./canvas-funcs.js";

const canvas = document.createElement("canvas");
const tiltRange = document.createElement("input");
tiltRange.type = "range";
tiltRange.min = "-90";
tiltRange.max = "90";
document.body.append(canvas, tiltRange);

let tilt = 15;

tiltRange.onchange = () => {
  tilt = +tiltRange.value;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLatitudes(tilt);
  console.log(tilt);
};

canvas.onmousemove = (e) => {
  tilt = (e.offsetY % 180) - 90;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLatitudes(tilt);
};

adaptCanvas(canvas);
window.onresize = () => {
  adaptCanvas(canvas);
  drawLatitudes(tilt);
};

const equator = { radius: 6378.137, color: "orange" };
const latitudes = [];

const degToRad = (angle) => (angle * Math.PI) / 180;
const calcLatitudeRadius = (angle) =>
  equator.radius * Math.cos(degToRad(angle));
const calcLatitudeHeight = (angle) =>
  equator.radius * Math.sin(degToRad(angle));

for (let i = -80; i <= 80; i += 10) {
  const height = calcLatitudeHeight(i);
  latitudes.push({
    radius: calcLatitudeRadius(i),
    height,
    color: `hsla(${height / 100}, 100%, 60%, .9)`,
  });
}
window.latitudes = latitudes;

// const drawEquator = () => {
//   const canvasSpace = equator.radius * 4;
//   const pxSpace = canvasSpace / canvas.width;

//   drawTiltedCircle(
//     canvas,
//     getCenter(canvas),
//     equator.radius / pxSpace,
//     70,
//     equator.color
//   );
// };
const drawLatitudes = (tilt) => {
  const canvasSpace = equator.radius * 4;
  const pxSpace = canvasSpace / canvas.width;

  latitudes[tilt > 0 ? "reduce" : "reduceRight"]((_, latitude) => {
    const center = getCenter(canvas);
    center.y += ((latitude.height / pxSpace) * (90 - Math.abs(tilt))) / 90;

    drawTiltedCircle(
      canvas,
      center,
      latitude.radius / pxSpace,
      tilt,
      latitude.color
    );
  });
};
drawLatitudes(tilt);
