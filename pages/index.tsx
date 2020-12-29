import Link from "next/link";

const NOTION_BLOG_ID =
  process.env.NOTION_BLOG_ID || "0195a198bccb407fbd43505acc70b845";

export type Post = { id: string; slug: string; title: string; date: string };

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion-cloudflare-worker.rchien.workers.dev/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

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
      <a href="" className="text-5xl text-red-100">some anchor</a>
      <h1>Posts</h1>
      <div>
        {(posts || []).map(post => (
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
