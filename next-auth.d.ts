import NextAuth, { DefaultSession } from "next-auth";

// Extend the default session type
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      // Add other properties you need here
    } & DefaultSession["user"];
  }
}
