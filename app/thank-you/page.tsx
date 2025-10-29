import ThankyouPage from '@/components/thankyou/thankyoupage';
export async function generateMetadata() {
    const seoData = {
        title: "Thank You - Gateway Abroad",
        description: "Thank you for contacting Gateway Abroad! Our experts will reach out to you soon.",
        keywords: "Study Abroad, IELTS, TOEFL, Gateway Abroad, thank you page",
        ogTitle: "Thank You - Gateway Abroad",
        ogDescription: "We appreciate your interest in Gateway Abroad. Stay tuned for updates!",
        ogImage: "/img/og-about.jpg",
        twitterTitle: "Thank You - Gateway Abroad",
        twitterDescription: "Thanks for getting in touch! Our team will contact you shortly.",
        twitterImage: "/img/og-about.jpg",
        canonical: "https://www.gatewayabroadeducations.com/thank-you"
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


const Thankyou = () => {
    return (
        <ThankyouPage/>
    )
}

export default Thankyou;