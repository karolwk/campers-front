import { render, screen } from '@testing-library/react';
import BlogCard from './BlogCard';
import '@testing-library/jest-dom';

describe('BlogCard', () => {
  const props = {
    title: 'Test Blog Title',
    imageUrl: '/test-image.png',
    timestamp: 163031640, // September 2021
    readTime: '5 min read',
    pageUrl: 'test-blog-url',
  };

  it('renders blog title, thumbnail image, date and read time', () => {
    render(<BlogCard {...props} />);

    const blogTitle = screen.getByText('Test Blog Title');
    const thumbnailImage = screen.getByAltText('Blog thumbnail link to post');
    const date = screen.getByText('2 marca 1975');
    const readTime = screen.getByText('5 min read');

    expect(blogTitle).toBeInTheDocument();
    expect(thumbnailImage).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(readTime).toBeInTheDocument();
  });

  it('renders thumbnail image with correct source', () => {
    render(<BlogCard {...props} />);

    screen.getByAltText('Blog thumbnail link to post');
  });

  it('renders correct link to blog post', () => {
    render(<BlogCard {...props} />);

    const link = screen.getByRole('link', { name: 'Test Blog Title' });

    expect(link).toHaveAttribute('href', '/blog/test-blog-url');
  });
});
