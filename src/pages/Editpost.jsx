import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/config_database";
import { Container, Postform } from "../components";

function Editpost() {
  const [post, setPost] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) databaseService.getPost(slug).then((post) => setPost(post));
    else navigate("/");
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <Postform post={post} />
      </Container>
    </div>
  ) : null;
}
export default Editpost;
