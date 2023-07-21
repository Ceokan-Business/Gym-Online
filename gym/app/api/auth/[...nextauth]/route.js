import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { initialUser } from "@interfaces/UsetInterface";

import { connectToDB } from "../../../../utils/database"
import User from '../../../../models/user'; 

const handler = NextAuth({ 
    providers: [ 
        GoogleProvider({ 
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        })
    ], 

    callbacks: { 
        async session ({ session }) { 
            const sessionUser = await User.findOne({ 
                email: session.user.email
            }); 
    
            session.user.id = sessionUser._id.toString(); 
            return session; 
        }, 
    
        async signIn({ profile }) { 
            try { 
                await connectToDB(); 
    
                //check if a user already exists
                const userExists = await User.findOne({ 
                    email: profile.email, 
                }) ; 
    
                // if not, create a new user 
                if(!userExists) { 
                    let userObject  = { 
                        username: "", 
                        image: "", 
                        trainerOptions: { 
                            trainer: null, 
                            isTrainer: false, 
                            trainerProfile: null
                        }, 
                        membership: { 
                            details: null, 
                            isFrozen: false, 
                            startDate: new Date(), 
                            finishDate: new Date (), 
                        }, 
                        notifications: [],
                        posts: [], 
                        calendar: [], 
                        likedPosts: [], 
                    }
                    
                    userObject.email = profile.email; 
                    userObject.username = profile.name.replace(" ", "").toLowerCase(), 
                    userObject.image = profile.picture,

                    console.log(userObject); 

                    await User.create(userObject)
                }
    
                return true;
            } catch (error) { 
                console.log(error); 
                return false;
            }
        }
    }
}); 

export { handler as GET, handler as POST }