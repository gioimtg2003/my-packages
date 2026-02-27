import { PALETTE_COLORS } from '@/constants';

export function hashNameToColorHex(name: string): string {
  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PALETTE_COLORS.length;
  return PALETTE_COLORS[index];
}

export function genBase64Avatar(
  data: { name: string; email: string; isUpperCaseFirst?: boolean },
  textOption?: {
    textSize?: number;
    fontWeight?: number;
    size?: 'default' | 'small' | 'large';
  }
) {
  if (typeof window === 'undefined') return '';

  const { name, isUpperCaseFirst = true } = data;
  const {
    textSize = 100,
    fontWeight = 500,
    size = 'default',
  } = textOption || {};

  const backgroundColor = hashNameToColorHex(name);
  const text = isUpperCaseFirst
    ? name?.split(' ')[0][0]?.toUpperCase()
    : name
        ?.split(' ')
        .map((splitChar) => splitChar?.[0]?.toUpperCase())
        .join('');

  const canvas = document.createElement('canvas');
  canvas.width = textSize;
  canvas.height = textSize;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.beginPath();
    ctx.roundRect(0, 0, textSize, textSize, 20);
    ctx.fill();

    const textRate = size === 'default' ? 2 : size === 'small' ? 2.5 : 1.5;
    const displayText = text;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${fontWeight} ${textSize / textRate}px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayText, textSize / 2, textSize / 2 + 4);

    const base64 = canvas.toDataURL('image/png');

    return base64;
  }
}
