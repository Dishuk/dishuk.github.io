const OPAQUE = 255;
const RGBA = 4;
const NOISE_SAMPLES = 3;
const BASE_TILE = 1024;
const OVERLAY_TILE = 740;
const OVERLAY_ALPHA = 128;

export default class GrainUtils {
  public static createTile(size: number, alpha = OPAQUE): string {
    const canvas = document.createElement('canvas');

    canvas.width = canvas.height = size;
    const context = canvas.getContext('2d');

    if (!context) {
      return '';
    }

    const image = context.createImageData(size, size);

    for (let i = 0; i < image.data.length; i += RGBA) {
      let sum = 0;

      for (let sample = 0; sample < NOISE_SAMPLES; sample++) {
        sum += Math.random();
      }

      const value = sum / NOISE_SAMPLES * OPAQUE;

      image.data[i] = image.data[i + 1] = image.data[i + 2] = value;
      image.data[i + 3] = alpha;
    }

    context.putImageData(image, 0, 0);

    return canvas.toDataURL();
  }

  public static apply(root: HTMLElement = document.documentElement): void {
    const base = GrainUtils.createTile(BASE_TILE);
    const overlay = GrainUtils.createTile(OVERLAY_TILE, OVERLAY_ALPHA);

    if (base && overlay) {
      root.style.setProperty('--grain-base', `url(${base})`);
      root.style.setProperty('--grain-overlay', `url(${overlay})`);
    }
  }
}
