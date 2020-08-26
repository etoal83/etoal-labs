import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
});

export const fetchBlogPosts = async () => {
  const entries = await client.getEntries({ content_type: 'blogPost' });
  return entries.items;
};

export default { fetchBlogPosts };
