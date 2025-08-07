import StudyInUk from "@/components/pages/studyInUk";

export async function generateMetadata() {
  const seoData = {
    title: "UK Education Consultants | Study in UK for indian students",
    description: "Study in UK for Indian students: Top universities, courses & fees. Your guide to study abroad in the United Kingdom. uk educational consultants.",
    keywords: "study in uk for indian students, studying in united kingdom, study abroad at uk, top universities in uk, international students, expert counsellor for uk study abroad",
    ogTitle: "UK Education Consultants | Study in UK for indian students",
    ogDescription: "Study in UK for Indian students: Top universities, courses & fees. Your guide to study abroad in the United Kingdom. uk educational consultants.",
    ogImage: "/img/ga-logo.svg",
    twitterTitle: "Study in UK - Gateway Abroad Consultants",
    twitterDescription: "Your trusted partner for studying in the UK. Get expert guidance on universities, visas, and applications.",
    twitterImage: "/img/ga-logo.svg",
    canonical: "https://www.gatewayabroadeducations.com/study-in-uk"
  };

  return {
    metadataBase: new URL('https://www.gatewayabroadeducations.com'),
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords,
    openGraph: {
      title: seoData.ogTitle,
      description: seoData.ogDescription,
      images: [seoData.ogImage],
      url: seoData.canonical,
      type: "website",
      site_name: "Gateway Abroad Education",
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.twitterTitle,
      description: seoData.twitterDescription,
      images: [seoData.twitterImage],
    },
    alternates: { canonical: seoData.canonical },
  };
}

const UkPage = () => {
  return (
    <StudyInUk/>
  );
};

export default UkPage;