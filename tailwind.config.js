/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    colors: {
      'forest': '#213017',
      'olive': '#52612E',
      'emerald': '#3B9900',
      'yellow': '#FEF8DC',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#FFFFFF',
      'black': '#000000',
      'snow': '#f5f5f5',
      'cream': '#fff9f0'
    },
    fontFamily: {
      body: ['var(--font-montserrat)', 'sans-serif'],
      title: ['var(--font-bebas-neue)', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      typography: () => ({
        cream: {
          css: {
            '--tw-prose-body': 'var(--color-cream)',
            '--tw-prose-headings': 'var(--color-cream)',
          }
        }
      })
    }
  },
}
