"use client"; // Required because of hooks, state, and event handlers

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // For App Router
import PageServices from '../services/PageServices'; // Ensure path is correct
import useAsync from '../hooks/useAsync'; // Ensure path is correct
import { useForm } from 'react-hook-form';
import LocationAvailability from './sections/cityLocation';
import axiosInstance from '@/services/axiosInstance';
import { Globe } from 'lucide-react';

export const Footer = () => {
  const { data } = useAsync(PageServices.getSettingData);
  const { data: course } = useAsync(PageServices.getCourse);
  const [CourseData, setCourseData] = useState([]);
  const router = useRouter(); // For App Router
  const [contactData, setContactData] = useState([]);
  const [cityPage, setCityPage] = useState([]);
  const [countryPage, setCountyPage] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
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
  const {
    register: registerNewsletter,
    handleSubmit: handleSubmitNewsletter,
    formState: { errors: newsletterErrors },
    reset: resetNewsletterForm
  } = useForm({
    defaultValues: {
      newsEmail: ''
    }
  });

  useEffect(() => {
    if (course?.data?.page) {
      setCourseData(course.data.page);
    }
    if (data?.data?.setting) {
      setContactData(data.data.setting);
    }
  }, [data, course]);

  async function getPageData(type, setState) {
    const response = await axiosInstance.get(`/page/list/type?type=${type}&featured=true`);
    if (response.data?.data) {
      setState(response.data.data);
    }
  }

  useEffect(() => {
    getPageData('city_page', setCityPage);
    getPageData('country_page', setCountyPage);
  }, []);

  const handleUpdate = async (formData) => {
    const { name, email, mobile, city, message } = formData;
    try {
      setLoading(true);

      let src = 'website' as any;

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const from = params.get("src")
        if (from == 'facebook') {
          src = 'facebook';
        }
      }

      let response = await axiosInstance.post('/leads', {
        fullName: name, email, phone: mobile, source: src || "website", coursePreference: "unfilled", countryOfResidence: city, extraDetails: {
          message,
          type: 'contact'
        }
      })

      if (response.data.success) {
        resetContactForm(); // Reset the contact form fields
        const modalEl = document.getElementById("getintouchModel");
        if (modalEl) {

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
        router.push('/thank-you');
      } else {
        console.error('Contact form submission failed:', createJob);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate2 = async (formData) => { // Renamed 'data' to 'formData' for clarity
    const { newsEmail } = formData;
    try {
      // Make an API call to subscribe
      const createJob = await PageServices.addEmail({
        email: newsEmail,
        Subscribed: 'Yes'
      });
      if (createJob.status === 'success') {
        resetNewsletterForm(); // Reset the newsletter form field
      } else {
        console.error('Newsletter subscription failed:', createJob);
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
    }
  };

  return (
    <>
      <footer>
        <div className="footer-inner">
          <div className="container-sm mx-auto">
            <h4 className="text-sm font-semibold text-gray-800 inline-block px-1 py-1 rounded-full mb-3 ">
              🌍 Choose Your Destination
            </h4>
            <div className="flex gap-1 flex-wrap justify-start items-center sm:gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-3">

              {countryPage.map((country, index) => {
                const slug = country?.slug?.toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link
                    key={index}
                    href={`/study-in-${slug}`}
                    className={`relative flex flex-wrap items-center justify-center px-3 sm:px-3 py-2 rounded-full text-sm md:text-xs font-medium capitalize whitespace-nowrap transition-all duration-300 !border !border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm text-gray-700 `}
                  >
                    {country?.slug.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          </div>
          {<LocationAvailability cities={cityPage} />}

          <div className="container-sm">
            <div className="row">
              <div className="col-lg-4 col-sm-6">
                <div className="footer-left">
                  <div className="logo-sec">
                    <Link href="/">
                      <img src="/img/ga-logo.svg" alt="logo" />
                    </Link>
                  </div>
                  <div className="footer-desc">
                    <p>Gateway Abroad (an educational consultant) has been counselling and assisting students to study in the UK, IRELAND, AUSTRALIA, the USA, CANADA, NEW ZEALAND, SINGAPORE, and other countries for 15+ years.</p>
                  </div>
                  <div className="social-media-sec">
                    <h4 className="footer-title">Follow us</h4>
                    <ul className="d-flex list-unstyled">
                      {/* Ensure contactData fields exist and have values */}
                      <li><Link href={contactData.facebook || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" /></Link></li>
                      <li><Link href={contactData.tweeter || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-quora" /></Link></li>
                      <li><Link href={contactData.googlePlus || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-google-plus" /></Link></li>
                      <li><Link href={contactData.pintrest || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-pinterest" /></Link></li>
                      <li><Link href={contactData.instagram || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" /></Link></li>
                      <li><Link href={contactData.linkdin || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin" /></Link></li>
                      <li><Link href={contactData.youtube || "#"} target="_blank" rel="noopener noreferrer"><i className="fa fa-youtube" /></Link></li>
                      {/* WhatsApp Link */}
                      <li>
                        <Link
                          href={`https://api.whatsapp.com/send?phone=${contactData.contectOne ? encodeURIComponent(contactData.contectOne) : ""}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <i className="fa fa-whatsapp" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="footer-middle pl-5">
                  {/* Quick Links */}
                  <div className="footer-menu">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="list-unstyled">
                      <li><Link href="/">Home</Link></li>
                      <li><Link href="/about">About Us</Link></li>
                      <li><Link href="/spoken-english">Spoken English</Link></li>
                      <li><Link href="/blog">Blog</Link></li>
                      <li><Link href="/article">Articles</Link></li>
                      <li><Link href="/study-abroad">Study Abroad</Link></li>
                      <li><Link href="/career">Career</Link></li>
                      <li><Link href="/contact">Contact Us</Link></li>
                      <li><Link href="/gallary">Gallery</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="footer-middle ps-2">
                  {/* Study in Countries */}
                  <div className="footer-menu mt-0">
                    <h4 className="footer-title">Test Preparation</h4>
                    <ul className="list-unstyled">
                      {CourseData?.map((course) => (
                        <li key={course.pageName}>
                          <Link href={`/course/${course.pageName.toLowerCase()}`}>
                            {course.pageName}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-8">
                <div className="footer-right">
                  <div className="footer-contact">
                    <h4 className="footer-title">Contact us</h4>
                    <ul className="list-unstyled">
                      {/* Google Maps Link */}
                      <li>
                        <Link
                          target='_blank'
                          rel="noopener noreferrer"
                          href={`https://maps.app.goo.gl/${contactData.officeAdress ? encodeURIComponent(contactData.officeAdress) : ""}`}
                        >
                          {contactData.officeAdress || "Address not available"}
                        </Link>
                      </li>
                      <li>
                        <span>
                          <i className="fa fa-whatsapp" />
                        </span>
                        {/* WhatsApp and Phone Links */}
                        {contactData.contectOne && (
                          <Link href={`https://api.whatsapp.com/send?phone=${encodeURIComponent(contactData.contectOne)}`}>
                            {contactData.contectOne}
                          </Link>
                        )} {' '}
                        {contactData.contectTwo && (
                          <Link href={`tel:${contactData.contectTwo}`}> {contactData.contectTwo}</Link>
                        )} {' '}
                        {contactData.contectThree && (
                          <Link href={`tel:${contactData.contectThree}`}> {contactData.contectThree}</Link>
                        )}
                      </li>
                      <li>
                        <span><i className="fa fa-envelope-o" /></span>
                        {/* Email Link */}
                        {contactData.email && <Link href={`mailto:${contactData.email}`}>{contactData.email}</Link>}
                      </li>
                    </ul>
                  </div>
                  <div className="footer-newsletter mt-4">
                    <h4 className="footer-title">Newsletter</h4>
                    {/* Use handleSubmitNewsletter and registerNewsletter */}
                    <form onSubmit={handleSubmitNewsletter(handleUpdate2)}>
                      <input
                        type="email"
                        {...registerNewsletter("newsEmail", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email address"
                          }
                        })}
                        className={`form-control ${newsletterErrors.newsEmail ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                      />
                      {newsletterErrors.newsEmail && <div className="invalid-feedback d-block">{newsletterErrors.newsEmail.message}</div>}
                      <button type="submit">Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom text-center py-3">
          <p>Copyrights © {new Date().getFullYear()} All Rights Reserved by Gateway Abroad.</p>
        </div>
      </footer>
      <div className="scroll_top">
        <Link href="#" id="scroll-button" style={{ display: 'block' }} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><i className="fa fa-angle-up" /></Link>
      </div>
      <div style={{ zIndex: '99!important' }} className="get-in-touch-sidebar">
        <button data-bs-toggle="modal" data-bs-target="#getintouchModel"><span className="content-red"><i className="fa fa-envelope-o me-2" /> Get in touch</span><span className="content-dark"><i className="fa fa-long-arrow-down" /></span></button>
      </div>

      <div className="modal right fade" id="getintouchModel" tabIndex={-1} aria-labelledby="getintouchModelLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="getintouchModelLabel">Get in touch</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className="get-in-touch-form">
                <form onSubmit={handleSubmitContact(handleUpdate)}>
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
                          value: /^\d{10,15}$/, // Adjust pattern as needed
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
                  <button disabled={loading} type="submit">{loading ? 'SUBMITTING...' : 'SUBMIT'}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;