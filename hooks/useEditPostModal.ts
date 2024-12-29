import {create} from 'zustand';

interface EditPostModalStore {
    isOpen: boolean;
    postId: string | null;
    onOpen: (postId: string) => void;
    onClose: () => void;

};

const useEditPostModal =  create<EditPostModalStore>((set)=>({
    isOpen: false,
    postId: null,
    onOpen: (postId: string) => set({isOpen: true, postId}),
    onClose: () => set({isOpen: false, postId: null})
}))

export default useEditPostModal;