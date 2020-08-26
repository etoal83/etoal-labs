import { fetchBlogPosts } from '../../lib/contentful/api.js';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';

const BlogPostsPage = ({ posts }) => {
  return (
    <>
      <BlogPosts posts={posts} />
    </>
  );
};

const BlogPosts = ({ posts }) => {
  console.log(posts);

  return (
    <div>
      <h1>Blogs</h1>
      {posts.map((p) => (
        <BlogCard title={p.title} body={p.body} />
      ))}
    </div>
  );
};

const BlogCard = ({ title, body }) => (
  <div>
    <h2>{title}</h2>
    <div>{body}</div>
  </div>
);

export const getStaticProps = async () => {
  const items = await fetchBlogPosts();
  const posts = await items.map((item) => {
    return item.fields;
  });

  return {
    props: {
      posts: posts,
    },
  };
};

export default BlogPostsPage;
