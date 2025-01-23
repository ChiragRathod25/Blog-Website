import { Postcard, Container } from "../components";
import databaseService from "../appwrite/config_database";
import { useEffect, useState } from "react";
function AllPost() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    databaseService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
    console.log(posts);
  }, []);

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
