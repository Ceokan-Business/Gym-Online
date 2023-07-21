import { connectToDB } from '@utils/database'; 
import User from '@models/user'; 
import Post from '@models/post'; 

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