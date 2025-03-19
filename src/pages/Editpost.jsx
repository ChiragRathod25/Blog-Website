import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/config_database";
import { Container, Postform } from "../components";

function Editpost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        const fetchedPost = await databaseService.getPost(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          navigate("/not-found"); // Redirect if post doesn't exist
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  return post ? (
    <div className="py-8">
      <Container>
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <Postform post={post} />
      </Container>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-500">Post not found.</p>
    </div>
  );
}

export default Editpost;
