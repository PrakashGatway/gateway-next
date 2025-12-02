import NotFound from "@/app/not-found";
import StudyInUk from "@/components/pages/studyInUk";
import { serverInstance } from "@/services/axiosInstance";


export const revalidate = 600;
const pageContentPromise = async ({ country }) => {
    try {
        const res = await fetch(
            `https://uat.gatewayabroadeducations.com/api/v1/page/${country}?type=country_page`,
            {
                next: { revalidate: 600 }, // enables ISR (optional)
                headers: { "Content-Type": "application/json" },
            }
        );
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data?.data || null;
    } catch (error) {
        return null; // return null if any error
    }
};


export async function generateStaticParams() {
    try {
        const res = await fetch(
            `https://uat.gatewayabroadeducations.com/api/v1/page?page=1&limit=100&pageType=country_page`,
            { next: { revalidate: 600 } }
        );
        if (!res.ok) {
            console.error("Failed to fetch slugs for static generation");
            return [];
        }
        const data = await res.json();
        const pages = data?.data || [];
        return pages.map((page) => ({
            country: page.slug,
        }));
    } catch (error) {
        console.error("Error generating static params:", error);
        return [];
    }
}

export async function generateMetadata({ params }) {
    const { country } = await params;
    const pageContent = await pageContentPromise({ country });
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
            canonical: pageContent?.canonicalUrl,
        },
    };
}

const UkPage = async ({ params }) => {
    const { country } = await params;
    const pageContent = await pageContentPromise({ country });
    if (!pageContent) {
        return <NotFound />;
    }

    return (
        <StudyInUk country={country} content={pageContent} />
    );
};

export default UkPage;