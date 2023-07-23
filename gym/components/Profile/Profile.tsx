import PostCard from '@components/Posts/PostCard';
import GradesList from './GradesList';
import DeveloperProfile from './DeveloperProfile';

import { GRADES } from '@global/constants';

import { MembershipInterface } from '@interfaces/MembershipInterface';
import { PostInterface } from '@interfaces/PostInterface';
import { PopulatedUserInterface} from '@interfaces/UsetInterface';

interface Props { 
    user: PopulatedUserInterface, 
    setUser: React.Dispatch<React.SetStateAction<PopulatedUserInterface>> 
    membership?: MembershipInterface | null,  
}

interface PostProps { 
  posts: PostInterface [], 
  deletePost: (postid: string, index: number) => void
}

const PostsInProfile = ({ posts, deletePost }: PostProps) => { 
  return ( 
    <section className = 'my-8 mx-4'>
      { posts.length > 0 && 
        <>
          <p className = 'text-xl my-2 font-semibold'> Postari: </p>
          { posts.map( (post, index) => { 
            return ( 
              <PostCard 
                post = { post }
                adminGrade = { true }
                index = { index }
                deletePost = { deletePost }
              /> 
            )
          })} 
        </>
      }
      { posts.length  == 0 &&
          <p className = 'text-xl my-2 font-semibold' > Nu sunt postari de vazut.</p>
      }
    </section>
  )
}

const Profile = ({ user, setUser, membership}: Props ) => {
  const deletePost = async(postid: string, index: number) => { 
    const response = await fetch(`/api/posts/${postid}`, { 
        method: "DELETE", 
        mode: "cors", 
        body: JSON.stringify({ userid: user._id, index}), 
        headers: { 
            "Content-Type": "application/json"
        }
    }); 

    let postsUpdate = []; 
    const POSTS = user.posts === undefined ? [] : user.posts; //typescript check 

    for(let i = 0; i < POSTS.length; i++) { 
        if(i != index) { 
            postsUpdate.push(POSTS[i]); //remove the post from frontend
        }
    }

    setUser({ ...user, posts: postsUpdate}); 

    if (response.ok) { 
        return;
    }
}

  return (
    <section>
        <header className = 'mx-4 my-2 bg-light-yellow p-2 shadow-md'>
            <h1 className = 'text-xl'> { user.username } </h1>

            <GradesList grades = { user.grades } /> 
        </header>

        { user.grades.includes(GRADES[1]) && membership != null &&
          <article className = 'bg-light-blue mx-4 my-8 p-2 shadow-md'> {/* detalii abonament */}
            <h2> Detalii abonament: </h2>
            <p> { membership.title } </p>
            <p> { membership.price } </p>

            <p> { user.membership.doneSessions } / { membership.availableSessions } </p>
          </article>
        }

        {/* Only for high grades */}
        <DeveloperProfile user = { user } setUser = { setUser } /> 

        { (user.grades.includes(GRADES[3]) || user.grades.includes(GRADES[4])) &&
          <PostsInProfile posts = { user.posts } deletePost = { deletePost } /> 
        }
    </section>
  )
}

export default Profile