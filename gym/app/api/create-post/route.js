import { connectToDB } from '@utils/database'; 
import Post from "@models/post"; 
import User from "@models/user"; 

export const POST = async ( req, { params }) => { 
    try  { 
        await connectToDB(); 
        const { title, description, userid } = await req.json();  // get the frontend data 
        console.log({ title, description, userid }); 

        let user = await User.findOne({ _id: userid }, { posts: 1 }); 

        const post = new Post({ 
            title, 
            description, 
            creator: userid
        }); 

        await post.save () // add the post in the database

        let updatePosts = user.posts; 
        updatePosts.push(post._id); 

        user.posts = updatePosts; 
        await user.save () //after pushing the post 

        return new Response("Post created succesfully", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}