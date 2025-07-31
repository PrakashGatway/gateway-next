"use client"; // Required because of hooks, state, forms, sliders, etc.

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For App Router
import { useForm } from 'react-hook-form'; // Import useForm
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slider2settings, settings, youtubeSlider, blogSlider, testimonialSlider } from '@/custom/custom'; // Ensure path is correct
import PageServices from '@/services/PageServices'; // Ensure path is correct
import useAsync from '@/hooks/useAsync'; // Ensure path is correct
import { constant } from '@/constant/index.constant.js'; // Ensure path is correct
import Head from 'next/head'; // For managing head tags
import HeroSection from '../hero-section';
import AboutSection from '../about-section';
import TestPreparation from '../TestPreparationSection';

function Index() {
  const { data } = useAsync(PageServices.getAboutPageById);
  const { data: homePageData } = useAsync(PageServices.getHomePageDetails);
  const { data: course } = useAsync(PageServices.getCourse);
  const { data: testimonialsData } = useAsync(PageServices.getTestimonial);
  const { data: videoStudednt } = useAsync(PageServices.getYoutubeVideo);
  const { data: slider } = useAsync(PageServices.getStudentSlider);
  const { data: slider2 } = useAsync(PageServices.getStudentHome);
  const router = useRouter(); // For App Router
  const [aboutPageData, setAboutPageData] = useState({});
  const [CourseData, setCourseData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [video, setVideo] = useState([]);
  const [testimonials, setTestimonial] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [homePageDetails, setHomePageDetails] = useState({});

  const fetchBlogs = useCallback(async (page = 1, category = 'All', search = '') => {
    try {
      const res = await PageServices.getBlogData({ page, limit: 5, category, search });
      setBlogData(res.data.blog || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    if (data?.data?.page) {
      setAboutPageData(data.data.page || '');
    }
    if (homePageData?.data) {
      setHomePageDetails(homePageData?.data || {});
    }
    if (course?.data?.page) {
      setCourseData(course.data.page);
    }
    if (videoStudednt?.data?.media) {
      setVideo(videoStudednt.data.media);
    }
    if (testimonialsData?.data?.testimonial) {
      setTestimonial(testimonialsData.data.testimonial);
    }
    if (slider?.data?.media) {
      setSliderData(slider.data.media);
    }
    if (slider2?.data?.media) {
      setStudentData(slider2.data.media);
    }
  }, [data, course, testimonialsData, video, slider, slider2, homePageData, videoStudednt]);


  const marqueeRef = useRef(null);

  // --- Register Now Form Setup ---
  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: registerErrors },
    reset: resetRegisterForm
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      studyDestination: '', // Default to empty string or a specific option if needed
      query: ''
    }
  });

  const handleUpdate = async (data) => { // 'data' now contains validated form values
    // Destructure data if needed, or use data directly
    const { name, email, mobile, studyDestination, query } = data;
    try {
      const createJob = await PageServices.createForme({
        name,
        email,
        mobileNo: mobile,
        message: query,
        studyDestination,
        type: 'register'
      });
      if (createJob.status === 'success') {
        resetRegisterForm();
        router.push('/thank-you'); // For App Router
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error("Error submitting register form:", error);
      alert('An error occurred. Please try again.'); // Provide user feedback
    }
  };

  // --- Become a Partner Form Setup ---
  const {
    register: registerPartner,
    handleSubmit: handleSubmitPartner,
    formState: { errors: partnerErrors },
    reset: resetPartnerForm
  } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      mobile: '',
      whatsappNo: '',
      age: '',
      city: '',
      occupation: '',
      adress: '', // Note: Typo in state name 'adress' kept for consistency with original logic
      howDidyouKnow: '',
      qualifications: '',
      query: ''
    }
  });

  const handleUpdate2 = async (data) => { // 'data' now contains validated form values
    // Destructure data if needed, or use data directly
    const {
      name, lastName, email, mobile, whatsappNo, age, city,
      occupation, adress, howDidyouKnow, qualifications, query
    } = data;
    try {
      // Make an API call to update the data
      const createJob = await PageServices.createForme({
        name,
        email,
        mobileNo: mobile,
        lastName,
        whatsappNo,
        city,
        age,
        occupation,
        adress, // Keep typo for consistency
        howDidyouKnow,
        qualification: qualifications,
        message: query,
        type: 'partner'
      });
      if (createJob.status === 'success') {
        // Reset the form fields to their default values
        resetPartnerForm();
        const modalEl = document.getElementById("partnerModal");
        if (modalEl) {
          // Use Bootstrap's modal methods if jQuery/Bootstrap JS is available
          // Otherwise, manipulate classes/styles directly
          const bootstrapModal = window.bootstrap?.Modal.getInstance(modalEl);
          if (bootstrapModal) {
            bootstrapModal.hide();
          } else {
            // Fallback if Bootstrap JS instance isn't available
            modalEl.classList.remove("show");
            modalEl.style.display = "none";
            modalEl.setAttribute("aria-hidden", "true");
            document.body.classList.remove("modal-open");
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) backdrop.remove();
          }
        }
        // Navigate using Next.js router
        router.push('/thank-you'); // For App Router
        // router.push('/thank-you'); // For Pages Router (same method)
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error("Error submitting partner form:", error);
      alert('An error occurred. Please try again.'); // Provide user feedback
    }
  };

  // Meta data for Next.js Head (alternative to Helmet)
  const meta = {
    title: 'Home',
    description: 'Welcome to our website.',
    // Add more meta tags as needed
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <HeroSection title={homePageDetails?.Title} description={homePageDetails?.Description} image={`${constant.REACT_APP_URL}/uploads/${homePageDetails.image}`} />

      <section className="about-us-sec py-70">
        <div className="container">
          <h2 className="heading bottom-divider">About us</h2>
          <div className="about-us-inner">
            <AboutSection />
          </div>
        </div>
      </section>

      <section className="coaching-service-sec py-60">
        <div className="container">
          <h2 className="heading text-center d-block">Best in the Industry Coaching Services</h2>
          <div className="row justify-content-center">
            {constant.TEST_PREPARATION.map((x) => {
              return (
                <div key={x.text1} className="col-lg-3 col-md-4 col-6">
                  <div className="coaching-service-box">
                    <img className='mx-auto' src={`/img/${x.imageName}`} alt={x.imageName} />
                    <p className="descp">
                      {x.text1}
                      {x.text2 && <br />}
                      {x.text2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="student-info-sec py-60 linear-bg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="students-info-left">
                <h3 className="sub-heading text-center">
                  Established in <span>2009</span>, this institute is a leader in preparing students for standardized tests like GMAT, GRE, SAT, TOEFL, IELTS, and PTE.
                </h3>
                {studentData.length === 1 ? (
                  <div className="student-info-slider">
                    <div className="student-info-slider-inner">
                      <div className='st-img-field'>
                        {/* Ensure image path is correct for Next.js public directory */}
                        <img src={`${constant.REACT_APP_URL}/uploads/${studentData?.[0].image}`} alt='icon' />
                        <div className='student-info-name-rank'>
                          <div className='st-name'><h5>{studentData[0].name}</h5></div>
                          <div className='st-rank'><p>{studentData[0].courseName} Score</p><h5>{studentData[0].rank}</h5></div>
                        </div>
                      </div>
                      <h6>{studentData[0].content}</h6>
                    </div>
                  </div>
                ) : (
                  <Slider {...slider2settings} className="student-info-slider">
                    {studentData.map((s) => (
                      <div key={s.image} className="student-info-slider-inner">
                        <div className='st-img-field'>
                          {/* Ensure image path is correct for Next.js public directory */}
                          <img src={`${constant.REACT_APP_URL}/uploads/${s.image}`} alt='Student Profile' />
                          <div className='student-info-name-rank'>
                            <div className='st-name'><h5>{s.name}</h5></div>
                            <div className='st-rank'><p>{s.courseName} Score</p><h5>{s.rank}</h5></div>
                          </div>
                        </div>
                        <h6>{s.content}</h6>
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="students-info-right">
                <div className="register-form">
                  <h3 className="sub-heading text-center text-uppercase">Register Now</h3>
                  {/* --- Updated Register Form --- */}
                  <form onSubmit={handleSubmitRegister(handleUpdate)}>
                    <div className="input-field">
                      <input
                        type="text"
                        {...registerRegister("name", { required: "Name is required" })}
                        className={`form-control ${registerErrors.name ? 'is-invalid' : ''}`}
                        placeholder="Name"
                      />
                      {registerErrors.name && <div className="invalid-feedback">{registerErrors.name.message}</div>}
                    </div>
                    <div className="input-field">
                      <input
                        type="email"
                        {...registerRegister("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                          }
                        })}
                        className={`form-control ${registerErrors.email ? 'is-invalid' : ''}`}
                        placeholder="Email"
                      />
                      {registerErrors.email && <div className="invalid-feedback">{registerErrors.email.message}</div>}
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        {...registerRegister("mobile", {
                          required: "Phone is required",
                          pattern: {
                            value: /^\d{10,15}$/, // Adjust pattern as needed
                            message: "Invalid phone number"
                          }
                        })}
                        className={`form-control ${registerErrors.mobile ? 'is-invalid' : ''}`}
                        placeholder="Phone"
                      />
                      {registerErrors.mobile && <div className="invalid-feedback">{registerErrors.mobile.message}</div>}
                    </div>
                    <div className="input-field">
                      <select
                        {...registerRegister("studyDestination", { required: "Test Preparation is required" })}
                        className={`form-select ${registerErrors.studyDestination ? 'is-invalid' : ''}`}
                        aria-label="Default select example"
                      >
                        <option value="">Test Preparation</option>
                        <option value='GMAT'>GMAT</option>
                        <option value='IELTS'>IELTS</option>
                        <option value="TOEFL">TOEFL</option>
                        <option value="GRE">GRE</option>
                        <option value="PTE">PTE</option>
                        <option value="SAT">SAT</option>
                      </select>
                      {registerErrors.studyDestination && <div className="invalid-feedback">{registerErrors.studyDestination.message}</div>}
                    </div>
                    <div className="input-field">
                      <textarea
                        {...registerRegister("query")}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows={2}
                        placeholder="Message"
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">SUBMIT</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="student-info-rank-sec">
        <div className="established-sec">
          <p>Since 2009</p>
        </div>
        <Slider {...settings} className="student-info-rank-slider">
          {sliderData.map((s, index) => (
            <div key={index} className="student-info-rank-inner">
              <p className="st-name">{s.name}</p>
              <p className="st-uni-name">{s.courseName} {s.rank}</p>
            </div>
          ))}
        </Slider>
      </section>

      <marquee
        ref={marqueeRef}
        className="marquee-product"
        behavior="alternate"
        direction="right"
        scrollAmount={5}
        onMouseEnter={() => marqueeRef.current?.stop()}
        onMouseLeave={() => marqueeRef.current?.start()}
      >
        {sliderData.map((s, index) => (
          <small key={index} id="studentname">
            {s.name} {s.courseName} <small id="studentscores">{s.rank}</small>
          </small>
        ))}
      </marquee>

      <section className="test-preparation-sec py-70">
        <div className="container">
          <h2 className="heading bottom-divider">Test Preparation</h2>
          <div className="row gy-4 justify-content-center">
            <TestPreparation CourseData = {CourseData}/>
          </div>
        </div>
      </section>

      <section className="our-working-process-sec py-60">
        <div className="container">
          <h2 className="heading text-center d-block mb-3">Our working Process</h2>
          <p className="descp text-center">
            A platform that takes care of everything beforehand. Gateway Abroad sources,<br /> vets, matches and manages all the talents.
          </p>
          <div className="vetting-process-section-inner pt-5 mt-5">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 text-right vetting-process-section-left" style={{ position: 'relative' }}>
                <div className="vetting-content vp1 vetting-left-p1">
                  <div className="vetting-box">
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img className='ml-auto' src="/img/vetting2.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#00817d' }}>Teach</h3>
                    <p className="vetting-subtittle">
                      Guiding individuals through a comprehensive process aimed at clearing the fundamentals of the students.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp2 vetting-left-p1">
                  <div className="vetting-box">
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img className='ml-auto' src="/img/vetting4.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#7e5c6a' }}>Feedback & Mock</h3>
                    <p className="vetting-subtittle">
                      Regularly engage in mock exams and feedback sessions to familiarize yourself with the exam environment, improve time management, and identify areas that need further attention.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp3 vetting-left-p1">
                  <div className="vetting-box">
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img className='ml-auto' src="/img/vetting6.svg" alt="ampityinfotech" />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 d-lg-block d-md-none d-none">
                <div className="vetting-number">
                  {/* Ensure image path is correct for Next.js public directory */}
                  <img className='ml-auto' src="/img/vaetting-process-number.svg" alt="ampityinfotech" />
                </div>
              </div>
              <div className="col col-lg-4 col-md-12 col-sm-12 tex-left vetting-process-section-right" style={{ position: 'relative' }}>
                <div className="vetting-content vp4 vetting-left-p2">
                  <div className="vetting-box">
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting1.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ffa515' }}>Counsell</h3>
                    <p className="vetting-subtittle">
                      It involves providing personalized advice to aid students in selecting the most suitable exam for their desired countries.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp5 vetting-left-p2">
                  <div className="vetting-box">
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting3.svg" alt="ampityinfotech" style={{ maxWidth: '100px' }} />
                    <h3 className="vetting-tittle" style={{ color: '#ff5e5b' }}>Practice</h3>
                    <p className="vetting-subtittle">
                      Engaging in regular and focused practice not only enhances one's understanding of the material but also hones skills, refines problem-solving abilities, and builds confidence.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp6 vetting-left-p2">
                  <div className="vetting-box">
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting5.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ff824b' }}>Book Test Date</h3>
                    <p className="vetting-subtittle">Test date booking facility offered by Gateway Abroad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mobile-vetting-process vetting-process-section py-60">
        <div className="container">
          <h2 className="heading text-center d-block mb-3">Our working Process</h2>
          <p className="descp text-center">
            A platform that takes care of everything beforehand. Gateway Abroad sources,<br /> vets, matches and manages all the talents.
          </p>
          <div className="vetting-process-section-inner pt-3">
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12 text-left" style={{ position: 'relative' }}>
                <div className="vetting-content vp4 vetting-left-p2">
                  <div className="vetting-box">
                    <div className="vetting-num">1</div>
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting1.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ffa515' }}>Counsell</h3>
                    <p className="vetting-subtittle">
                      It involves providing personalized advice to aid students in selecting the most suitable exam for their desired countries.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp1 vetting-left-p1">
                  <div className="vetting-box">
                    <div className="vetting-num">2</div>
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting2.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#00817d' }}>Teach</h3>
                    <p className="vetting-subtittle">
                      Guiding individuals through a comprehensive process aimed at clearing the fundamentals of the students.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp5 vetting-left-p2">
                  <div className="vetting-box">
                    <div className="vetting-num">3</div>
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting3.svg" alt="ampityinfotech" style={{ maxWidth: '100px' }} />
                    <h3 className="vetting-tittle" style={{ color: '#ff5e5b' }}>Practice</h3>
                    <p className="vetting-subtittle">
                      Engaging in regular and focused practice not only enhances one's understanding of the material but also hones skills, refines problem-solving abilities, and builds confidence.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp2 vetting-left-p1">
                  <div className="vetting-box">
                    <div className="vetting-num">4</div>
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting4.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#7e5c6a' }}>Feedback & Mock</h3>
                    <p className="vetting-subtittle">
                      Regularly engage in mock exams and feedback sessions to familiarize yourself with the exam environment, improve time management, and identify areas that need further attention.
                    </p>
                  </div>
                </div>
                <div className="vetting-content vp6 vetting-left-p2">
                  <div className="vetting-box">
                    <div className="vetting-num">5</div>
                    {/* Ensure image path is correct for Next.js public directory */}
                    <img src="/img/vetting5.svg" alt="ampityinfotech" />
                    <h3 className="vetting-tittle" style={{ color: '#ff824b' }}>Book Test Date</h3>
                    <p className="vetting-subtittle">Test date booking facility offered by Gateway Abroad.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="student-yt-testimonials py-70">
        <div className="container">
          <h2 className="heading bottom-divider">What Our Students Say</h2>
          <Slider {...youtubeSlider} className="student-yt-slider">
            {video.map((video) => (
              <div className="student-yt-slider-inner" key={video._id}>
                <iframe
                  width={530}
                  height={310}
                  src={`https://www.youtube.com/embed/${video.mediaLink}`}
                  title="YouTube video player"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="our-testimonials py-70">
        <div className="container">
          <h2 className="heading bottom-divider mb-0">Our Testimonials</h2>
          {testimonials.length === 1 ? (
            <div className="our-testimonials-slider-inner single-testmonial">
              <div className="student-test-box">
                <div className="stundent-content"> {/* Note: Typo in class name 'stundent-content' kept */}
                  <div className="d-flex align-items-center justify-content-between">
                    <h6>{testimonials[0].name}</h6>
                    <ul className="list-unstyled d-flex">
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                      <li><span><i className="fa fa-star" /></span></li>
                    </ul>
                  </div>
                  <p className="descp">{testimonials[0].content.substring(0, 250)}</p>
                </div>
                <div className="test-univ-sec">
                  <h5></h5>
                </div>
              </div>
            </div>
          ) : (
            <Slider {...testimonialSlider} className="our-testimonials-slider">
              {testimonials.map((test) => (
                <div className="our-testimonials-slider-inner" key={test._id}>
                  <div className="student-test-box">
                    <div className="stundent-content"> {/* Note: Typo in class name 'stundent-content' kept */}
                      <div className="d-flex align-items-center justify-content-between">
                        <h6>{test.name}</h6>
                        <ul className="list-unstyled d-flex">
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                          <li><span><i className="fa fa-star" /></span></li>
                        </ul>
                      </div>
                      <p className="descp">{test.content.substring(0, 250)}</p>
                    </div>
                    <div className="test-univ-sec">
                      <h5></h5>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </section>

      <section className="blog-section py-70">
        <div className="container">
          <div className="title d-flex justify-content-between align-items-center mb-4">
            <h2 className="heading bottom-divider mb-0">Important Facts &amp; Information</h2>
            {/* Changed Link usage for Next.js */}
            <Link href="/blog" className="ms-4 site-btn">Go to blog</Link>
          </div>
          <div className="blog-section-inner">
            <Slider {...blogSlider} className="blog-section-slider">
              {blogData.map((blog) => (
                // Changed onClick navigation for Next.js
                <div
                  onClick={() => router.push(`/blog-description/${blog.Slug}`)} // For App Router
                  // onClick={() => router.push(`/blog-description/${blog.Slug}`)} // For Pages Router (same method)
                  className="blog-section-slider-inner cursor-pointer p-2"
                  key={blog.id}
                >
                  <div className="blog-card">
                    <div className="card">
                      <div className="card-img-top">
                        {/* Ensure image path is correct for Next.js public directory */}
                        <img src={`${constant.REACT_APP_URL}/uploads/${blog.image}`} alt="blog-img" />
                      </div>
                      <div className="card-body ps-0 pb-0">
                        <h5 className="card-title">
                          {/* Changed Link usage for Next.js */}
                          <Link href={`/blog-description/${blog.Slug}`}>{blog.blogTitle}</Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="app-banner-section">
        <div className="container">
          <div className="app-banner-section-inner">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="app-banner-content-left">
                  <h2 className="mb-3">Become a Partner</h2>
                  <p className="mb-4">Join thousand of instructors and earn money hassle free!</p>
                  {/* Changed Link usage for Next.js */}
                  <Link
                    className="site-btn"
                    href=""
                    data-bs-toggle="modal"
                    data-bs-target="#partnerModal"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="app-banner-content-right text-center">
                  {/* Ensure image path is correct for Next.js public directory */}
                  <img src="/img/partner-img.svg" alt="partner" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Index;