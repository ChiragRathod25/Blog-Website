import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import bucketService from "../../appwrite/config_bucket";
import databaseService from "../../appwrite/config_database";
import { useCallback, useEffect, useState } from "react";
import { Button, Input, RTE, Select } from "../index";
function Postform({ post }) {
  const { register, handleSubmit, getValues, setValue, control, watch } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "",
        image: post?.featuredImage,
      },
    });

  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    // console.log(getValues("content"))
    if(post){

      const getFeaturedImage = async () => {
        const imageData = await bucketService.getFilePreview(post?.featuredImage);
        // console.log("Image data",imageData);
        if (imageData) setImageUrl(imageData.href);
      };
      getFeaturedImage();
      console.log("POST DETAILS : ",post)
    }
  },[]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);


  const submit = async (data) => {
    console.log("Going to Submit", data);
    console.log("Post data", data);

    if (post) {
      console.log("Image Details",data.image[0]);
      
      const file = data.image[0]
        ? await bucketService.uploadFile(data.image[0])
        : null;

      if (file) {
        await bucketService.deleteFile(post.featuredImage);
      }
      const updatedPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      alert("Post updated successfully !!");
      if (updatedPost) navigate(`/post/${post.$id}`);
    } else {
      console.log("here creating new post");
      console.log(data.image[0]);

      const file = await bucketService.uploadFile(data.image[0]);
      if (file) {
        try {
        
          console.log("UserData",);          
          const newPost = await databaseService.createPost({
            ...data,
            featuredImage: file ? file.$id : undefined,
            userId: userData.$id,
          });
          console.log("New POST CREATED SUCCESSFULLY !", newPost);
          if (newPost) navigate(`/post/${newPost.$id}`);
          else console.log("POST CREATION FAILED");
        } catch (error) {
          console.log("CREATE POST ERROR", error);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    //  console.log("Slug transform is called",value);
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title")
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
    });
    return () => subscription.unsubscribe();
  }, [slugTransform, watch, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title: "
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
          {...register("slug", { required: true })}
        />
        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post ? true :false  })}
        />
        {post && (
          <div className="w-full mb-4">
            <img src={imageUrl || ""} alt={post.title} className="rounded-lg" />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default Postform;
