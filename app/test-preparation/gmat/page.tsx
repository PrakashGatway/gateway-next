"use client"
import { useRef, useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { testimonialSlider } from '@/custom/custom';
import PageServices from '@/services/PageServices';
import useAsync from '@/hooks/useAsync';
import { constant } from '@/constant/index.constant';
import { useForm } from 'react-hook-form';

function Course() {
  const router = useRouter();
  const { courseId } = {courseId:"GMAT"};
  const { data: testimonialsData } = useAsync(PageServices.getTestimonial);
  const { data: slider } = useAsync(PageServices.getStudent);
  
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [testimonials, setTestimonial] = useState([]);
  const [courseData, setCourseData] = useState({});
  const [faqData, setFaqData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Initialize react-hook-form for the modal form
  const {
    register: registerContact,
    handleSubmit: handleSubmitContact,
    formState: { errors: contactErrors },
    reset: resetContactForm
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      city: '',
      message: ''
    }
  });

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const getAllfaqData = async (value) => {
    try {
      const response = await PageServices.getAllFaqForFront(value);
      if (response.status === 'success') {
        setFaqData(response.data.faq || []);
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getAllTestimonial = async (value) => {
    try {
      const response = await PageServices.getTestimonialByCat(value);
      if (response.status === 'success') {
        setTestimonial(response.data.testimonial || []);
      } else {
        console.log('something went wrong');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlepUpdate = async (data) => {
    const { name, email, mobile, city, message } = data;

    try {
      const createJob = await PageServices.createForme({
        name,
        email,
        mobileNo: mobile,
        city,
        message,
        type: 'contact'
      });

      if (createJob.status === 'success') {
        resetContactForm();
        setFormSubmitted(true);
        setShowModal(false);
        router.push('/thank-you');
      } else {
        console.error('Submission failed:', createJob);
        alert('Something went wrong during submission.');
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert('An error occurred. Please try again.');
    }
  };

  const handledownload = async (value) => {
    if (formSubmitted) {
      window.open(value, '_blank');
    } else {
      setShowModal(true);
    }
  };

  const getColSize = () => {
    if (courseName === 'PTE') {
      return 'col-lg-4 col-sm-6';
    } else if (courseName === 'SAT') {
      return 'col-lg-6 col-sm-6';
    } else if (courseName === 'GRE') {
      return 'col-lg-4 col-sm-6';
    } else {
      return 'col-lg-3 col-sm-6';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PageServices.getCourseByName(courseId);
        if (response.status === 'success') {
          setCourseName(response.data.page.pageName || '');
          setDescription(response.data.page.description || '');
          setCourseData(response.data.page || {});
          getAllfaqData(response.data.page.pageName);
          getAllTestimonial(response.data.page.pageName);
        } else {
          console.log('something went wrong');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        router.push(`/`);
      }
    };
    
    if (courseId) {
      fetchData();
    }
    
    if (testimonialsData?.data?.testimonial) {
      setTestimonial(testimonialsData.data.testimonial);
    }
    if (slider?.data?.media) {
      setSliderData(slider.data.media);
    }
  }, [courseId, testimonialsData, slider, router]);

  function first(data1) {
    const split = data1?.split(':') || [];
    return split[0];
  }

  function second(data1) {
    const split = data1?.split(':') || [];
    return split[1];
  }

  const marqueeRef = useRef(null);

  return (
    <div>
      <section>
        <div className="banner-sec banner-new-bg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="banner-content-sec">
                  <h1>{courseData.textFild} </h1>
                  <p>{courseData.textFild2}</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="contact-us-img text-center">
                  <Image 
                    src={`${constant.REACT_APP_URL}/uploads/${courseData.image2}`} 
                    alt="Course banner" 
                    width={500}
                    height={300}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <marquee 
          ref={marqueeRef} 
          className="marquee-product marquee-product-2" 
          behavior="alternate" 
          direction="left" 
          scrollamount={5} 
          onMouseEnter={() => marqueeRef.current.stop()}
          onMouseLeave={() => marqueeRef.current.start()}
        >
          {sliderData.map((e) => (
            <small id="studentname" key={e._id || e.id}>
              {e.name} {e.courseName} <small id="studentscores">{e.rank}</small>
            </small>
          ))}
        </marquee>
      </section>

      <section className="gmat-overview-sec py-70">
        <div className="container">
          <div className="gmat-overview-inner">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="about-us-left-new gmat-test-pre-left">
                  <Image 
                    src={`${constant.REACT_APP_URL}/uploads/${courseData.image3}`} 
                    alt="Course Overview" 
                    width={500}
                    height={300}
                    layout="responsive"
                  />
                </div>
              </div>
              <div className="col-md-7">
                <div className="about-us-right-new ps-3 gmat-test-pre-right">
                  <h2 className="heading">What is {courseName}?</h2>
                  <p className="descp mb-3">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gmat-descp-sec">
            <h2 className="heading text-center d-block">What is on the {courseName}?</h2>
            <div className="row gy-4 justify-content-center">
              <div className={getColSize()}>
                <div className="gmat-desc-card">
                  <div className="gmat-desc-card-icon">
                    <Image src="/img/gmat-descp-img-1.svg" alt="gmat-icon" width={50} height={50} />
                  </div>
                  <div className="gmat-desc-card-body">
                    <h5>{courseData.whatIsOn?.one ? first(courseData.whatIsOn.one) : ''}</h5>
                    <p>{courseData.whatIsOn?.one ? second(courseData.whatIsOn.one) : ''}</p>
                  </div>
                </div>
              </div>
              <div className={getColSize()}>
                <div className="gmat-desc-card">
                  <div className="gmat-desc-card-icon">
                    <Image src="/img/gmat-descp-img-2.svg" alt="gmat-icon" width={50} height={50} />
                  </div>
                  <div className="gmat-desc-card-body">
                    <h5>{courseData.whatIsOn?.two ? first(courseData.whatIsOn.two) : ''}</h5>
                    <p>{courseData.whatIsOn?.two ? second(courseData.whatIsOn.two) : ''}</p>
                  </div>
                </div>
              </div>
              {courseData?.whatIsOn?.three && (
                <div className={getColSize()}>
                  <div className="gmat-desc-card">
                    <div className="gmat-desc-card-icon">
                      <Image src="/img/gmat-descp-img-3.svg" alt="gmat-icon" width={50} height={50} />
                    </div>
                    <div className="gmat-desc-card-body">
                      <h5>{first(courseData.whatIsOn.three)}</h5>
                      <p>{second(courseData.whatIsOn.three)}</p>
                    </div>
                  </div>
                </div>
              )}
              {courseData?.whatIsOn?.four && (
                <div className={getColSize()}>
                  <div className="gmat-desc-card">
                    <div className="gmat-desc-card-icon">
                      <Image src="/img/gmat-descp-img-4.svg" alt="gmat-icon" width={50} height={50} />
                    </div>
                    <div className="gmat-desc-card-body">
                      <h5>{first(courseData.whatIsOn.four)}</h5>
                      <p>{second(courseData.whatIsOn.four)}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="country-accept-gmat-section py-60">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="country-accept-gmat-left">
                {courseName === "GMAT" && <Image src="/img/country-gmat_480.png" alt="gmat-country-accept" width={480} height={320} />}
                {courseName === "PTE" && <Image src="/img/country-pte_480.png" alt="pte-country-accept" width={480} height={320} />}
                {courseName === "SAT" && <Image src="/img/country-sat_480.png" alt="sat-country-accept" width={480} height={320} />}
                {courseName === "GRE" && <Image src="/img/country-gre_480.png" alt="gre-country-accept" width={480} height={320} />}
                {courseName === "IELTS" && <Image src="/img/country-ielts_480.png" alt="ielts-country-accept" width={480} height={320} />}
                {courseName === "TOEFL" && <Image src="/img/country-toefl_480.png" alt="toefl-country-accept" width={480} height={320} />}
              </div>
            </div>
            <div className="col-md-6">
              <div className="country-accept-gmat-right">
                <h2 className="heading">Countries Accepting {courseName} Scores</h2>
                <p className="descp">{courseName} is accepted in {courseData?.acceptedCountrie} countries around the world.</p>
                <h6>Some of the popular countries accepting {courseName} scores are as follows:</h6>
                <div className="country-accept-list">
                  <ul className="list-unstyled">
                    <li>USA</li>
                    <li>United Kingdom</li>
                    <li>Australia</li>
                    <li>Canada</li>
                    <li>Germany</li>
                    <li>New Zealand</li>
                    <li>France</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choose-ga py-60">
        <div className="container">
          <h2 className="heading text-center d-block">Why Choose Gateway Abroad for {courseName} Test Prep?</h2>
          <div className="row pt-4 gy-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              courseData?.whyChoose?.[num === 1 ? 'one' : num === 2 ? 'two' : num === 3 ? 'three' : num === 4 ? 'four' : num === 5 ? 'five' : 'six'] && (
                <div className="col-lg-4 col-sm-6" key={num}>
                  <div className="why-choose-ga-feature-box">
                    <div className="why-choose-ga-feature-box-icon">
                      <Image 
                        src={`/img/why-choose-ga-img-${num}.svg`} 
                        alt={`why-choose-ga-img-${num}`}
                        width={50}
                        height={50}
                      />
                    </div>
                    <p>{courseData.whyChoose[num === 1 ? 'one' : num === 2 ? 'two' : num === 3 ? 'three' : num === 4 ? 'four' : num === 5 ? 'five' : 'six']}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="brochure-section py-70">
        <div className="container">
          <div className="brochure-section-inner">
            <div className="row align-items-center">
              <div className="col-lg-9">
                <div className="brochure-content-left">
                  <h2 className="heading text-white mb-lg-0">Ready, set, knowledge! Download our brochure and get started.</h2>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="brochure-download-btn">
                  <button 
                    className="brochure-download-btn" 
                    onClick={() => {
                      const brochureMap = {
                        "GMAT": '/brosher/GMAT.pdf',
                        "PTE": '/brosher/PTE.pdf',
                        "SAT": '/brosher/SAT.pdf',
                        "GRE": '/brosher/GRE.pdf',
                        "IELTS": '/brosher/IELTS.pdf',
                        "TOEFL": '/brosher/TOEFL.pdf'
                      };
                      handledownload(brochureMap[courseName]);
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-testimonials py-70 gmat-testimonials">
        <div className="container">
          <h2 className="heading text-center d-block">What Our {courseName} Prep Achievers Say</h2>
          {testimonials.length === 1 ? (
            <div className="our-testimonials-slider-inner single-testmonial">
              <div className="student-test-box">
                <div className="student-content">
                  <div className="d-flex align-items-center justify-content-between">
                    <h6>{testimonials[0].name}</h6>
                    <ul className="list-unstyled d-flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <li key={star}><span><i className="fa fa-star" /></span></li>
                      ))}
                    </ul>
                  </div>
                  <p className="descp">{testimonials[0].content.substring(0, 250)}</p>
                </div>
                <div className="test-univ-sec"></div>
              </div>
            </div>
          ) : (
            <Slider {...testimonialSlider} className="our-testimonials-slider">
              {testimonials.map((test) => (
                <div className="our-testimonials-slider-inner" key={test.id || test._id}>
                  <div className="student-test-box">
                    <div className="student-content">
                      <div className="d-flex align-items-center justify-content-between">
                        <h6>{test.name}</h6>
                        <ul className="list-unstyled d-flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <li key={star}><span><i className="fa fa-star" /></span></li>
                          ))}
                        </ul>
                      </div>
                      <p className="descp">{test.content.substring(0, 250)}</p>
                    </div>
                    <div className="test-univ-sec"></div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      <section className="pricing-plan-section py-70 linear-bg">
        <div className="container">
          <div className="price-title">
            <h2 className="heading mb-2">Plans & Pricing</h2>
            <p className="descp">We are accepting PayPal, Paytm, PhonePe and Debit & Credit Card</p>
          </div>
          <div className="pricing-plan-section-inner">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card">
                  <h5 className="plan-name">Classroom training</h5>
                  <div className="plan-offer-list">
                    <ul className="list-unstyled">
                      <li>Gateway Abroad Jaipur empowers you to achieve your {courseName} goals with top-notch instructors. They provide in-person guidance through a comprehensive offline preparation program.</li>
                      <li>Don't let academic hurdles hold you back from achieving success. Conquer the {courseName} exam entirely offline and unlock the door to a thriving academic journey. </li>
                    </ul>
                  </div>
                  <div className='text-center'>
                    <Link href="#" className="choose-plan-btn site-btn" onClick={() => setShowModal(true)}>
                      Choose Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card">
                  <h5 className="plan-name">Live online training</h5>
                  <div className="plan-offer-list">
                    <ul className="list-unstyled">
                      <li>Level Up Your Scores: Anytime, Anywhere. Conquer standardized tests from the comfort of your home with our interactive online prep courses</li>
                      <li>Our flexible online classes and dedicated support ensure you can progress at your own pace, tailoring your learning journey to your busy schedule.</li>
                    </ul>
                  </div>
                  <div className='text-center'>
                    <Link href="#" className="choose-plan-btn site-btn" onClick={() => setShowModal(true)}>
                      Choose Plan
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="pricing-card most-popular-card">
                  <div className="most-p-btn-outer">
                    <button className="most-p-btn">Most Popular</button>
                  </div>
                  <h5 className="plan-name">Hybrid</h5>
                  <div className="plan-offer-list">
                    <ul className="list-unstyled">
                      <li>Get the best of both worlds with our hybrid courses - the flexibility of online learning combined with the personalized support of in-person instruction!</li>
                      <li>Why choose between online convenience and offline expertise when you can have both? Experience the ultimate exam prep fusion with our hybrid courses!</li>
                    </ul>
                  </div>
                  <div className='text-center'>
                    <Link href="#" className="choose-plan-btn site-btn" onClick={() => setShowModal(true)}>
                      Choose Plan
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="test-prep-resource-sec py-70">
        <div className="container">
          <h2 className="heading text-center d-block">Free {courseName} Prep Resources</h2>
          <div className="row gy-3 pt-4 justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="test-prep-resource-card">
                <div className="test-prep-resource-card-img">
                  <Image src="/img/resource-img-1.svg" alt="resource-img" width={100} height={100} />
                </div>
                <div className="test-prep-resource-card-body">
                  <h4>Practice Material</h4>
                  <p>Take the {courseName} practice material and begin your {courseName} preparation now</p>
                  <div className='text-center'>
                    <button 
                      className="resource-red-btn" 
                      onClick={() => {
                        const practiceMap = {
                          "GMAT": "https://drive.google.com/drive/folders/1tqPuj-HBYnHX6A-hB71Aq9gsG4QfoZZ3",
                          "PTE": "https://drive.google.com/drive/folders/1kM7xUBIZacJM82FteV-SlkwWMtMlTyBM",
                          "SAT": "https://drive.google.com/drive/folders/1OYM497cr2lVjqLsRA8S1m9Ho_EduSBmW",
                          "GRE": "https://drive.google.com/drive/folders/1vY4eXSz0E5V5Qtrr_LbwKjl7vCedqaCE",
                          "IELTS": "https://drive.google.com/drive/folders/1WlxtWu5A2eRlcDswTj0UFJtpp8LHOJwI",
                          "TOEFL": "https://drive.google.com/drive/folders/1GdcyZq-o831I1zeHaG9w9KlH9z3QLSiy"
                        };
                        handledownload(practiceMap[courseName]);
                      }}
                    >
                      Take {courseName} Practice Material
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="test-prep-resource-card">
                <div className="test-prep-resource-card-img">
                  <Image src="/img/resource-img-2.svg" alt="resource-img" width={100} height={100} />
                </div>
                <div className="test-prep-resource-card-body">
                  <h4>Other Resources</h4>
                  <p>Begin your {courseName} coaching with this other resources prepared by our experts to help you with your {courseName} prep</p>
                  <div className='text-center'>
                    <button 
                      className="resource-red-btn" 
                      onClick={() => {
                        const resourceMap = {
                          "GMAT": "/courseRes/GMAT.pdf",
                          "PTE": "/courseRes/PTE.pdf",
                          "SAT": "/courseRes/SAT.pdf",
                          "GRE": "/courseRes/GRE.pdf",
                          "IELTS": "https://drive.google.com/drive/folders/1woaEMonJQbQlpco2Ksnc52oC46HLtTHF",
                          "TOEFL": "https://drive.google.com/drive/folders/1woaEMonJQbQlpco2Ksnc52oC46HLtTHF"
                        };
                        handledownload(resourceMap[courseName]);
                      }}
                    >
                      Download {courseName} Other Resources
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="test-prep-resource-card">
                <div className="test-prep-resource-card-img">
                  <Image src="/img/resource-img-3.svg" alt="resource-img" width={100} height={100} />
                </div>
                <div className="test-prep-resource-card-body">
                  <h4>Syllabus Download</h4>
                  <p>Download the {courseName} syllabus now and get a head start on your {courseName} preparation</p>
                  <div className='text-center'>
                    <button 
                      className="resource-red-btn" 
                      onClick={() => {
                        const syllabusMap = {
                          "GMAT": "/Syllabus/GMATsyllabus.pdf",
                          "PTE": "/Syllabus/PTEsyllabus.pdf",
                          "SAT": "/Syllabus/SATsyllabus.pdf",
                          "GRE": "/Syllabus/GREsyllabus.pdf",
                          "IELTS": "/Syllabus/IELTSsyllabus.pdf",
                          "TOEFL": "/Syllabus/TOEFLsyllabus.pdf"
                        };
                        handledownload(syllabusMap[courseName]);
                      }}
                    >
                      Download {courseName} Syllabus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section py-70">
        <div className="container">
          <div className="title text-center mb-5">
            <h2 className="heading mb-2">Frequently asked questions</h2>
            <p className="descp text-center">Can't find the answer you are looking for?</p>
          </div>
          <div className="faq-section-container">
            <div className="accordion" id="accordionExample">
              {faqData.map((f, index) => (
                <div className="accordion-item" key={f._id || f.id || index}>
                  <h2 className="accordion-header" id={`heading${index}`}>
                    <button
                      className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      aria-expanded={activeIndex === index ? 'true' : 'false'}
                      aria-controls={`collapse${index}`}
                    >
                      {f.title}
                    </button>
                  </h2>
                  <div
                    id={`collapse${index}`}
                    className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      {f.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-banner-section counselling-session-sec">
        <div className="container">
          <div className="app-banner-section-inner counselling-session-sec-inner">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="app-banner-content-left">
                  <h2 className="mb-3">Avail A Complementary Counselling Session</h2>
                  <p className="mb-4">Join thousand of instructors and earn money hassle free!</p>
                  <Link href="/contact" className="site-btn">
                    Contact us
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="app-banner-content-right text-center">
                  <Image 
                    src="/img/counselling-session.svg" 
                    alt="partner" 
                    width={500}
                    height={300}
                    layout="responsive"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Form */}
      <div className={`modal right fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="pdfdownModel" tabIndex={-1} aria-labelledby="pdfdownModelLabel" aria-hidden={!showModal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="pdfdownModelLabel">Get in touch</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="get-in-touch-form">
                <form onSubmit={handleSubmitContact(handlepUpdate)}>
                  <div className="input-field">
                    <input
                      type="text"
                      {...registerContact("name", { required: "Name is required" })}
                      className={`form-control ${contactErrors.name ? 'is-invalid' : ''}`}
                      placeholder="Name"
                    />
                    {contactErrors.name && <div className="invalid-feedback">{contactErrors.name.message}</div>}
                  </div>
                  <div className="input-field">
                    <input
                      type="email"
                      {...registerContact("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email address"
                        }
                      })}
                      className={`form-control ${contactErrors.email ? 'is-invalid' : ''}`}
                      placeholder="Email"
                    />
                    {contactErrors.email && <div className="invalid-feedback">{contactErrors.email.message}</div>}
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      {...registerContact("mobile", {
                        required: "Mobile No. is required",
                        pattern: {
                          value: /^\d{10,15}$/,
                          message: "Invalid phone number"
                        }
                      })}
                      className={`form-control ${contactErrors.mobile ? 'is-invalid' : ''}`}
                      placeholder="Mobile No."
                    />
                    {contactErrors.mobile && <div className="invalid-feedback">{contactErrors.mobile.message}</div>}
                  </div>
                  <div className="input-field">
                    <input
                      type="text"
                      {...registerContact("city", { required: "City is required" })}
                      className={`form-control ${contactErrors.city ? 'is-invalid' : ''}`}
                      placeholder="City"
                    />
                    {contactErrors.city && <div className="invalid-feedback">{contactErrors.city.message}</div>}
                  </div>
                  <div className="input-field type-file-field">
                    <textarea
                      {...registerContact("message")}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows={2}
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <button type="submit">SUBMIT</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;