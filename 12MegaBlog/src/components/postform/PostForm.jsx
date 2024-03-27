import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from "../index"

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import  appwriteService  from '../../appwrite/config'

function PostForm({post}) {
    const navigate=useNavigate()
    const {register,handleSubmit,watch,setValue,control,getValues}= useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.$id||"",
            content:post?.content||'',
            status:post?.status||'active'
            

        }
    })
    const userData= useSelector((state)=>state.auth.userData)
    const submit = async (data)=>{
        console.log(data);
        if(post)
        {
           console.log(post);
           console.log(data.image[0]);
           const file2= await appwriteService.uploadFile(data.image[0])
           console.log(file2.$id);
           if(file2)
           {
            console.log(post.featuredImage);
             appwriteService.deleteFile(post.featuredImage)
           }

           const dbPost = await appwriteService.updatePost(
            post.$id,{
                ...data,
                featuredImage:file2? file2.$id:undefined
            }
           )
           if(dbPost)
           {
            console.log(dbPost);
            navigate(`/post/${dbPost.$id}`)
           }
           
        }
        else{
            const file= await appwriteService.uploadFile(data.image[0])
            console.log(file.$id);
            if(file)
            {        
                data.featuredImage=file.$id;
                const dbPost =await appwriteService.createPost({
                    ...data,
                    userId:userData.$id
                })
                if(dbPost)
                {
                    console.log(dbPost);
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    //Do research/Read on it ..
    const slugTransform =useCallback((value)=>{
        if(value && typeof value ==="string")
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

        return ''
    },[])
     
    //to optimize/memorymangement in use effect we store the function in variable and then in return  make it unsubscribe()
    useEffect(()=>{
        const subscription = watch((value,name)=>{
            if(name==='title')
            setValue("slug",slugTransform(value.title),
        {shouldValidate:true})
        
        });
        return()=>{
            subscription.unsubscribe()
        }
    },[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            name="title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            name="slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={ (e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="content" control={control} defaultvalue={getValues("content")}/>
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image:"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>
  )
}

export default PostForm