import { useEffect, useState } from "react";
import databaseService from "../appwrite/config_database";
import { Container, Postcard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await databaseService.getPosts([]);
        if (response) {
          setPosts(response.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center mt-10">
            <h1 className="text-2xl font-bold text-gray-700">
              Login to read posts
            </h1>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <Postcard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
