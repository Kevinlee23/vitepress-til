module.exports = {
	content: [
		'./docs/.vitepress/**/*.{js,ts,vue}',
		'./docs/**/*.md',
	],
	theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-motion')],
}