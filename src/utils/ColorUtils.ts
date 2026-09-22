const CHANNEL_MAX = 255;
const FULL_TURN = 360;
const PERCENT = 100;
const HUE_SECTOR = 60;

type Hsl = { h: number; s: number; l: number };

export default class ColorUtils {
  public static rgbToHsl(r: number, g: number, b: number): Hsl {
    r /= CHANNEL_MAX;
    g /= CHANNEL_MAX;
    b /= CHANNEL_MAX;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === r) {
        h = (g - b) / d + (g < b ? 6 : 0);
      } else if (max === g) {
        h = (b - r) / d + 2;
      } else {
        h = (r - g) / d + 4;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * FULL_TURN),
      s: Math.round(s * PERCENT),
      l: Math.round(l * PERCENT),
    };
  }

  public static hexToHsl(hex: string): Hsl {
    const value = parseInt(hex.replace(/^#/, ''), 16);

    return this.rgbToHsl((value >> 16) & CHANNEL_MAX, (value >> 8) & CHANNEL_MAX, value & CHANNEL_MAX);
  }

  public static hslToHex(h: number, s: number, l: number): string {
    s /= PERCENT;
    l /= PERCENT;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / HUE_SECTOR) % 2 - 1));
    const m = l - c / 2;
    const sectors = [[c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x]];
    const sector = Math.floor(h / HUE_SECTOR) % sectors.length;

    const hex = sectors[sector]
      .map(channel => Math.round((channel + m) * CHANNEL_MAX).toString(16).padStart(2, '0'))
      .join('');

    return `#${hex.toUpperCase()}`;
  }

  public static darkenHex(hex: string, amount: number): string {
    const { h, s, l } = this.hexToHsl(hex);

    return this.hslToHex(h, Math.max(0, s - amount), Math.max(0, l - amount));
  }
}
