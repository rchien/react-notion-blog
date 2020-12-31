import notionConfig from "@/configs/notionConfig";
import Post from "@/types/post";

const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || notionConfig.tableUuid;
const NOTION_TABLE_URI = `${notionConfig.hostName}/v1/table/${NOTION_BLOG_ID}`;

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(NOTION_TABLE_URI).then((res) => res.json());
};

export const getPostById = async (id: string): Promise<Post[]> => {
  const postUri = `${notionConfig.hostName}/v1/page/${id}`;
  return await fetch(postUri).then((res) => res.json());
} 