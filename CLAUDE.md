# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A stock market dashboard application built with Next.js 15 that integrates TradingView widgets to display real-time financial market data, charts, and stock information.

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

Development server runs on http://localhost:3000

## Architecture

### Next.js 15 App Router Structure

- Uses **App Router** (not Pages Router) - modern routing with server components by default
- Route groups with `(root)` for organization without affecting URLs
- Server components for static content (Header, layouts)
- Client components marked with `"use client"` for interactive features (TradingViewWidget, NavItems, UserDropdown)

### Key Directories

- `app/` - Next.js App Router pages and layouts
  - `app/(root)/page.tsx` - Homepage with market overview
  - `app/layout.tsx` - Root layout with metadata
- `components/` - Reusable React components
  - `components/ui/` - Radix UI wrapper components (button, avatar, dropdown-menu)
- `hooks/` - Custom React hooks
  - `useTradingViewWidget.tsx` - Manages TradingView widget lifecycle with dynamic script injection
- `lib/` - Utilities and constants
  - `constants.ts` - Widget configurations and stock symbols
  - `utils.ts` - Helper utilities (cn function for class merging)
- `public/assets/` - Static icons and images

### Component Patterns

**TradingView Widget Integration:**

- Components use `useTradingViewWidget` hook to dynamically inject TradingView scripts
- Widget configs defined in `lib/constants.ts` with dark theme and custom styling
- Widgets are memoized to prevent unnecessary re-renders
- Data flow: Component → Hook → Script injection → TradingView CDN → Rendered widget

**Server vs Client Components:**

- Default to server components for performance
- Use client components only when needed (hooks, browser APIs, interactivity)
- Navigation uses `usePathname()` for active state detection

**UI Component Composition:**

- Radix UI primitives wrapped with Tailwind classes
- class-variance-authority (CVA) for variant management
- `cn()` utility (clsx + tailwind-merge) for conditional classes

### Styling System

- **Tailwind CSS 4** with PostCSS
- **Dark mode** applied via `dark` class on `<html>` element
- **Custom theme colors** in globals.css:
  - Grays: gray-900 (#050505) to gray-400 (#CCDADC)
  - Accents: yellow-400/500, teal-400, red-500
- **Custom utility classes** for stock market UI:
  - `.yellow-btn` - Gradient button styling
  - `.home-wrapper`, `.home-section` - Homepage layouts
  - `.tradingview-widget-container` - Widget customization
  - `.watchlist-*`, `.alert-*`, `.search-*` - Feature-specific styles
- **tw-animate-css** imported in globals.css for animation utilities (e.g., `animate-fade-in`)

### Stock Symbols Configuration

Pre-configured symbols in `lib/constants.ts` across categories:

- Tech Giants: AAPL, MSFT, GOOGL, AMZN, TSLA, META, NVDA
- Financial: JPM, WFC, BAC, HSBC, C, MA
- Consumer: AMZN, BABA, T, WMT, V
- Emerging: SNOW, PLTR, COIN, RBLX, CRWD

### TradingView Widgets Available

Multiple widget types configured in constants:

- **Market Overview** - Sector-based stock tables
- **Heatmap** - Market sector visualization
- **Top Stories** - Financial news feed
- **Market Data** - Stock table widget
- **Symbol Info** - Individual stock details
- **Advanced Chart** - Candlestick charts with technical analysis
- **Company Profile** - Corporate information
- **Company Financials** - Financial metrics

## Technology Stack

- Next.js 15.5.4 with Turbopack
- React 19.1.0
- TypeScript 5 (strict mode)
- Tailwind CSS 4
- Radix UI components (@radix-ui/react-\*)
- Lucide React for icons
- TradingView widgets (external CDN)

## Current State & Planned Features

**Implemented:**

- Homepage with TradingView market overview widget
- Header with navigation and user dropdown
- Responsive design (mobile/desktop)
- Dark mode styling

**Not Yet Implemented:**

- `/search` page for stock lookup
- `/watchlist` page for saved stocks
- Backend API routes
- Authentication (currently using mocked user "John Doe")
- Price alert notifications
- Database persistence

## Important Notes

- No state management library currently - uses local state and URL-based state
- User authentication is mocked - UserDropdown shows placeholder data
- TradingView widgets load from external CDN (s3.tradingview.com)
- Path aliases: `@/*` maps to project root
- TypeScript strict mode enabled throughout
