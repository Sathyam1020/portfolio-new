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
        email: { type: 'email' },
        password: { type: 'password' },
      },
      //@ts-ignore
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null; // If no credentials, return null
        }

        const emailValidation = emailSchema.safeParse(credentials.email);
        if (!emailValidation.success) {
          throw new Error('Invalid email format');
        }

        const passwordValidation = passwordSchema.safeParse(credentials.password);
        if (!passwordValidation.success) {
          throw new Error(passwordValidation.error.issues[0].message);
        }

        try {
          // Find user by email
          const user = await prisma.admin.findUnique({
            where: {
              email: emailValidation.data,
            },
          });

          if (!user) {
            return Response.json({
                message: 'User not found',
            })
          }

          if (!user.password) {
            // If user has no password, hash the password and update the user
            const hashedPassword = await bcrypt.hash(passwordValidation.data, 10);

            const updatedUser = await prisma.admin.update({
              where: {
                email: emailValidation.data,
              },
              data: {
                password: hashedPassword,
              },
            });

            return updatedUser;
          }

          // Validate password
          const passwordVerification = await bcrypt.compare(passwordValidation.data, user.password);
          if (!passwordVerification) {
            throw new Error('Invalid password');
          }

          return user; // Return user if password is valid
        } catch (error) {
          if (error instanceof PrismaClientInitializationError) {
            throw new Error('Internal server error');
          }
          console.error(error);
          throw error; // Re-throw any other errors
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store the user ID in the token
        token.email = user.email; // Store email in token
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.email) {
        // Fetch the user using the email from the token
        const user = await prisma.admin.findUnique({
          where: {
            email: token.email,
          },
        });

        if (user && session.user) {
          session.user.id = user.id; // Attach the user ID to the session
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? 'secret', // Secret for JWT signing
};
