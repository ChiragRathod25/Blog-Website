import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import bucketService from "../../appwrite/config_bucket";
import databaseService from "../../appwrite/config_database";
import { useCallback, useEffect, useState } from "react";
import { Button, Input, RTE, Select } from "../index";

function PostForm({ post }) {
  const { register, handleSubmit, getValues, setValue, control, watch } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "",
      image: post?.featuredImage,
    },
  });

  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Fetch featured image if post exists
  useEffect(() => {
    if (post) {
      const getFeaturedImage = async () => {
        try {
          const imageData = await bucketService.getFilePreview(post?.featuredImage);
          if (imageData) setImageUrl(imageData.href);
        } catch (error) {
          console.error("Error fetching featured image:", error);
        }
      };
      getFeaturedImage();
    }
  }, [post]); // Added `post` as dependency to prevent stale values

  // Handle slug transformation
  const slugTransform = useCallback((value) => {
    return value?.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-") || "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [slugTransform, watch, setValue]);

  // Form submission handler
  const submit = async (data) => {
    try {
      let file;
      const uploadedImage = data.image?.[0];

      if (uploadedImage) {
        file = await bucketService.uploadFile(uploadedImage);
        if (post?.featuredImage) {
          await bucketService.deleteFile(post.featuredImage);
        }
      }

      if (post) {
        const updatedPost = await databaseService.updatePost(post.$id, {
          ...data,
          featuredImage: file?.$id || post.featuredImage,
        });

        alert("Post updated successfully!");
        if (updatedPost) navigate(`/post/${post.$id}`);
      } else {
        const newPost = await databaseService.createPost({
          ...data,
          featuredImage: file?.$id,
          userId: userData.$id,
        });

        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        } else {
          console.error("POST CREATION FAILED");
        }
      }
    } catch (error) {
      console.error("Error in post submission:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input label="Title:" placeholder="Title" className="mb-4" {...register("title", { required: true })} />
        <Input
          label="Slug:"
          placeholder="Slug"
          className="mb-4"
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
          {...register("slug", { required: true })}
        />
        <RTE label="Content:" name="content" control={control} defaultValue={getValues("content")} />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && imageUrl && (
          <div className="w-full mb-4">
            <img src={imageUrl} alt={post.title} className="rounded-lg" />
          </div>
        )}

        <Select options={["active", "inactive"]} label="Status" className="mb-4" {...register("status", { required: true })} />

        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
