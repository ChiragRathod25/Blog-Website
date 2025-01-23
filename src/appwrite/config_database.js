/* eslint-disable no-empty */
import config from "../conf/config";
import { Client, Databases, Query } from "appwrite";

export class DatabaseServices {
  client = new Client();
  database;
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }
  async createPost({
    title,
    content,
    slug,
    status = "active",
    featuredImage,
    userId,
  }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Database serive :: createPost :: error", error);
    }
  }
  async updatePost(slug, { title, content, status, featuredImage }) {
    try {
      return this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("Appwrite Database serive :: updatePost :: error", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Database serive :: deletePost :: error", error);
      return false;
    }
  }
  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Databse serive :: getPost :: error", error);
      return false;
    }
  }
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite Database serive :: getPosts :: error", error);
      return false;
    }
  }
}

const databaseService = new DatabaseServices();
export default databaseService;
