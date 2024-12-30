'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
    const handleSignIn  = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        await signIn('credentials', {
            redirect: true,
            callbackUrl: '/studio',
            username: formData.get('username'),
            password: formData.get('password'),
        });
    };

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
            <form onSubmit={handleSignIn} style={{display:'flex', flexDirection: 'column'}}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' required/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' required/>
                <button type='submit'>Login</button>
            </form>     
            <span>If you do not already have an account, 
                <Link href={'/auth/signup'}> Sig up here</Link>  
            </span>  
        </div>
    );
}