import config from "../conf/config";
import { Client,Storage,ID } from "appwrite";
export class BucketServices{
    client=new Client()
    bucket
    constructor(){
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
        this.bucket=new Storage(this.client)
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(config.appwriteBucketId,ID.unique(),file)
        } catch (error) {
            console.log("Appwrite Bucket serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appwriteCollectionId,fileId)
            return true
        } catch (error) {
            console.log("Appwrite Bucket serive :: deleteFile :: error", error);
            console.error(error)
            return false
        }
    }
    async getFilePreview(fileId){
        if (!fileId) {
            console.error("Appwrite getFilePreview service :: fileId is required");
            return null; 
        }
    
        try {   
            // const url=`https://cloud.appwrite.io/v1/storage/buckets/${config.appwriteBucketId}/files/${fileId}/preview?project=${config.appwriteProjectId}`

            return  this.bucket.getFilePreview(config.appwriteBucketId,fileId);
 
        } catch (error) {
            console.log("Appwrite getFilePreview serive :: getFilePreview :: error", error);
            return false
        }
    }

}

const bucketService=new BucketServices()

export default bucketService