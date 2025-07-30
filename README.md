# Gateway Abroad Education Website

A modern, responsive website for Gateway Abroad Education with dark/light theme support and amazing animations.

## 🚀 Features

- **Dark/Light Theme Toggle** - Seamless theme switching with smooth transitions
- **Responsive Design** - Works perfectly on all devices
- **Amazing Animations** - CSS-based animations for better performance
- **Test Preparation Pages** - Individual pages for IELTS, TOEFL, GRE, GMAT, PTE, SAT
- **Modern UI/UX** - Clean, professional design with gradient effects
- **SEO Optimized** - Built with Next.js 15 for optimal performance

## 🛠️ Local Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation Steps

1. **Extract the downloaded ZIP file**
   \`\`\`bash
   unzip gateway-abroad-website.zip
   cd gateway-abroad-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Common Issues & Solutions

#### Issue 1: "Module not found" errors
**Solution:**
\`\`\`bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
\`\`\`

#### Issue 2: TypeScript errors
**Solution:**
\`\`\`bash
# Run type checking
npm run type-check

# Or ignore TypeScript errors during build
npm run build
\`\`\`

#### Issue 3: Port already in use
**Solution:**
\`\`\`bash
# Use a different port
npm run dev -- -p 3001
\`\`\`

#### Issue 4: Tailwind CSS not working
**Solution:**
\`\`\`bash
# Reinstall Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## 📁 Project Structure

\`\`\`
gateway-abroad-website/
├── app/                          # Next.js 15 App Router
│   ├── globals.css              # Global styles with theme support
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Home page
│   ├── about/                   # About page
│   ├── contact/                 # Contact page
│   ├── blogs/                   # Blog listing page
│   ├── career/                  # Career page
│   ├── spoken-english/          # Spoken English page
│   └── test-preparation/        # Test prep pages
│       ├── ielts/
│       ├── toefl/
│       ├── gre/
│       ├── gmat/
│       ├── pte/
│       └── sat/
├── components/                   # Reusable components
│   ├── header.tsx               # Header with theme toggle
│   ├── footer.tsx               # Footer component
│   ├── theme-provider.tsx       # Theme context provider
│   ├── theme-toggle.tsx         # Theme toggle button
│   └── [other-components].tsx
├── public/                      # Static assets
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
\`\`\`

## 🎨 Theme System

The website supports both light and dark themes:

- **Light Theme**: Clean, bright design with red/pink gradients
- **Dark Theme**: Modern dark design with enhanced contrast
- **Auto-switching**: Remembers user preference in localStorage
- **Smooth Transitions**: All theme changes are animated

## 🚀 Deployment

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Build for Production
\`\`\`bash
npm run build
npm start
\`\`\`

## 🔧 Customization

### Changing Colors
Edit the CSS variables in `app/globals.css`:

\`\`\`css
:root {
  --primary-red: #dc2626;
  --primary-pink: #ec4899;
  /* Add your custom colors */
}
\`\`\`

### Adding New Pages
1. Create a new folder in `app/`
2. Add a `page.tsx` file
3. Export a default React component

### Modifying Animations
All animations are defined in `app/globals.css` using CSS keyframes for optimal performance.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Troubleshooting

If you encounter any issues:

1. **Check Node.js version**: `node --version` (should be 18+)
2. **Clear cache**: `npm cache clean --force`
3. **Reinstall dependencies**: `rm -rf node_modules && npm install`
4. **Check console**: Open browser dev tools for error messages

## 📞 Support

For technical support or questions about the website, please contact:
- Email: support@gatewayabroadeducations.com
- Phone: +91 98765 43210

## 📄 License

This project is proprietary software owned by Gateway Abroad Education.
# gateway-next
