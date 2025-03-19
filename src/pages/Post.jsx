import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/config_database";
import bucketService from "../appwrite/config_bucket";
import { Container, Button } from "../components";
import parse from "html-react-parser";

function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = userData && post ? userData.$id === post.userId : false;

  useEffect(() => {
    if (!slug) return navigate("/");

    const fetchPost = async () => {
      const postData = await databaseService.getPost(slug);
      if (!postData) return navigate("/");
      setPost(postData);
      if (postData.featuredImage) {
        const imageData = await bucketService.getFilePreview(postData.featuredImage);
        if (imageData) setImageUrl(imageData.href);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;
    const status = await databaseService.deletePost(post.$id);
    if (status) {
      await bucketService.deleteFile(post.featuredImage);
      navigate("/");
    }
  };

  if (!post) return null;

  return (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          {imageUrl && <img src={imageUrl} alt={post.title} className="rounded-xl" />}
          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  );
}

export default Post;
