export type AvatarExpression = "relaxed" | "smile" | "curious";

// A small vector field deforms the original facial texture, keeping its lighting
// and identity intact rather than painting a different mouth over the portrait.
export function createExpressionMaps(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 240;
  canvas.height = Math.round((240 * height) / width);
  const context = canvas.getContext("2d");
  if (!context) return null;
  const maps = {} as Record<Exclude<AvatarExpression, "relaxed">, string>;
  const gaussian = (
    x: number,
    y: number,
    cx: number,
    cy: number,
    rx: number,
    ry: number,
  ) => Math.exp(-(((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2) * 2);

  for (const expression of ["smile", "curious"] as const) {
    const pixels = context.createImageData(canvas.width, canvas.height);
    for (let row = 0; row < canvas.height; row++) {
      for (let column = 0; column < canvas.width; column++) {
        const x = (column / canvas.width) * width;
        const y = (row / canvas.height) * height;
        const leftMouth = gaussian(x, y, 491, 947, 100, 83);
        const rightMouth = gaussian(x, y, 725, 947, 100, 83);
        const centerMouth = gaussian(x, y, 612, 969, 100, 70);
        const leftBrow = gaussian(x, y, 431, 558, 120, 66);
        const rightBrow = gaussian(x, y, 788, 558, 120, 66);
        const dx =
          expression === "smile"
            ? (leftMouth - rightMouth) * 10
            : (rightMouth - leftMouth) * 15;
        const dy =
          expression === "smile"
            ? (leftMouth + rightMouth) * 17 -
              centerMouth * 4 +
              (leftBrow + rightBrow) * 7
            : leftBrow * 23 + rightBrow * 10 - centerMouth * 6;
        const index = (row * canvas.width + column) * 4;
        pixels.data[index] = Math.round(127.5 + (dx / 64) * 255);
        pixels.data[index + 1] = Math.round(127.5 + (dy / 64) * 255);
        pixels.data[index + 2] = 128;
        pixels.data[index + 3] = 255;
      }
    }
    context.putImageData(pixels, 0, 0);
    maps[expression] = canvas.toDataURL("image/png");
  }
  return maps;
}
