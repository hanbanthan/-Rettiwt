import usePosts from "../../hooks/usePosts";
import PostItem from "./PostItem";

interface User {
    id: string;
    name: string;
    username: string;
    profileImage?: string;
}

interface Post {
    id: string;
    userId: string;
    user: User;
    body: string;
    image?: string;
    createdAt: string;
}

interface PostFeedProps{
    userId?: string;
}


const PostFeed: React.FC<PostFeedProps> = ({userId}) => {
    const {data: posts = []} = usePosts(userId);

    return (
        <>
            {posts.map((post: Post)=>(
                <PostItem
                    userId={userId}
                    key={post.id}
                    data={post}
                    
                />
            ))}
        </>
    );
};
export default PostFeed;