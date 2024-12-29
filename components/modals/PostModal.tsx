import useCurrentUser from "@/hooks/useCurrentUser";
import usePost from "@/hooks/usePost";
import usePostModal from "@/hooks/usePostModal";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../../components/ImageUpload";

interface PostModalProps {
    isComment?: boolean;
    postId?: string;
}
const PostModal: React.FC<PostModalProps> = ({
    isComment,
    postId
}) => {
    const { mutate: mutatePosts } = usePosts();
    const postModal = usePostModal();

    
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePost } = usePost(postId as string);

    const [image, setImage] = useState('');
    const [body, setBody] = useState('');


    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
           const url = isComment ?
                `/api/comments?postId=${postId}`
                : `/api/posts`;
           

            if(isComment) await axios.post(url, { body });
            else {
                await axios.post(url, {
                    body,
                    image,
                    postId: postId
                });
            }

            mutatePosts();      
            setBody('');
            setImage('');

            toast.success(isComment ? 'Comment Added' : 'Tweet Created');

            postModal.onClose();

        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [body, image, isComment, postModal, mutatePosts, postId]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                value={image}
                disabled={isLoading}
                onChange={(image) => setImage(image)}
                label="Upload image"
            />

            <Input
                placeholder="What do you think?"
                onChange={(e) => setBody(e.target.value)}
                value={body}
                disabled={isLoading}
            />
        </div>
    );

    useEffect(() => {
        if (postModal.isOpen) {
            if (isComment) {
                // Set the postId for comment
                setImage('');
                setBody('');
            }
        }
    }, [postModal.isOpen, isComment]);


    return (
        <Modal
            disabled={isLoading}
            isOpen={postModal.isOpen}
            title={isComment?"Reply":"Tweet your post"}
            actionLabel={isComment ? "Reply" : "Tweet"}
            onClose={postModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default PostModal;