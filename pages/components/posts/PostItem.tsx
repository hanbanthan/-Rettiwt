import { useRouter } from "next/router";
import useLoginModal from "../hooks/useLoginModal";
import useCurrentUser from "../hooks/useCurrentUser";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

interface PostItemProps{
    data: Record<string,any>;
    userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({data={},userId}) =>{
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const goToUser = useCallback((event: any)=>{
        event.stopPropagation();

        router.push(`/users/${data.user.id}`);
    },[router,data.user.id]);
    
    const goToPost = useCallback(()=>{
        router.push(`/posts/${data.id}`);
    },[router, data.id]);

    const onLike = useCallback((evet: any)=>{
        event?.stopPropagation();

        loginModal.onOpen();
    },[loginModal]);

    const createdAt = useMemo(()=>{
        if(!data?.createdAt){
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    },[data?.createdAt]);
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

        </div>
    );
}
export default PostItem;