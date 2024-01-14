import type { NextPage } from 'next';
import Layout from '../../../components/layouts/Layout/Layout';
import { setEnt } from '../../../store/pageDataSlice';
import { wrapper } from '../../../store/store';
import { fetchPageData, getBlogCollection } from '../../../utils/db/firebase';
import { PageDataState, BlogEntry } from '../../../shared/types';
import { Container, Pagination, Divider, Box } from '@mui/material';
import { paginate, sortBlogPosts } from '../../../utils/helpers';
import Grid2 from '@mui/material/Unstable_Grid2';
import BlogCard from '../../../components/cards/BlogCard/BlogCard';
import { useRouter } from 'next/router';

interface BlogProps {
  posts: BlogEntry[];
  page: number;
  totalPages: number;
}

const Blog: NextPage<BlogProps> = ({ posts, page, totalPages }) => {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    router.push(value.toString());
  };

  return (
    <Layout
      pageTitle="Blog"
      pageSubtitle="Nasz blog to nie tylko informacje o wynajmie kamperów, ale również ciekawostki związane z turystyką, najnowsze trendy i technologie związane z kamperami oraz wiele innych inspiracji dla miłośników podróży. Dołącz do naszej społeczności i poznaj świat w kamperze!"
      metaTitle={`Kampery na wynajem Kraków - Blog - Strona ${page}`}
      metaDescription="Nie wiesz, którą trasę wybrać? Na naszym blogu znajdziesz wiele propozycji na wycieczki zarówno po Polsce, jak i za granicą. Kamperynawynajem.pl to nie tylko wynajem kamperów, ale również prawdziwe centrum wiedzy dla podróżników."
    >
      <Container component="section">
        <Grid2 container spacing={2} marginY="2rem">
          {posts.map((post) => (
            <Grid2 key={post.created_on.seconds} xs={12} sm={6} md={4}>
              <BlogCard
                title={post.name}
                imageUrl={post.headerImage}
                timestamp={post.created_on.seconds}
                readTime={post.readTime}
                pageUrl={post.urlSlug}
              />
            </Grid2>
          ))}
        </Grid2>
        {totalPages > 1 && (
          <>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
                marginY: '1.5rem',
              }}
            >
              <Pagination
                page={page}
                count={totalPages}
                onChange={handleChange}
              />
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const posts = await getBlogCollection();
  const totalPosts = posts.length;
  // Number of post in per page
  const perPagePosts = 16;
  const numberOfPages = Math.ceil(totalPosts / perPagePosts);

  const paths = Array.from({ length: numberOfPages }, (_, i) => {
    return { params: { page: `${i + 1}` } };
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

      // get Blog data
      const posts = await getBlogCollection();

      // get only 12 post for specified page, sorted by date from newest
      const paginatedPost = paginate(
        sortBlogPosts(posts),
        12,
        parseInt((params?.page as string) || '1', 10)
      );

      // Show 404 if no posts
      if (posts.length == 0) {
        return {
          notFound: true,
        };
      }

      return {
        props: {
          posts: paginatedPost,
          page: parseInt(params?.page as string),
          totalPages: Math.ceil(posts.length / 12),
        },
      };
    }
);

export default Blog;
