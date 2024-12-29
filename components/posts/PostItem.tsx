import { useRouter } from "next/router";
import useLoginModal from "../../hooks/useLoginModal";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "../../hooks/useLike";
import Button from "../Button";
import useEditPostModal from "@/hooks/useEditPostModal";
import toast from "react-hot-toast";
import axios from "axios";
import usePosts from "@/hooks/usePosts";

interface PostItemProps{
    data: Record<string,any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({data={},userId}) =>{
    const router = useRouter();
    const loginModal = useLoginModal();
    const editPostModal = useEditPostModal();
    const { mutate: mutatePosts } = usePosts();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({postId: data.id, userId});

    
    const goToUser = useCallback((event: any)=>{
        event.stopPropagation();

        router.push(`/users/${data.user.id}`);
    },[router,data.user.id]);
    
    const goToPost = useCallback(()=>{
        router.push(`/posts/${data.id}`);
    },[router, data.id]);

    const onLike = useCallback((event: any)=>{
        event?.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }

        toggleLike();
    },[loginModal,currentUser,toggleLike]);

    const createdAt = useMemo(()=>{
        if(!data?.createdAt){
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt]);

    const LikeIcon = hasLiked?AiFillHeart:AiOutlineHeart;

    const onEditClick =  (event: any) => {
        event.stopPropagation();
        editPostModal.onOpen(data.id);
    }


    const onDelete = useCallback (async (event: any) =>{
        event.stopPropagation();
        try{
            await axios.delete(`/api/posts/${data.id}`);
            
            mutatePosts();

            toast.success('Post deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    },[data.id, mutatePosts]);

    return (
        <div
            onClick={goToPost}
            className="
                border-b-[1px]
                border-neutral-800
                p-5
                cursor-pointer
                hover: bg-neutral-900
                transition
            "
        >
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.user.id} />
                <div>
                    <div
                        className="
                            flex flex-row items-center gap-2
                        "
                    >
                        <p
                            onClick={goToUser}
                            className="
                                text-white
                                font-semibold
                                cursor-pointer
                                hover: underline
                            "
                        >{data.user.name}</p>
                        <span 
                            onClick={goToUser}
                            className="
                                text-neutral-500
                                cursor-pointer
                                hover:underline
                                hidden
                                md:block
                            ">
                            @{data.user.username}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                     {data.image && (
                        <div className="mt-3">
                            <img
                                src={data.image}
                                alt="Post image"
                                className="
                                    max-h-60 
                                    object-cover 
                                    rounded-md 
                                    w-full
                                "
                            />
                        </div>
                    )}
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div
                            className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-2
                                cursor-pointer
                                transition
                                hover: text-sky-500
                            "
                        >
                            <AiOutlineMessage size={20} />
                            <p>
                                {data.comment?.length||0}
                            </p>
                        </div>
                        <div
                            onClick={onLike}
                            className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-2
                                cursor-pointer
                                transition
                                hover: text-red-500
                            "
                        >
                            <LikeIcon color={hasLiked?'red':''} size={20} />
                            <p>
                                {data.likedIds.length}
                            </p>
                        </div>
                    </div>
                    {currentUser&&currentUser.id===userId&&(<Button 
                        secondary 
                        onClick={onEditClick}
                        label="Edit Post"
                    />)}
                    {currentUser&&currentUser.id===userId&&(<Button 
                        secondary
                        onClick={onDelete} 
                        label="Delete" />)}
                </div>
            </div>
        </div>
    );
}
export default PostItem;