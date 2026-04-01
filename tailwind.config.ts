import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        golf: {
          green: '#2d5a27',
          grass: '#4a7c44',
          accent: '#e2f4de'
        }
      }
    },
  },
  plugins: [],
}
export default config
