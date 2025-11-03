import { notFound } from 'next/navigation';
import { serverInstance } from '@/services/axiosInstance';
import ArticleClient from '@/components/article/ArticleDetail';

const SITE_URL = 'https://www.gatewayabroadeducations.com';

export const revalidate = 21600;

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
            next: { revalidate: 21600 },
        });

        const article = res.data?.data;

        if (res.data?.success == false) {
            return {
                title: 'Article Not Found | Gateway Abroad',
                robots: { index: false, follow: false },
            };
        }
        const title = article.title.trim() || 'Gateway Abroad Blog';
        const description =
            article.description?.trim() ||
            (article.description
                ? `${article.description.replace(/<[^>]*>/g, '').substring(0, 160)}...`
                : 'Expert study abroad & test prep guidance from Gateway Abroad.');
        const ogImage = article.image
            ? `https://uat.gatewayabroadeducations.com/uploads/${encodeURIComponent(article.coverImage)}`
            : `${SITE_URL}/assets/img/ga-logo.svg`;

        return {
            title,
            description,
            metadataBase: new URL(SITE_URL),
            openGraph: {
                title,
                description,
                url: `${SITE_URL}/article/${slug}`,
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: article.title || 'Gateway Abroad Blog',
                    },
                ],
                type: 'article',
                siteName: 'Gateway Abroad Education',
            },
            twitter: {
                card: 'summary_large_image',
                title,
                description,
                images: [ogImage],
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

    try {
        const articleRes = await serverInstance.get(`/web/blog/${slug}`, {
            next: { revalidate: 21600 },
        });
        // const similarArticles = await serverInstance.get(`/web/blog?category=${articleRes?.data?.data?.category._id}&limit=10`, {
        //     next: { revalidate: 21600 },
        // }); 
        // console.log(similarArticles.data)
        // const latestArticles = await serverInstance.get(`/web/blog?limit=10`, {
        //     next: { revalidate: 21600 },
        // });


        if (articleRes.status !== 200) return notFound();
        const article = articleRes?.data?.data

        return (
            <ArticleClient
                article={article}
                similarArticles={[]}
                latestArticles={[]}
            />
        );
    } catch (error) {
        console.error('Blog page error:', error);
        return notFound();
    }
}