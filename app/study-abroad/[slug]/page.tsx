import StudyAbroadPage from "@/components/pages/studyAbroad";
import { serverInstance } from "@/services/axiosInstance";

export const revalidate = 21600;
const pageContentPromise = async ({ slug }) => {
    try {
        const res = await fetch(
            `https://uat.gatewayabroadeducations.com/api/v1/page/${slug}?type=city_page`,
            {
                next: { revalidate: 21600 },
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch page data: ${res.status}`);
        }

        const data = await res.json();
        return data?.data || null;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export async function generateStaticParams() {
    try {
        const res = await fetch(
            `https://uat.gatewayabroadeducations.com/api/v1/page?page=1&limit=100&pageType=city_page`,
            { next: { revalidate: 21600 } }
        );
        if (!res.ok) {
            console.error("Failed to fetch slugs for static generation");
            return [];
        }
        const data = await res.json();
        const [main, ...pages] = data?.data || [];
        return pages.map((page) => ({
            slug: page.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const pageContent = await pageContentPromise({ slug });

    return {
        metadataBase: new URL('https://www.gatewayabroadeducations.com'),
        title: pageContent?.metaTitle || "Default Study Abroad Title",
        description: pageContent?.metaDescription || "Default study abroad description.",
        openGraph: {
            title: pageContent?.metaTitle || "Study Abroad",
            description: pageContent?.metaDescription || "Learn about study abroad programs",
            images: [
                {
                    url: "img/ga-logo.svg",
                    width: 1200,
                    height: 630,
                    alt: pageContent?.metaTitle || "Study Abroad",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: pageContent.metaTitle,
            description: pageContent.metaDescription,
            images: ["img/ga-logo.svg"],
        },
        keywords: pageContent?.keywords || "study abroad, international education",
        alternates: {
            canonical: pageContent.canonicalUrl,
        },
    };
}

export default async function StudyAbroad({ params }) {
    const { slug } = await params;
    const pageContent = await pageContentPromise({ slug });
    return <StudyAbroadPage content={pageContent} />;
}