/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[
   './pages/**/*.{js,ts,jsx,tsx,,scss}', 
   './useComponents/**/*.{js,ts,jsx,tsx,scss}', 
   './usePieces/**/*.{js,ts,jsx,tsx,scss}', 
   './useCases/**/*.{js,ts,jsx,tsx,scss}',
   './layouts/**/*.{js,ts,jsx,tsx,scss}'
  ],
    theme: {
      container: {
        maxWidth: '300%',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code'],
      },
      extend: {
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
        colors: {
          brand: {
            dark: '#0D0D0D',
            light: '#FFFFFF',
            primary: '#FDBA12',
            secondary: '#22252A',
            soft: '#2D3035'
          },
          transparent: 'transparent',
        },
        
      }
    },
  plugins: [],
}