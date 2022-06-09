import React, {ReactNode} from 'react';
import {usePostContextValue, PostContext} from './posts-context';

export type PostsProviderProps = {
  children: ReactNode;
};

export const PostsProvider = (props: PostsProviderProps) => {
  const {children} = props;
  const postsContextData = usePostContextValue();

  return (
    <PostContext.Provider value={postsContextData}>
      {children}
    </PostContext.Provider>
  );
};
