import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import PostRQ from './PostRQ';

interface Post {
  id: number;
  title: string;
  body: string; 
}


const PostReactQuery = () => {
const [dataquery,setDataquery]=useState(false)
  const { data, isLoading, isError, error,refetch } = useQuery<Post[] ,string>({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts").then((res):Post[] => res.data);
    },
   
  });

  if (isLoading) {
   <h3><div>Loading...</div></h3>
  }

  if (isError) {
    <h3>{error}</h3>
  }

  return (
    <>
      <div>
        
        <Button onClick={()=> {refetch();setDataquery(true)}}>Fetch</Button>
        
       <PostRQ/>
        {data && data.map((post) => (
          <>
         
          <Link to={`/PostQueryDetails/${post.id}`}>
          <div className="post-details-container" key={post.id}>
            <h2>{post.id}--</h2><h2 className="post-details-title">{post.title}</h2>
            <h2 className="post-details-body">{post.body}</h2>
            </div>
            </Link>
          </>
         
        ))}

      </div>
      
    </>

  )
}

export default PostReactQuery;