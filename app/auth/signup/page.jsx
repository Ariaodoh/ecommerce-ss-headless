'use client';

import { client } from '@/lib/client';
import Link from 'next/link';
import bcrypt from 'bcrypt';
import toast from 'react-hot-toast';

export default function SignUpPage() {
    const handleSignIn  = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const saltRounds = 10;

        const hashedPassword = await bcrypt.hash(formData.get('password'), saltRounds);

        const user = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: hashedPassword,
            name: formData.get('name'),
            role: 'user',
        }

        try {
            const reponse = await client.create(user);
            if (reponse.ok){
                console.log('User created successfully');
                toast.success('You have successfully created an account')
            }
        } catch (error) {
            console.error('Error creating user', error);
            toast.error('An error occurred while creating your account')
        }
    };

    return(
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'}}>
            <form onSubmit={handleSignIn} style={{display:'flex', flexDirection: 'column'}}>
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' name='username' required/>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' required/>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' name='email' required/>
                <button type='submit'>Sign up</button>
            </form>     
            <span>If you already have an account, 
                <Link href={'/auth/login'}> Login here</Link>  
            </span>  
        </div>
    );
}