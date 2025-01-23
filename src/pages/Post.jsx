import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import databaseService from "../appwrite/config_database";
import { useSelector } from "react-redux";
import bucketService from "../appwrite/config_bucket";
import { Container, Button } from "../components";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData && post ? userData.$id === post.userId : false;
  const [imageUrl, setImageUrl] = useState("");

 
useEffect(()=>{
  
  const getFeaturedImage = async () => {
    if (post) {
      console.log(post.featuredImage);
      const imageData = await bucketService.getFilePreview(post.featuredImage);
      console.log("Image data", imageData);
      setImageUrl(imageData.href);
    }
  };
  getFeaturedImage();
},[imageUrl])

  useEffect(() => {
    if (slug) {
      databaseService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
          setImageUrl(post.featuredImage)
         
        } else navigate("/");
      });
    } else navigate("/");
  },[]);

  const deletePost = () => {
    databaseService.deletePost(post?.$id).then((status) => {
      if (status) {
        bucketService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img src={imageUrl} alt={post.title} className="rounded-xl" />
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
export default Post;
