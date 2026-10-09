import { MetadataRoute } from 'next';
import { initialProducts } from '@/data/products';
import { blogPosts } from '@/data/blog';
import { solutionsData } from '@/data/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://muganwatech.rw';

  // Static routes
  const routes = [
    '',
    '/products',
    '/kit-builder',
    '/services',
    '/solutions',
    '/quote',
    '/cart',
    '/track-order',
    '/blog',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic products
  const productRoutes = initialProducts.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Dynamic blogs
  const blogRoutes = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic solutions
  const solutionRoutes = solutionsData.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...routes, ...productRoutes, ...blogRoutes, ...solutionRoutes];
}
