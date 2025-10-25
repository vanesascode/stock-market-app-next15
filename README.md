# 📈 StockView

<div align="center">

![Version](https://img.shields.io/badge/version-0.0.1-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A modern stock market dashboard built with Next.js 15, featuring real-time market data powered by TradingView widgets.

[Live Demo](https://lively-rock-0bc293d03.3.azurestaticapps.net/) • [Documentation](./TESTING.md) • [Report Bug](https://github.com/vanesascode/stock-market-app-next15/issues)

</div>

---

## ✨ Features

- 📊 **Real-time Market Data** - TradingView widgets integration
- 🎨 **Modern UI** - Dark theme with Tailwind CSS 4
- ⚡ **Turbopack** - Lightning-fast development server
- 🧪 **Comprehensive Testing** - 70+ unit and E2E tests
- 🐳 **Docker Ready** - Run locally without installing dependencies
- 🚀 **CI/CD Pipeline** - Automated testing and deployment
- 📱 **Responsive Design** - Mobile-first approach
- 🔒 **Type-Safe** - Full TypeScript support

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vanesascode/stock-market-app-next15.git

# Navigate to project directory
cd stock-market-app-next15

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📦 Available Scripts

| Command            | Description                             |
| ------------------ | --------------------------------------- |
| `npm run dev`      | Start development server with Turbopack |
| `npm run build`    | Build for production (static export)    |
| `npm start`        | Serve production build                  |
| `npm run lint`     | Run ESLint                              |
| `npm run test`     | Run unit tests in watch mode            |
| `npm run test:ci`  | Run unit tests with coverage            |
| `npm run test:e2e` | Run E2E tests                           |
| `npm run test:all` | Run all tests                           |

## 🧪 Testing

This project includes comprehensive testing:

- **Unit Tests** - Jest + React Testing Library
- **E2E Tests** - Playwright (Chromium, Firefox, WebKit)
- **Coverage** - Automatic coverage reports in CI/CD

```bash
# Run unit tests
npm run test:ci

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

See [TESTING.md](./TESTING.md) for detailed testing documentation.

## 🐳 Run with Docker (No Installation Required)

Want to try the app without installing Node.js or dependencies? Use Docker!

### Quick Start with Docker

```bash
# Just run this - it builds and starts everything
docker compose up
```

The application will be available at [http://localhost:3000](http://localhost:3000).

**That's it!** No need to install Node.js, npm, or any dependencies. Docker handles everything.

### Alternative: Docker without Compose

```bash
# Build the image
docker build -t stockview .

# Run the container
docker run -p 3000:3000 stockview
```

### Stop the Application

```bash
docker compose down
```

See [DOCKER.md](./DOCKER.md) for detailed Docker documentation.

## 🛠️ Tech Stack

### Core

- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety

### Styling

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Primitive UI components (Avatar, Dropdown, Slot)
- **[class-variance-authority](https://cva.style/)** - Component variants
- **[Lucide React](https://lucide.dev/)** - Icon library

### Testing

- **[Jest 29](https://jestjs.io/)** - Unit testing
- **[React Testing Library](https://testing-library.com/)** - Component testing
- **[Playwright](https://playwright.dev/)** - E2E testing

### External Services

- **[TradingView](https://www.tradingview.com/)** - Financial market widgets
- **[Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/)** - Hosting

## 📁 Project Structure

```
.
├── app/                    # Next.js App Router
│   ├── (root)/            # Route group
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   └── layout.tsx         # App layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx
│   ├── NavItems.tsx
│   ├── UserDropdown.tsx
│   └── TradingViewWidget.tsx
├── hooks/                # Custom React hooks
│   └── useTradingViewWidget.tsx
├── lib/                  # Utilities and constants
│   ├── constants.ts
│   └── utils.ts
├── e2e/                  # E2E tests
├── public/               # Static assets
└── __tests__/           # Unit tests
```

## 🎨 Features Breakdown

### Market Overview

- Real-time stock prices
- Market sector visualization
- Top stories and news feed
- Interactive stock charts

### Navigation

- Responsive header
- Mobile-friendly navigation
- Active route highlighting
- User dropdown menu

### TradingView Integration

- Market Overview widget
- Stock Heatmap
- Financial news timeline
- Market data tables
- Symbol information
- Advanced charts
- Company profiles

## 🔧 Configuration

### Static vs Server-Side Rendering

The app is currently configured for **static export** (Static Site Generation).

**Current configuration (Static):**

```json
// package.json
"build": "next build"
```

```typescript
// next.config.ts
output: "export",
images: {
  unoptimized: true,
}
```

**To switch to Server-Side Rendering:**

1. Remove from `next.config.ts`:

```typescript
output: "export",
images: {
  unoptimized: true,
}
```

2. Update `package.json`:

```json
"build": "next build --turbopack"
```

## 🚦 CI/CD Pipeline

GitHub Actions workflow runs on every push to `main`:

1. ✅ Linting (ESLint)
2. ✅ Unit tests with coverage
3. ✅ E2E tests (Playwright)
4. ✅ Build static site
5. ✅ Deploy to Azure Static Web Apps

## 📊 Test Coverage

- **Total Tests:** 70+
- **Coverage:** Available in GitHub Artifacts

## 📝 License

This project is licensed under the MIT License.

## 📞 Contact

- GitHub: [@vanesascode](https://github.com/vanesascode)
- Project Link: [https://github.com/vanesascode/stock-market-app-next15](https://github.com/vanesascode/stock-market-app-next15)

---

<div align="center">

**[⬆ Back to Top](#-stockview)**

Made with ❤️ using Next.js 15

</div>
