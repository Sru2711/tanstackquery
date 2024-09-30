import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"

interface Post {
  id: number;
  title: string;
  body: string; 
}


const PostsDetails = () => {
  // <{ postId: string }>
  const {id} = useParams<string>();
  console.log("postId",id)
   const fetchData= async(id:string):Promise<Post> => {
    const returnedData= await axios.get(`http://localhost:4000/posts/${id}`).
    then(res => {
      return res.data
    }) .catch(err => {
      return err.data
    })
    return returnedData
   } 
   const { data, isLoading } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => fetchData(id as string),
    enabled: !!id, 
  });
   console.log("data",data)

   if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {data ? (
        <div className="post-details-container">
          <h2>{data.id} --</h2>
          <h2 className="post-details-title">{data.title}</h2>
          <p className="post-details-body">{data.body}</p>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default PostsDetails