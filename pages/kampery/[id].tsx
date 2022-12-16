import Layout from '../../components/layouts/Layout/Layout';

export default function Post() {
  return (
    <Layout title="test" description="test">
      <h1>Test</h1>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
}

export async function getStaticProps() {
  // Fetch necessary data for the blog post using params.id
}
