## Supabase Setup

This project now uses Supabase for email/password and Google OAuth authentication.

### 1. Required Environment Variables

Add the following to your `.env.local` (never commit secrets):

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY
# (Optional backward compatibility)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_PUBLIC_KEY

# Base URL of the app (used for redirects if needed)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

If you plan to keep Better Auth simultaneously, ensure its secrets do not conflict. Ultimately you should remove one system for clarity.

### 2. Supabase Dashboard Configuration

In your Supabase project settings:

- Enable Email auth provider.
- Enable Google OAuth under Authentication > Providers. Set:
  - Redirect URL: `http://localhost:3000/auth/callback` (and your production domain equivalent).

### 3. OAuth Redirect Flow

The app sends users to Supabase with an `redirectTo=/auth/callback` parameter.
The callback page (`/auth/callback`) loads the Supabase client, which exchanges the OAuth code/hash for a session. On success it redirects to `/dashboard`.

### 4. Session Handling Strategy

Client pages call `supabase.auth.getUser()` / `getSession()` to derive state. For higher security, consider a server component or Route Handler that validates cookies via the server client (`@supabase/ssr`'s `createServerClient`).

### 5. Adding Additional Providers

Enable the provider in Supabase > Authentication > Providers, then extend the Sign In / Sign Up buttons with another `signInWithOAuth({ provider: '<provider>' })` call.

### 6. Email Confirmation

Currently the signup flow treats an immediate session as success. If you enable email confirmations in Supabase:

- Users will not have an active session until they click the confirmation link.
- The code already displays a success toast fallback; expand this with a dedicated confirmation screen if desired.

### 7. Migrating Away From Better Auth

If Supabase fully replaces Better Auth:

- Remove `src/utils/auth.ts` and related middleware export.
- Remove `export { auth as middleware }` from `src/app/middleware.ts` and replace with a cookie-based Supabase session refresh strategy if needed.
- Update deployment docs to reference only Supabase.

### 8. Security Notes

- Never expose the service role key to the browser; only use the anon (public) key client-side.
- Use Row Level Security (RLS) for any custom tables you add later.

### 9. Troubleshooting Checklist

| Issue                                      | Likely Cause               | Fix                                                       |
| ------------------------------------------ | -------------------------- | --------------------------------------------------------- |
| `Missing NEXT_PUBLIC_SUPABASE_URL` warning | Env var unset              | Add to `.env.local` and restart dev server                |
| Google login returns to sign in page       | Redirect URL mismatch      | Ensure provider redirect matches `/auth/callback` exactly |
| Session absent after email sign-up         | Email confirmation enabled | Confirm email or disable confirmations in Supabase        |
| 400 on OAuth                               | Wrong project URL or key   | Copy values again from Supabase dashboard                 |

### 10. Next Improvements

- Add a server-side layout guard that fetches the user via `createServerClient`.
- Persist minimal user profile in a `profiles` table (trigger or edge function to auto-create on auth event).
- Centralize auth utilities (hooks for `useAuthUser`, `signOut`, etc.).

---

With these variables and the callback route configured, Supabase auth flows (email/password + Google OAuth) should function end to end.
