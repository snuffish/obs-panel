import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import tailwindcssAnimate from 'tailwindcss-animate'
import colors from 'tailwindcss/colors'
import Typography from '@tailwindcss/typography'
import AspectRatio from '@tailwindcss/aspect-ratio'
import Fluid, { extract, screens } from 'fluid-tailwind'

export default {
  darkMode: ['class'],
  content: {
    files: ['./src/**/*.tsx'],
    extract,
  },
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    screens,
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        green: {
          3: '#E9F9EE',
          4: '#DDF3E4',
          5: '#CCEBD7',
          6: '#B4DFC4',
          7: '#92CEAC',
          8: '#5BB98C',
          10: '#299764',
          11: '#18794E',
          12: '#193B2D',
        },
        mauve: {
          1: '#FDFCFD',
          3: '#F4F2F4',
          6: '#E4E2E4',
          7: '#DCDBDD',
          11: '#6F6E77',
          12: '#1A1523',
        },
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
        gray: {
          '50': '#f9fafb',
          '100': '#f3f4f6',
          '200': '#e5e7eb',
          '300': '#d1d5db',
          '400': '#9ca3af',
          '500': '#6b7280',
          '600': '#4b5563',
          '700': '#374151',
          '800': '#1f2937',
          '900': '#111827',
          '950': '#030712',
        },
        slate: {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
          '950': '#020617',
        },

        tomato: {
          1: '#FFFCFC',
          7: '#F3B0A2',
          11: '#CA3214',
        },
        red: {
          DEFAULT: '#DB4324',
          ...colors.red,
        },
        white: '#fbfefc',
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    Typography,
    AspectRatio,
    Fluid({
      checkSC144: false,
    })
  ],
} satisfies Config
