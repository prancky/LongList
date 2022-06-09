import React, {useCallback, useMemo, useState} from 'react';
import {PostService} from '../services/posts-service';

import {Post} from '../model';
import {isEmpty} from 'lodash';

const postService = PostService.instance();

export interface PostContextData {
  posts: Post[];
  isLoadingPosts: boolean;
  getPosts: () => void;
  reRenderPosts: () => void;
  clearPostErrors: () => void;
  errorLoadPost?: Error;
  clearPosts: () => void;
  searchPosts: () => void;
}

export const postDefaultValue: PostContextData = {
  posts: [],
  isLoadingPosts: true,
  reRenderPosts: () => null,
  getPosts: () => null,
  clearPostErrors: () => null,
  clearPosts: () => null,
  searchPosts: () => null,
};

export const PostContext =
  React.createContext<PostContextData>(postDefaultValue);

export function usePostContextValue(): PostContextData {
  const [_posts, setPosts] = useState<Post[]>([]);
  const [_postsList, setPostsList] = useState<Post[]>([]);
  const [_isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [_loadError, setLoadError] = useState<Error | undefined>();

  // get Posts list
  const getPosts = useCallback(async () => {
    try {
      setIsLoadingPosts(true);
      await _fetchPosts();
      setIsLoadingPosts(false);
      clearPostErrors();
    } catch (err) {
      console.log('error', err);
      setIsLoadingPosts(false);
      setLoadError(err as Error);
    }
  }, []);

  const _fetchPosts = async () => {
    const resp = await postService.getPostsList();

    let _postsData: Post[] = resp;

    if (isEmpty(_postsData)) {
      setPosts([]);
      setPostsList([]);
    } else {
      // Duplicate them 30 times the posts list
      const deduplicateArray = Array(30).fill(_postsData).flat();

      // Update the posts list with random number
      const updatedPostsData = deduplicateArray.map((v, k) => ({
        ...v,
        id: k + 1,
        random_number: _generateNumber(9000000000, 1000000000),
      }));
      setPosts(updatedPostsData);
      setPostsList(updatedPostsData);
    }
  };

  const searchPosts = (key: string) => {
    const response = _postsList.filter(obj => {
      return JSON.stringify(obj.body).toLowerCase().includes(key.toLowerCase());
    });

    if (isEmpty(response)) {
      setPosts([]);
    } else {
      setPosts(response);
    }
  };

  // generating a random number
  const _generateNumber = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const reRenderPosts = () => {
    const response = _posts.map(v => ({
      ...v,
      random_number: _generateNumber(9000000000, 1000000000),
    }));

    if (isEmpty(response)) {
      setPosts([]);
    } else {
      setPosts(response);
    }
  };

  const clearPostErrors = useCallback(() => {
    if (_loadError) {
      setLoadError(undefined);
    }
  }, [_loadError]);

  const clearPosts = useCallback(() => {
    setPosts([]);
  }, []);

  return useMemo(
    () => ({
      posts: _posts,
      isLoadingPosts: _isLoadingPosts,
      getPosts,
      errorLoadPost: _loadError,
      clearPostErrors,
      clearPosts,
      reRenderPosts,
      searchPosts,
    }),
    [_posts, _loadError, _isLoadingPosts],
  );
}
