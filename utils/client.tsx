import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'bp61kayz',
  dataset: 'production',
  apiVersion: '2022-09-13',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
