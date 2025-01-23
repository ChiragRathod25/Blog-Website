import { useEffect, useState } from "react";
import databaseService from "../appwrite/config_database";
import { Container, Postcard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    databaseService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
    console.log(posts);
  }, []);

  console.log("It's my home", posts.length);

  if (posts.length === 0) {
    console.log("Yes it is empty");

    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
          {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
          </div>
        </Container>
      </div>
    );
}
export default Home;
