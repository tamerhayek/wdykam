import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['forest'],
		base: true,
		utils: true,
		prefix: '',
		themeRoot: ':root'
	},
	plugins: [daisyui, typography, forms]
} satisfies Config;
