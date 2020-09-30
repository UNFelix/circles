export const adaptCanvas = (canvas) => {
  canvas.height = innerHeight - 4;
  canvas.width = innerWidth;
};

export const getCenter = (canvas) => ({
  x: canvas.width / 2,
  y: canvas.height / 2,
});

export const drawEllipse = (
  canvas,
  centerX,
  centerY,
  radiusX,
  radiusY,
  color
) => {
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

export const drawTiltedCircle = (canvas, center, radius, tilt, color) => {
  drawEllipse(canvas, center.x, center.y, radius, (radius * tilt) / 90, color);
};
