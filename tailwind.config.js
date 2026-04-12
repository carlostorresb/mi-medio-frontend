/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'title-hover': '#727272',
        background:           'var(--background)',
        foreground:           'var(--foreground)',
        card:                 'var(--card)',
        'card-foreground':    'var(--card-foreground)',
        popover:              'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary:              'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary:            'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted:                'var(--muted)',
        'muted-foreground':   'var(--muted-foreground)',
        accent:               'var(--accent)',
        'accent-foreground':  'var(--accent-foreground)',
        destructive:          'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border:               'var(--border)',
        input:                'var(--input)',
        ring:                 'var(--ring)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Kumbh Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
  plugins: [],
}
