# ConfigsHub AI Coding Instructions

## Project Overview

This is a modern Next.js 15 application with TypeScript, focused on configuration management. It uses the App Router with React 19, Tailwind CSS, and shadcn/ui components.

## Architecture & Key Dependencies

### Authentication System

- **Better Auth** (not NextAuth) is the primary authentication library
- Server config: `src/utils/auth.ts` with MongoDB adapter
- Client config: `src/lib/auth-client.ts`
- Auth pages: `src/app/auth/{signin,signup}/page.tsx`
- Middleware: `src/app/middleware.ts` exports auth middleware

### Database & Storage

- **MongoDB** with direct driver (not Mongoose/Prisma ORM)
- Connection string: `mongodb://localhost:27017/database`
- Better Auth handles user schema automatically

### UI Components & Styling

- **Tailwind CSS v4** with custom design system
- **shadcn/ui** components in `src/components/ui/`
- **Radix UI** primitives for accessibility
- **next-themes** for dark/light mode with system preference
- **Lucide React** for icons
- **Framer Motion** for animations

## Development Patterns

### Code Style & Formatting

- **Biome** (not ESLint/Prettier) for linting and formatting
- Tabs (width: 4) for indentation, 120 character line width
- Commands: `bun lint` and `bun format`

### Component Architecture

```tsx
// Always use this utility function for className merging
import { cn } from "@/lib/utils"

// Button component pattern with cva variants
const buttonVariants = cva("base-classes", {
  variants: { variant: {...}, size: {...} },
  defaultVariants: {...}
})
```

### Auth Flow Patterns

```tsx
// Use authClient for all auth operations
import { authClient } from "@/lib/auth-client";

// Sign up pattern
const { data, error } = await authClient.signUp.email({
  email,
  password,
  name,
});

// Sign in pattern
const { data, error } = await authClient.signIn.email({
  email,
  password,
});
```

## Development Workflow

### Commands

- `bun dev --turbopack` - Development server with Turbopack
- `bun build --turbopack` - Production build with Turbopack
- `bun lint` - Run Biome linting
- `bun format` - Format code with Biome

### File Structure Conventions

- Components: `src/components/{feature}/` or `src/components/ui/`
- Utils: `src/lib/` for client-side, `src/utils/` for server-side
- Auth pages: `src/app/auth/{page}/page.tsx`
- API routes: `src/app/api/{endpoint}/route.ts`

## Key Integration Points

### Theme System

Root layout wraps app with ThemeProvider for system/dark/light themes:

```tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
```

### Font Configuration

Uses Geist fonts (sans + mono) with CSS variables in layout.tsx

### Auth Middleware

All auth-protected routes automatically handled by middleware exporting Better Auth instance

## Important Notes

- Uses **Bun** as package manager and runtime
- **Turbopack** enabled for faster builds/dev
- No traditional ORM - direct MongoDB driver usage
- Better Auth replaces NextAuth for simpler setup
- Biome replaces ESLint/Prettier toolchain
- Component props follow Radix UI patterns with `asChild` prop
