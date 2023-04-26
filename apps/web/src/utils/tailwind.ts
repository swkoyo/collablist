export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const LABEL_COLORS: Record<string, string> = {
  blue: 'blue-500',
  green: 'green-500',
  yellow: 'yellow-500',
  teal: 'teal-500',
  pink: 'pink-500',
  red: 'red-500',
  gray: 'gray-500',
};

export const getColorCode = (color: string | null) => {
  return LABEL_COLORS[color || 'gray'];
};
