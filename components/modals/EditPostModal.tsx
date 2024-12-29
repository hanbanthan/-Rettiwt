
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../../components/ImageUpload";
import useEditPostModal from "@/hooks/useEditPostModal";


const EditPostModal = () => {
    const { mutate: mutatePosts } = usePosts();

    const editPostModal = useEditPostModal();

    const [image, setImage] = useState('');
    const [body, setBody ] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback( async () => {
        try{
            setIsLoading(true);

            await axios.patch(`/api/posts/${editPostModal.postId}`,{
                body,
                image
            });

            mutatePosts();

            toast.success('Post updated successfully');

            editPostModal.onClose();

        } catch (error){
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    },[body, image, editPostModal]);

   const bodyContent = (
    <div className="flex flex-col gap-4">
        <ImageUpload 
            value={image}
            disabled={isLoading}
            onChange={(image)=>setImage(image)}
            label="Upload image"
        />

        <Input 
            placeholder="What do you think?"
            onChange={(e)=>setBody(e.target.value)}
            value={body}
            disabled={isLoading}
        />

    </div>
   )
  return (
    <Modal 
        disabled={isLoading}
        isOpen={editPostModal.isOpen}
        title="Edit your post"
        actionLabel="Edit"
        onClose={editPostModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />
  )
}

export default EditPostModal;