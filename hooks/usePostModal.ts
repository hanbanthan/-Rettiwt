import { create } from 'zustand';

interface PostModalStore {
    isOpen: boolean;
    isComment: boolean;
    postId?: string;
    onOpen: (isComment?: boolean, postId?: string) => void;
    onClose: () => void;
};

const usePostModal = create <PostModalStore>((set) => ({
    isOpen: false,
    isComment: false,
    postId: undefined,
    onOpen: (isComment =false, postId= undefined) => set({isOpen: true, isComment, postId}),
    onClose: () => set({isOpen: false, isComment:false, postId:undefined})
}));

export default usePostModal;