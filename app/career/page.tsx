import CareerPage from "@/components/pages/career";

export async function generateMetadata() {
  const seoData = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          title: "Thank You about us- Gateway Abroad",
          description: "Thank you about for contacting Gateway Abroad! Our experts will reach out to you soon.",
          keywords: "Study Abroad, IELTS, TOEFL, Gateway Abroad",
          ogTitle: "Thank You about us - Gateway Abroad",
          ogDescription: "We about appreciate your interest in Gateway Abroad. Stay tuned for updates!",
          ogImage: "https://via.placeholder.com/600x400.png?text=Gateway+Abroad",
        }),
      500 
    )
  ) as any;

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      images: [seoData.ogImage],
      url: "https://www.gatewayabroadeducations.com/about",
    },
    alternates: { canonical: "https://www.gatewayabroadeducations.com/about" },
  };
}

function Career() {

  return (
    <CareerPage/>
  );
}

export default Career;