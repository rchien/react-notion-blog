import Link from "next/link";
import { getAllPublicPosts } from "@/utils/notionApiClient";
import Post from "@/types/post";
import { FunctionComponent } from "react";


export async function getStaticProps() {
  const posts = await getAllPublicPosts();
  return {
    props: {
      posts: posts,
    },
  };
}

type Props = {
  posts: Post[];
};

const HomePage: FunctionComponent<Props> = ({ posts }: Props) => {
  return (
    <div className="content">
      <a href="" className="text-5xl text-red-100">
        some anchor
      </a>
      <h1>Posts</h1>
      <div>
        {(posts || []).map((post) => (
          <Link key="{$post.id}" href="/blog/[slug]" as={`/blog/${post.slug}`}>
            <a>
              <b>{post.title}</b>
              <div className="flex justify-end">posted on {post.date}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
