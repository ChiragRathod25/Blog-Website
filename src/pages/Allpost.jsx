import { Postcard, Container } from "../components";
import databaseService from "../appwrite/config_database";
import { useEffect, useState } from "react";

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await databaseService.getPosts([]);
        if (fetchedPosts) {
          setPosts(fetchedPosts.documents);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="py-8">
      <Container>
        <h2 className="text-2xl font-semibold mb-4">All Posts</h2>
        {posts.length > 0 ? (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
                <Postcard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
