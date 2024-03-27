import conf from "../conf/conf";
import {Client, ID,Databases,Storage,Query} from "appwrite"

class Service{
    client = new Client();
    databases;
    bucket;//storage

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases= new Databases(this.client);
        this.bucket=new Storage(this.client);
    }
    async createPost({title,slug,content,featuredImage,
    status, userId})
    {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service:: createPost :: error",error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,
        status})
        {
            try {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status   
                    }
                )
            } catch (error) {
                console.log("Appwrite service:: updatePost :: error",error);
            }
        }
    async deletPost(slug)
    {
                try {
                     await this.databases.deleteDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        slug
                        
                    )
                    return true;
                } catch (error) {
                    console.log("Appwrite service:: deletePost :: error",error);
                    return false;
                }
    }
     async getSinglePost(slug)
    {
                try {
                    return await this.databases.getDocument(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        slug
                        
                    )
                    
                } catch (error) {
                    console.log("Appwrite service:: getsinglePost :: error",error);
                    return false;
                }
    }
    //in appwrite if we are using queries then it should applicable on the indexes only
    //so we have to make indexes based on attributes so that we can perform query on that index 
    async getPosts(queries=[Query.equal("status","active")]) //here queries is default paramter
    {
                try {
                    return await this.databases.listDocuments(
                        conf.appwriteDatabaseId,
                        conf.appwriteCollectionId,
                        queries
                        //also write as if didn't pass as a default value above
                        // [
                        //     [Query.equal("status","active")]
                        // ]
                        
                    )
                    
                } catch (error) {
                    console.log("Appwrite service:: getPosts :: error",error);
                    return false;
                }
    }

    //file upload service**********************
    async uploadFile(file)
    {
                try {
                    //this will return the id of file which is uploaded
                    return await this.bucket.createFile(
                        conf.appwriteBucketId,
                        ID.unique(),
                        file
                    )
                    
                } catch (error) {
                    console.log("Appwrite service:: uploadFile :: error",error);
                    return false;
                }
    }

    async deleteFile(fileId)
    {
                try {
                    console.log(fileId)
                     await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                    )
                    return true;
                } catch (error) {
                    console.log("Appwrite service:: deleteFile :: error",error);
                    return false;
                }
    }
    
    getFilePreview(fileId)
    {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const service = new Service();
export default service