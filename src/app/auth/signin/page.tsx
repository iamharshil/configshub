'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = async () => {
        const { data, error } = await authClient.signIn.email({
            email,
            password,
        });
        if (error) {
            console.error('Signin error:', error.message);
        } else {
            console.log('Signed in:', data.user);
            // Redirect to dashboard
        }
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='button' onClick={handleSignin}>Sign In</button>
        </div>
    );
}