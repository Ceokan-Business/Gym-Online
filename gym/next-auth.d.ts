import NextAuth from "next-auth/next";
import { Schema, Document } from "mongoose";
import { Post } from "./Post";
import { DefaultSession } from "next-auth";

declare module 'next-auth' { 
    interface Session extends DefaultSession { 
        user?: User
    }
}