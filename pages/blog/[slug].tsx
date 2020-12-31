import { FunctionComponent } from 'react'
import { useRouter } from "next/router";
import { NotionRenderer, BlockMapType } from "react-notion";
import { getAllPosts, getPostById } from "@/utils/notionApiClient";
import Post from "@/types/post";

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  if (!params.slug) {
    return { notFound: true };
  }

  const slugMap = new Map(((await getAllPosts()).filter(p => p.publish === true)).map((p) => [p.slug, p]));

  // Find the current blogpost by slug
  var post = slugMap.get(params.slug);
  if (post?.id === undefined) {
    return { notFound: true };
  }

  const blocks = await getPostById(post.id);

  return {
    props: {
      post: post,
      blocks: blocks,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  const paths = posts
    .filter((fp) => fp.publish === true)
    .map((mp) => ({
      params: { slug: mp.slug },
    }));

  return {
    paths: paths,
    fallback: true,
  };
}

type Props = {
  post: Post,
  blocks: BlockMapType
}

const BlogPost: FunctionComponent<Props> = ({ post, blocks }: Props) => {
  const { isFallback } = useRouter();
  console.log(`isFallback - ${isFallback}`);

  if (!isFallback && !post) {
    return (<h1>404</h1>)
  }

  return (
    <div className="content">
      <p>{isFallback ? "generating on-demand" : "statically generated"} </p>
      {isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{post.title}</h1>
          <NotionRenderer blockMap={blocks} />
        </div>
      )}
    </div>
  );
};

export default BlogPost;
