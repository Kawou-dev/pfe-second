import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import UserModel from "@/lib/models/UserModel";
import { connectDB } from "@/lib/config/connectDB";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        await connectDB();
        const user = await UserModel.findOne({ email });

        if (!user) {
          console.log("Utilisateur non trouvé");
          return null;
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          console.log("Mot de passe incorrect");
          return null;
        }

        console.log("Connexion réussie !");
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          profilePic: user.profilePic || "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.profilePic = user.profilePic;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.profilePic = token.profilePic;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
