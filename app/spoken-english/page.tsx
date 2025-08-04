import SpokenEnglish from "@/components/pages/spokenEnglish";

export async function generateMetadata() {
  const seoData = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          title: "Thank You home us- Gateway Abroad",
          description: "Thank you home for contacting Gateway Abroad! Our experts will reach out to you soon.",
          keywords: "Study Abroad, IELTS, TOEFL, Gateway Abroad",
          ogTitle: "Thank You home us - Gateway Abroad",
          ogDescription: "We home appreciate your interest in Gateway Abroad. Stay tuned for updates!",
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
      url: "https://www.gatewayabroadeducations.com",
    },
    alternates: { canonical: "https://www.gatewayabroadeducations.com/" },
  };
}

function Spoken() {
  return (
    <SpokenEnglish />
  );
}

export default Spoken;