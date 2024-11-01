import clientPromise from "@/libs/mongoConnect";
import { UserInfo } from "@/models/UserInfo";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { User } from '@/models/User';
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        user: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        try {
          if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGO_URL);
          }

          const user = await User.findOne({ email });
          console.log("User found:", user); 
          if (user) {
            const passwordOk = await bcrypt.compare(password, user.password);
            console.log("Password match:", passwordOk); 
            if (passwordOk) {
              return user;
            }
          } else {
            console.log("No user found with this email.");
          }
        } catch (error) {
          console.error("Authorization error:", error);
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};


export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  return userInfo ? userInfo?.admin : false;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
