# GitHub OAuth Setup Guide

This guide will walk you through setting up GitHub OAuth for your ConfigsHub application.

## 1. Create a GitHub OAuth Application

1. Go to your GitHub account settings
2. Navigate to **Developer settings** > **OAuth Apps** > **New OAuth App**
3. Fill in the application details:
    - **Application name**: ConfigsHub (or your preferred name)
    - **Homepage URL**: `http://localhost:3000` (development) or your production URL
    - **Application description**: (Optional) Describe your application
    - **Authorization callback URL**: `http://localhost:3000/auth/callback` (development) or `https://yourdomain.com/auth/callback` (production)
4. Click **Register application**
5. You will receive a **Client ID**
6. Generate a new **Client Secret** by clicking **Generate a new client secret**
7. Save both the Client ID and Client Secret securely

## 2. Configure Supabase with GitHub OAuth Credentials

1. Go to your Supabase dashboard
2. Navigate to **Authentication** > **Providers** > **GitHub**
3. Toggle GitHub provider to **Enabled**
4. Fill in the following details:
    - **Client ID**: The Client ID from your GitHub OAuth App
    - **Client Secret**: The Client Secret from your GitHub OAuth App
    - **Authorize URL**: Leave as default (`https://github.com/login/oauth/authorize`)
    - **Token URL**: Leave as default (`https://github.com/login/oauth/access_token`)
    - **User Info URL**: Leave as default (`https://api.github.com/user`)
    - **Redirect URL**: `http://localhost:3000/auth/callback` (development) or your production callback URL
5. Specify the required scopes (typically `read:user` and `user:email` are sufficient)
6. Click **Save**

## 3. Test the Integration

1. Go to your application's sign-up or sign-in page
2. Click the "Continue with GitHub" button
3. You should be redirected to GitHub's authorization page
4. After authorizing, you should be redirected back to your application and signed in

## Troubleshooting

-   If authentication fails, check the callback URL in both GitHub and Supabase settings
-   Ensure the Client ID and Client Secret are correctly copied
-   Check browser console and server logs for any errors
-   Verify that the user is redirected to the correct URL after authentication

## Production Considerations

-   Create separate GitHub OAuth applications for development and production environments
-   Use environment variables to configure the OAuth credentials
-   Update callback URLs when deploying to production
-   Consider implementing PKCE (Proof Key for Code Exchange) for added security
