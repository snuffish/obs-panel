import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
	darkMode: ["class"],
	content: ["./src/**/*.tsx"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)", ...fontFamily.sans]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
					12: '#193B2D'
				},
				mauve: {
					1: '#FDFCFD',
					3: '#F4F2F4',
					6: '#E4E2E4',
					7: '#DCDBDD',
					11: '#6F6E77',
					12: '#1A1523'
				},
				tomato: {
					1: '#FFFCFC',
					7: '#F3B0A2',
					11: '#CA3214'
				},
				red: '#DB4324',
				white: '#fbfefc'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
