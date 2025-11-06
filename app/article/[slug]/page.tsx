import { serverInstance } from '@/services/axiosInstance';
import ArticleClient from '@/components/article/ArticleDetail';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    try {
        const res = await serverInstance.get(`/web/blog/${slug}`);
        const article = res.data?.data;
        const title = article.title || 'Blog - Gateway Abroad | Study Abroad Tips & Updates';
        const description =article.description || 'Expert study abroad & test prep guidance from Gateway Abroad.';
        const ogImage = `/img/ga-logo.svg`;

        return {
            metadataBase: new URL('https://www.gatewayabroadeducations.com'),
            title,
            description,
            keywords: 'study abroad, IELTS, GMAT, GRE, TOEFL, PTE, SAT, Gateway Abroad ,blog',
            openGraph: {
                title,
                description,
                images: [ogImage],
                type: 'article',
            },
            alertnates: {
                canonical: `https://www.gatewayabroadeducations.com/article/${slug}`,
            }
        };
    } catch (error) {
        return {
            title: 'Article Post | Gateway Abroad',
            description: 'Get expert advice on IELTS, GMAT, GRE, study abroad, and more.',
            keywords: 'study abroad, IELTS, GMAT, GRE, TOEFL, PTE, SAT, Gateway Abroad',
        };
    }
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;

    const articleRes = await serverInstance.get(`/web/blog/${slug}`);
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