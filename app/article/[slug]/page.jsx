import { notFound } from 'next/navigation';
import { serverInstance } from '@/services/axiosInstance';
import ArticleClient from '@/components/article/ArticleDetail';

const SITE_URL = 'https://www.gatewayabroadeducations.com';

export const revalidate = 3600;

// export async function generateStaticParams() {
//   try {
//     const res = await fetch(`${API_BASE}/blog?all=true`);
//     const data = await res.json();
//     const blogs = data?.data?.blogs || [];
//     return blogs
//       .filter(b => typeof b?.Slug === 'string' && b.status === true)
//       .map(b => ({ slug: b.Slug }));
//   } catch (error) {
//     console.warn('generateStaticParams failed:', error);
//     return [];
//   }
// }

export async function generateMetadata({ params }) {
    const { slug } = await params;
    try {
        const res = await serverInstance.get(`/web/blog/${slug}`, {
            next: { revalidate: 3600 },
        });
        const article = res.data?.data;
        const title = article.title.trim() || 'Blog - Gateway Abroad | Study Abroad Tips & Updates';
        const description =
            article.description?.trim() ||
            (article.description
                ? `${article.description.replace(/<[^>]*>/g, '').substring(0, 160)}...`
                : 'Expert study abroad & test prep guidance from Gateway Abroad.');
        const ogImage = article.image
            ? `https://uat.gatewayabroadeducations.com/uploads/${encodeURIComponent(article.coverImage)}`
            : `${SITE_URL}/assets/img/ga-logo.svg`;

        return {
            metadataBase: new URL(SITE_URL),
            title,
            description,
            keywords: 'study abroad, IELTS, GMAT, GRE, TOEFL, PTE, SAT, Gateway Abroad ,blog',
            openGraph: {
                title,
                description,
                images: [ogImage],
                type: 'article',
            },
            robots: {
                index: true,
                follow: true,
            },
        };
    } catch (error) {
        return {
            title: 'Article Post | Gateway Abroad',
            description: 'Get expert advice on IELTS, GMAT, GRE, study abroad, and more.',
            keywords: 'study abroad, IELTS, GMAT, GRE, TOEFL, PTE, SAT, Gateway Abroad',
            robots: {
                index: true,
                follow: true,
            },
        };
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;

    const articleRes = await serverInstance.get(`/web/blog/${slug}`, {
        next: { revalidate: 3600 },
    });
    // const similarArticles = await serverInstance.get(`/web/blog?category=${articleRes?.data?.data?.category._id}&limit=10`, {
    //     next: { revalidate: 21600 },
    // }); 
    // console.log(similarArticles.data)
    // const latestArticles = await serverInstance.get(`/web/blog?limit=10`, {
    //     next: { revalidate: 21600 },
    // });

    const article = articleRes?.data?.data

    return (
        <ArticleClient
            article={article}
            similarArticles={[]}
            latestArticles={[]}
        />
    );
}