import { NextAuthOptions, Session } from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import { emailSchema, passwordSchema } from '@/schema/credentials-schema';
import { prisma } from "@/lib/prisma";
import { PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { JWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/admin/login', // Custom sign-in page
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        // Validate email format
        const emailValidation = emailSchema.safeParse(credentials.email);
        if (!emailValidation.success) {
          throw new Error('Invalid email format');
        }

        // Validate password format
        const passwordValidation = passwordSchema.safeParse(credentials.password);
        if (!passwordValidation.success) {
          throw new Error(passwordValidation.error.issues[0].message);
        }

        try {
          // Find the user in the database
          const user = await prisma.admin.findUnique({
            where: {
              email: emailValidation.data,
            },
          });

          if (!user) {
            throw new Error('Invalid email or password'); // Do not reveal whether the email or password is incorrect
          }

          if (!user.password) {
            throw new Error('No password set for this account'); // Handle accounts without a password set
          }

          // Compare the hashed password
          const passwordMatch = await bcrypt.compare(passwordValidation.data, user.password);
          if (!passwordMatch) {
            throw new Error('Invalid email or password'); // Do not reveal whether the email or password is incorrect
          }

          // Return the user object if credentials are valid
          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          if (error instanceof PrismaClientInitializationError) {
            throw new Error('Database connection error');
          }
          console.error('Authorization error:', error);
          throw new Error('Internal server error');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to the JWT token
        token.email = user.email; // Attach email to the JWT token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.id && token?.email) {
        // Attach the token values to the session object
        session.user = {
          ...session.user,
          id: token.id as number,
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'secret',
};
