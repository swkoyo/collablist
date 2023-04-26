import type { Config } from 'tailwindcss';

import baseConfig from '@natodo/tailwind-config';

export default {
  presets: [baseConfig],
  content: ['./src/**/*.tsx'],
  safelist: [
    {
      pattern: /(bg|text|ring)-(blue|green|yellow|teal|pink|red|gray)-500/,
    },
  ],
} satisfies Config;
