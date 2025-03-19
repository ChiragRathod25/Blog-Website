import { Container, Postform } from "../components";

function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <h2 className="text-2xl font-semibold mb-4">Create a New Post</h2>
        <Postform />
      </Container>
    </div>
  );
}

export default AddPost;
