import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
});

const fetchBlogPosts = async () => {};
