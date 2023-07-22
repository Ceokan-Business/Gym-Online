import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 
import Post from '@models/post'; 

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 

        const post = await Post.findOne({ _id: params.postid }); 

        if(!post) { 
            return new Response("Cannot find the post", { status: 404 }); 
        }

        return new Response(JSON.stringify(post), { status: 200 }); 
    } catch(err) { 
        console.log(err);
        return new Response(err, { status: 500 }); 
    }
} 

export const DELETE = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const { userid, index } = await req.json(); 

        const postid = params.postid; 
        let user = await User.findOne( { _id: userid }); 

        let postsUpdate = []; 
        for(let i = 0; i < user.posts.length; i++) { 
            if(i != index) { 
                postsUpdate.push(user.posts[i]) //remove the unwanted post 
            }
        }; 

        user.posts = postsUpdate; //replace posts array
        await user.save(); 

        await Post.findOneAndDelete({ _id: postid }); // delete the post from its collection 

        return new Response("Post deleted", { status: 200 });
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}

export const PATCH = async(req, { params }) => { 
    try { 
        await connectToDB();    
        const { title, description } = await req.json(); 

        let post = await Post.findOne({ _id: params.postid }); 

        post.title = title; 
        post.description = description; 

        await post.save (); 
        return new Response("Post updated", { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}