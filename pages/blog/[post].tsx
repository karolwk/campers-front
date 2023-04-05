import Layout from '../../components/layouts/Layout/Layout';
import type { NextPage } from 'next';
import { setEnt } from '../../store/pageDataSlice';
import { GetStaticPaths } from 'next';
import { wrapper } from '../../store/store';
import {
  fetchPageData,
  getBlogCollection,
  getPost,
} from '../../utils/db/firebase';
import { PageDataState, BlogEntry } from '../../shared/types';
import { formatPathtoGCS } from '../../utils/helpers';
import {
  Container,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Divider,
} from '@mui/material';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
import ShareIcons from '../../components/ui/ShareIcons/ShareIcons';
import NextLink from 'next/link';
import { makeDateFromTimeStamp } from '../../utils/helpers';

type PostProps = {
  post: BlogEntry;
};

const Post: NextPage<PostProps> = ({ post }) => {
  return (
    <Layout metaTitle={post.name} metaDescription={post.metaDescription}>
      <Container
        component="article"
        sx={{ padding: '1rem', fontSize: '1.2rem' }}
        maxWidth="md"
      >
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginY: '1.4rem' }}>
          <NextLink href="/" passHref>
            <Link underline="hover" color="inherit">
              Strona główna
            </Link>
          </NextLink>
          <NextLink href="/blog/strona/1" passHref>
            <Link underline="hover" color="inherit">
              Blog
            </Link>
          </NextLink>
          <Typography color="text.primary">Artykuł</Typography>
        </Breadcrumbs>
        <Typography variant="h1" marginBottom="2rem" fontWeight={600}>
          {post.name}
        </Typography>
        <Box
          sx={{ minHeight: { xs: '250px', md: '400px' }, position: 'relative' }}
        >
          <Image
            alt="Article header image"
            objectPosition="center"
            objectFit="cover"
            priority
            src={formatPathtoGCS(post.headerImage)}
            layout="fill"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            fontSize: '1rem',
          }}
        >
          <Typography fontSize="inherit">
            {makeDateFromTimeStamp(post.created_on.seconds)}
          </Typography>
          <Typography fontSize="inherit">{post.readTime}</Typography>
        </Box>

        {post.content.map((block, i) => {
          switch (block.type) {
            case 'header':
              return (
                <Typography variant="h2" fontWeight={600} key={i}>
                  {block.value}
                </Typography>
              );
            case 'text':
              return <ReactMarkdown key={i}>{block.value}</ReactMarkdown>;
            case 'images':
              return (
                <Box
                  key={i}
                  sx={{
                    position: 'relative',
                    minHeight: { xs: '250px', md: '350px' },
                    overflow: 'hidden',
                    marginY: '2rem',
                  }}
                >
                  <Image
                    alt="Section image"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    src={formatPathtoGCS(block.value)}
                  />
                </Box>
              );
            default:
              return null;
          }
        })}
        <Divider />

        <Box marginY="1rem">
          <Typography marginBottom="1rem">Udostępnij:</Typography>
          <ShareIcons
            url={'https://kamperynawynajem.pl/blog/' + post.urlSlug}
            text={post.metaTitle}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getBlogCollection();
  const paths = posts.map((blogPost) => {
    return { params: { post: blogPost.urlSlug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      // propagating redux store with page settings data
      const docSnap = await fetchPageData();
      store.dispatch(setEnt(docSnap.data() as PageDataState));

      //get Blog data
      const post = await getPost(params?.post as string);

      // Show 404 if no posts
      if (!post) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          post,
        },
      };
    }
);
export default Post;
