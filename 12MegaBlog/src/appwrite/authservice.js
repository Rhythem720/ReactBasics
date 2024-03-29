import conf from "../conf/conf";
import {Client,Account, ID} from "appwrite"

class AuthService{

    client = new Client()
    account;
    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client);
        
    }
    // you can modify this method according to different services
    async createAccount({email,password,name})
    {
        try {
           const useraccount= await this.account.create(ID.unique(),email,password,name)
           if(useraccount)
           {
            //calling another method to login that user if it is successfully sign in
               return this.login({email,password})
           }
           else
           {
            return useraccount;
           }
            
        } catch (error) {
            throw error
        }
    }

    async login({email,password})
    {
        try {
            return await this.account.createEmailSession(email,password)
        } catch (error) {
           console.log("Appwrite service ::login::error",error)
        }
        return null;
    }


    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service ::getCurrentUser::error",error)
        }
        return null;
    }
    
    async logOut(){
        try {
            //delete all the sessions from the particular user 
            return  await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite service ::logout::error",error)

        }
    }
}

const authservice= new AuthService()

export default authservice