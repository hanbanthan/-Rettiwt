import CommentItem from "./CommentItem";

interface User {
    id: string;
    name: string;
    username: string;
    profileImage?: string;
}

interface Comment {
    id: string;
    user: User;
    body: string;
    createdAt: string; // Assuming it's a timestamp
}

interface CommentFeedProps{
    comments?: Comment[];
}
const CommentFeed: React.FC<CommentFeedProps> = ({comments = []}) =>{
    return (
        <>
            {comments.map((comment)=>(
                <CommentItem key={comment.id} data={comment} />
            ))}
        </>
    );
};
export default CommentFeed;