import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}


const PostReactQuery = () => {

  const { data, isLoading, isError, error } = useQuery<Post[],string>({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("http://localhost:4000/posts").then((res) => res.data);
    }
  });

  if (isLoading) {
   <h3>Page is being loaded......</h3>
  }

  if (isError) {
    <h3>{error}</h3>
  }


  return (
    <>
      <div>

        {data && data.map((post) => (
          <div className="post-details-container" key={post.id}>
            <h2 className="post-details-title">{post.title}</h2>
            <h2 className="post-details-body">{post.body}</h2>
          </div>
        ))}

      </div>
      
    </>

  )
}

export default PostReactQuery;