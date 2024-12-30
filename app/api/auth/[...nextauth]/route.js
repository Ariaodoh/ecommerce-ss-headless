import { client } from "@/lib/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler =  NextAuth({
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentials){
                const query = `*[_type == "user" && username == $username && password == $password]`
                const params = { username: credentials.username, password: credentials.password};

                try {
                    const user = await client.fetch(query, params);

                    if(user.role === 'admin'){
                        return {
                            id: user[0]._id,
                            username: user[0].username,
                            email: user[0].email,
                        };
                    }
                } catch (error) {
                    console.error('Error fetchin user from database', error);
                }
        
                return null;
            },
        }),
    ],
    callbacks: {
        async session({session, token}){
            session.user.id = token.sub;
            return session;
        },
    },
});

export { handler as GET, handler as POST};