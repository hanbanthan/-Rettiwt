import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePosts = ( ) => {
    const url = `/api/posts`;

    const {
        data, 
        error, 
        isLoading, 
        mutate 
    } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default usePosts;
