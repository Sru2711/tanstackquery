import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useMutation, QueryClient, useQueryClient } from 'react-query';
import { Button, Input } from 'reactstrap';

interface Post {

  title: string,
  body: string
}

const PostRQ = () => {

  const [post, setPost] = useState<Post>({ title: '', body: '' });
  const queryClient = useQueryClient()
  const addPost = (post: Post) => {
    let toaddPost = axios.post("http://localhost:4000/posts", post)
      .then(res => { return res.data })
      .catch(err => { return err.data })

    return toaddPost
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: addPost,
    onMutate: async (newPost: Post) => {

      await queryClient.cancelQueries(["posts"]);

     


      queryClient.setQueryData<Post[]>(["posts"], (oldPosts: Post[] | undefined) => {
        return oldPosts ? [...oldPosts, { ...newPost, id: String(oldPosts.length + 1) }] : [newPost];
      });


      
    },
    
  });

  const handleSubmit = (post: Post) => {
    mutate(post)
  };
  return (
    <div>
      <Input className="m-2 w-25" placeholder='title' name="title" value={post.title} onChange={handleChange}></Input>
      <Input className="m-2 w-25" placeholder='body' name="body" value={post.body} onChange={handleChange}></Input>
      <Button onClick={() => handleSubmit(post)}>Post</Button>

    </div>
  )
}

export default PostRQ