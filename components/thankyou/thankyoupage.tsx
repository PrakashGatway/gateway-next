'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { constant } from '@/constant/index.constant.js';

const ThankyouPage = () => {
    const router = useRouter();
    const [countdown, setCountdown] = useState(7);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            router.push('/');
        }
    }, [countdown, router]);

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <>
            <div className="container-fluid thanks_you_page_heder" style={{ backgroundImage: "url('/img/Background.png')" }}>
                <div className="thank_you_pafe header-inner">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12 max-w-xl">
                            <div className="logo-sec text-center">
                                <Link href="/">
                                    <img src="/img/ga-logo.svg" alt="Gateway Abroad Logo" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 max-w-xl mx-auto flex justify-content-center">
                            <h1 className="text-3xl lg:text-[2.6rem] !text-center mt-12 mb-6">
                                Thank You for Reaching Out to Gateway Abroad!
                            </h1>
                        </div>
                        <div className="col-12 max-w-xl thanks_small_text text-center">
                            Thank you for submitting the form! Our expert consultant will review your details and reach out to you soon.
                            In the meantime, feel free to explore our services or contact us for any immediate questions.
                        </div>
                        <div className="col-12 mt-4 text-center">
                            <p className="text-black">
                                Redirecting to homepage in <strong>{countdown}</strong> second{countdown !== 1 ? 's' : ''}...
                            </p>
                            <button
                                onClick={handleGoHome}
                                className="rounded-full px-4 py-2 text-white bg-red-600 thank_you_btn"
                            >
                                Go to Homepage Now
                            </button>
                        </div>
                    </div>
                </div>
                <div className="absolute_thanks min-w-[80vw] sm:min-w-[400px]">
                    <div className="thanks_bottom_button">
                        <a href={constant.REACT_APP_URL} className="text-black" target="_blank" rel="noopener noreferrer">
                            Stay tuned for exciting opportunities!
                        </a>
                    </div>
                    <span className="mt-2 d-flex justify-content-center">
                        Get social
                    </span>
                    <ul className="d-flex list-unstyled justify-content-evenly align-items-center thanks_footer_block">
                        <li>
                            <Link href="https://www.facebook.com/gagatewayabroadjaipur?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-facebook" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.youtube.com/@GatewayAbroadJaipur" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-youtube" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://api.whatsapp.com/send?phone=8302092630" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-whatsapp" />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.instagram.com/testprep_with_gatewayjaipur/" target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-instagram" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default ThankyouPage;