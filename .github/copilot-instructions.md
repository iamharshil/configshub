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

- **Tailwind CSS v4** with Apple-inspired design system and liquid glass effects
- **shadcn/ui** components enhanced with glass morphism and minimal animations
- **Radix UI** primitives for accessibility
- **next-themes** for dark/light mode with system preference
- **Lucide React** for icons
- **Apple Design Language** with rounded corners, subtle shadows, and smooth transitions

## Development Patterns

### Code Style & Formatting

- **Biome** (not ESLint/Prettier) for linting and formatting
- Tabs (width: 4) for indentation, 120 character line width
- Commands: `bun lint` and `bun format`

### Component Architecture

```tsx
// Always use this utility function for className merging
import { cn } from "@/lib/utils";

// Button component pattern with Apple-inspired variants
const buttonVariants = cva("base-classes apple-scale", {
  variants: {
    variant: {
      default: "bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl",
      glass: "glass-card hover:bg-accent/20 hover:shadow-xl",
    },
    size: { default: "h-10 px-6", lg: "h-12 px-8 rounded-xl" },
  },
});
```

### Apple Design Patterns

```tsx
// Liquid glass card styling
<Card className="glass-card apple-fade-in">

// Apple-style input with icons
<div className="relative">
  <Icon className="absolute left-3.5 top-1/2 transform -translate-y-1/2" />
  <Input className="pl-10 rounded-xl" />
</div>

// Smooth animations
<div className="apple-bounce apple-scale">
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

Apple-inspired color variables support both light and dark modes with liquid glass effects.

### Font Configuration

Uses Geist fonts (sans + mono) with CSS variables and Apple-style font smoothing

### Auth Middleware

All auth-protected routes automatically handled by middleware exporting Better Auth instance

### Liquid Glass CSS Classes

- `.glass` - Basic glass effect with backdrop blur
- `.glass-card` - Enhanced glass card with gradients and shadows
- `.apple-bounce`, `.apple-fade-in`, `.apple-scale` - Apple-style animations
- Apple color palette variables: `--apple-blue`, `--apple-green`, etc.

## Important Notes

- Uses **Bun** as package manager and runtime
- **Turbopack** enabled for faster builds/dev
- No traditional ORM - direct MongoDB driver usage
- Better Auth replaces NextAuth for simpler setup
- Biome replaces ESLint/Prettier toolchain
- Component props follow Radix UI patterns with `asChild` prop
