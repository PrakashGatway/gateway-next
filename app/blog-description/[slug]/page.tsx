import SingleBlogPage from "@/components/pages/blogDetail";
import { redirect } from "next/navigation";

export const revalidate = 21600;

// export async function generateStaticParams() {
//   try {
//     const res = await fetch(
//       "https://www.gatewayabroadeducations.com/api/v1/blog?all=true"
//     );
//     if (!res.ok) {
//       console.error("❌ Failed to fetch blog slugs for static generation");
//       return [];
//     }
//     const data = await res.json();
//     const blogs = data?.data?.blog || [];

//     return blogs.map((blog) => ({
//       slug: blog.Slug,
//     }));
//   } catch (error) {
//     console.error("⚠️ Error generating static params:", error);
//     return [];
//   }
// }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const res = await fetch(
      `https://www.gatewayabroadeducations.com/api/v1/blog/${slug}`,
      {
        next: { revalidate: 21600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch blog metadata: ${res.status}`);
    }

    const data = await res.json();
    const seoData = data?.data?.blog;

    const defaultTitle = "Blog - Gateway Abroad | Study Abroad Tips & Updates";
    const defaultDescription = "Stay updated with the latest study abroad news, visa updates, test prep tips, and student success stories from Gateway Abroad.";
    const defaultImage = "https://www.gatewayabroadeducations.com/assets/img/ga-logo.svg"; // Fallback image
    const title = seoData?.blogTitle || defaultTitle;
    const description = seoData?.descriptions || defaultDescription;
    const keywords = seoData?.keyword || "study abroad blog, IELTS tips, student visa updates, university admissions, abroad education news, Gateway Abroad blog";
    const ogImage = seoData?.image ? `https://www.gatewayabroadeducations.com/uploads/${seoData.image}` : defaultImage;

    return {
      metadataBase: new URL('https://www.gatewayabroadeducations.com'),
      title: title,
      description: description,
      keywords: keywords,
      openGraph: {
        title: title,
        description: description,
        images: [ogImage],
        type: "article",
        site_name: "Gateway Abroad Education",
      },
      robots: {
        index: true,
        follow: true,
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [ogImage],
      }
    };

  } catch (error) {
    const fallbackTitle = "Blog Article - Gateway Abroad";
    const fallbackDescription = "Read insightful articles on studying abroad, test preparation, and visa guidance.";
    const fallbackImage = "https://www.gatewayabroadeducations.com/assets/img/ga-logo.svg";

    return {
      metadataBase: new URL('https://www.gatewayabroadeducations.com'),
      title: fallbackTitle,
      description: fallbackDescription,
      keywords: "study abroad blog, Gateway Abroad",
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        images: [fallbackImage]
      },
      twitter: {
        card: "summary_large_image",
        title: fallbackTitle,
        description: fallbackDescription,
        images: [fallbackImage],
      }
    };
  }
}

export default async function SingleBlog({ params }) {
  const { slug } = await params;

  if (slug === "preparing-for-toefl-speaking-section") {
    redirect(`/article/${slug}`);
  }
  const res = await fetch(`https://www.gatewayabroadeducations.com/api/v1/blog/${slug}`, {
    next: { revalidate: 21600 },
  });
  const data = await res.json();
  return <SingleBlogPage data={data?.data?.blog} />;
}