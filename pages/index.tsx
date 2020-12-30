import Link from "next/link";
import { getAllPosts } from "@utils/notionApiClient";
import Post from "@utils/post";

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: Post[] }) {
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
}

export default HomePage;
