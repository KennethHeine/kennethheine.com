# Personal Brand Website

A modern, fully static personal brand website built with Next.js 14, TypeScript, and Tailwind CSS, designed for deployment to Azure Static Web Apps.

## 🚀 Features

- **Static Generation**: 100% static site with Next.js 14's `output: 'export'`
- **Modern Tech Stack**: TypeScript, Tailwind CSS, MDX for blog content
- **SEO Optimized**: next-seo integration with comprehensive meta tags
- **Dark/Light Theme**: Persistent theme switching with system preference detection
- **Mobile-First Design**: Responsive layout with accessibility features
- **Blog System**: MDX-powered blog with syntax highlighting
- **Type Safety**: Full TypeScript coverage with strict type checking
- **Testing**: Jest + React Testing Library with 100% test coverage
- **Performance**: Optimized for Core Web Vitals and lighthouse scores

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── about/             # About page
│   ├── blog/              # Blog listing and individual posts
│   ├── contact/           # Contact page
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with theme provider
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── BlogPost.tsx       # Blog post card component
│   ├── Container.tsx      # Content container wrapper
│   ├── Header.tsx         # Navigation header
│   ├── MobileMenu.tsx     # Mobile navigation menu
│   ├── SkillBadge.tsx     # Skill tag component
│   ├── ThemeProvider.tsx  # Theme context provider
│   └── ThemeToggle.tsx    # Dark/light theme toggle
├── content/blog/          # MDX blog post files
├── lib/                   # Utility functions and data fetching
│   ├── blog-new.ts        # Blog post processing with gray-matter
│   ├── blog.ts            # Blog data and utilities
│   └── utils.ts           # General utility functions
├── public/                # Static assets
│   └── images/            # Image assets
├── __tests__/             # Jest test files
└── out/                   # Generated static export
```

## 🛠️ Tech Stack

### Core Framework

- **Next.js 14**: React framework with App Router and static export
- **TypeScript**: Type-safe JavaScript with strict configuration
- **React 18**: Latest React with concurrent features

### Styling & UI

- **Tailwind CSS**: Utility-first CSS framework
- **@tailwindcss/typography**: Beautiful typography for blog content
- **@tailwindcss/forms**: Enhanced form styling
- **clsx & tailwind-merge**: Conditional and merged class names

### Content & SEO

- **next-mdx-remote**: MDX processing for blog posts
- **gray-matter**: Front matter parsing for blog metadata
- **next-seo**: SEO optimization with meta tags
- **remark & remark-html**: Markdown processing

### Testing

- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing utilities
- **@testing-library/jest-dom**: Custom Jest matchers

### Development & Deployment

- **ESLint**: Code linting with Next.js configuration
- **Azure Static Web Apps CLI**: Local development and deployment

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd static-web-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build and export static site
- `npm run export` - Build and export static site (alias)
- `npm start` - Start Next.js production server (not needed for static)
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

### Azure Static Web Apps Scripts

- `npm run swa:init` - Initialize Azure SWA configuration
- `npm run swa:build` - Build the static site
- `npm run swa:start` - Start local SWA emulator with static files
- `npm run swa:deploy` - Deploy to Azure SWA production

## 📝 Content Management

### Adding Blog Posts

1. Create a new MDX file in `content/blog/`:

   ```markdown
   ---
   title: 'Your Post Title'
   date: '2024-01-01'
   excerpt: 'Brief description of your post'
   tags: ['tag1', 'tag2']
   ---

   # Your blog content in MDX format

   You can use React components and markdown here.
   ```

2. The blog system automatically processes and displays new posts.

### Customizing Content

- **Homepage**: Edit `app/page.tsx`
- **About**: Edit `app/about/page.tsx`
- **Contact**: Edit `app/contact/page.tsx`
- **Navigation**: Update `components/Header.tsx`
- **Styling**: Modify `tailwind.config.ts` and component styles

## 🎨 Theming

The website includes a comprehensive dark/light theme system:

- **System Preference**: Automatically detects user's system theme
- **Persistent Storage**: Remembers user's theme choice
- **Smooth Transitions**: CSS transitions for theme switching
- **SSR Compatible**: Handles server-side rendering gracefully

Theme colors and styles are defined in `app/globals.css` and `tailwind.config.ts`.

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

Current test coverage: 100% (6 test suites, 32 tests)

## 📱 Responsive Design

The website is built mobile-first with breakpoints:

- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly
- Focus management

## 🚀 Deployment

### Azure Static Web Apps

1. **Prerequisites**:
   - Azure account
   - GitHub repository
   - Azure Static Web Apps CLI

2. **Local Testing**:

   ```bash
   npm run build
   npm run swa:start
   ```

3. **Deploy to Azure**:
   ```bash
   npm run swa:deploy
   ```

### Build Configuration

The site uses Next.js static export configuration:

- `output: 'export'` in `next.config.js`
- Generates static HTML, CSS, and JS files
- No server-side functionality required
- Perfect for CDN deployment

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration with static export
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `jest.config.js` - Jest testing configuration
- `staticwebapp.config.json` - Azure SWA configuration
- `.eslintrc.json` - ESLint configuration

## 📊 Performance

- **Static Generation**: Pre-rendered at build time for optimal performance
- **Image Optimization**: Next.js Image component with placeholder images
- **CSS Optimization**: Tailwind CSS purging and minification
- **Bundle Analysis**: Optimized code splitting and tree shaking

## 🔄 Updates and Maintenance

1. **Dependencies**: Regularly update with `npm update`
2. **Security**: Run `npm audit` and fix vulnerabilities
3. **Testing**: Maintain test coverage above 90%
4. **Performance**: Monitor Core Web Vitals
5. **Accessibility**: Regular accessibility audits

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a personal website project. For suggestions or issues, please open a GitHub issue.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
