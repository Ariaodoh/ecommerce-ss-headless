import { client } from "@/lib/client";
import NextAuth from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler =  NextAuth({
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: { label: "Password", type: "password"},
                email: { label: "Email", type: "email"},
            },
            async authorize(credentials){
                const query = `*[_type == "user" && username == $username && email == $email]`
                const params = { username: credentials.username, email: credentials.email};

                try {
                    const user = await client.fetch(query, params);

                    const isMatch = await bcrypt.compare(credentials.password, user[0].password);

                    if(isMatch){
                        if (user.role === 'admin'){
                            return {
                                id: user[0]._id,
                                username: user[0].username,
                                name: user[0].name,
                                email: user[0].email,
                            };
                        }
                    } else {
                        throw new Error("Invalid username or password");
                        
                    }
                } catch (error) {
                    console.error('Error fetching user from database', error);
                }
        
                return null;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, token}){
            session.user.id = token.sub;
            return session;
        },
    },
});

export { handler as GET, handler as POST};