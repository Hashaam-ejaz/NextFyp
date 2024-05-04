import NextAuth, { Awaitable, RequestInternal } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "@/libs/mongodb";
import { IUser, User } from "../../../../models/users";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        let { username, password } = credentials as {
          username: string;
          password: string;
        };
        username = username.toLowerCase();
        try {
          await connectMongoDB();
          // const existingUser: IUser | null = await User.findOne({ username });
          // console.log("existing user: " + existingUser);
          const response = await fetch(
            `http://localhost:3000/api/users?email=${username}`
          );
          const user1 = await response.json();
          const user = user1.existingUser;
          if (!user) {
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
export { handler as GET, handler as POST };
