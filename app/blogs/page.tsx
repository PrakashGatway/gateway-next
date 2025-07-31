"use client"
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import PageServices from '@/services/PageServices';
import { constant } from '@/constant/index.constant';

const BlogCardSkeleton = () => (
  <div className="col-md-6 col-lg-4">
    <div className="blog-card">
      <div className="blog-card-img-box" style={{ backgroundColor: '#6c757d91', height: '200px', borderRadius: '8px' }} />
      <div className="blog-card-content mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="skeleton-line w-50 h-3 bg-secondary rounded" />
          <div className="skeleton-line w-25 h-3 bg-secondary rounded" />
        </div>
        <div className="skeleton-line w-75 h-4 mb-2 bg-secondary rounded" />
        <div className="skeleton-line w-100 h-3 mb-1 bg-secondary rounded" />
        <div className="skeleton-line w-90 h-3 bg-secondary rounded" />
      </div>
    </div>
  </div>
);

const Blog = () => {
  const router = ''
  const { category: name, page: pageParam } = {};
  const blogsPerPage = 12;

  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(() => {
    return pageParam ? parseInt(pageParam) : 1;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(name || 'All');
  const [loading, setLoading] = useState(false);

  const updateUrlParams = useCallback((page, category) => {
    const query = {};
    if (category && category !== 'All') query.category = category;
    if (page > 1) query.page = page;
    
    router.push({
      pathname: router.pathname,
      query: query
    }, undefined, { shallow: true });
  }, [router]);

  const fetchBlogs = useCallback(async (page, category, search) => {
    try {
      setLoading(true);
      const res = await PageServices.getBlogData({ 
        page, 
        limit: blogsPerPage, 
        category, 
        search 
      });
      
      setBlogs(res.data.blog || []);
      setTotalPages(res.totalPages || 1);

      if (res.data.blog?.length === 0 && page > 1) {
        const newPage = 1;
        setCurrentPage(newPage);
        updateUrlParams(newPage, category);
      }
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  }, [blogsPerPage, updateUrlParams]);

  // Handle initial load and URL changes
  useEffect(() => {
    const page = pageParam ? parseInt(pageParam) : 1;
    const category = name || 'All';
    
    if (page !== currentPage) {
      setCurrentPage(page);
    }
    if (category !== selectedCategory) {
      setSelectedCategory(category);
    }
    
    fetchBlogs(page, category, debouncedSearchQuery);
  }, [pageParam, name]); // Only run when URL params change

  // Handle search debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Handle search changes
  useEffect(() => {
    if (debouncedSearchQuery !== '') {
      fetchBlogs(currentPage, selectedCategory, debouncedSearchQuery);
    } else {
      fetchBlogs(currentPage, selectedCategory, '');
    }
  }, [debouncedSearchQuery, currentPage, selectedCategory, fetchBlogs]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
    updateUrlParams(currentPage, category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateUrlParams(page, selectedCategory);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

  const sanitizedData = (content) => ({
    __html: content,
  });

  const renderPagination = () => {
    const pages = [];
    const visibleRange = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - visibleRange && i <= currentPage + visibleRange)
      ) {
        pages.push(i);
      } else if (
        i === currentPage - visibleRange - 1 ||
        i === currentPage + visibleRange + 1
      ) {
        pages.push('...');
      }
    }

    return (
      <ul className="pagination justify-content-center flex-wrap">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link p-0" onClick={() => handlePageChange(currentPage - 1)}>
            &laquo;
          </button>
        </li>
        {pages.map((page, i) =>
          page === '...' ? (
            <li key={i} className="page-item disabled">
              <span className="page-link p-0">...</span>
            </li>
          ) : (
            <li key={i} className={`page-item ${currentPage === page ? 'active' : ''}`}>
              <button className="page-link p-0" onClick={() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          )
        )}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link p-0" onClick={() => handlePageChange(currentPage + 1)}>
            &raquo;
          </button>
        </li>
      </ul>
    );
  };

  return (
    <>
      <section className="hero-gradient banner-sec">
        <div className="container">
          <div className="row align-items-center lg:pt-12 pt-28">
            <div className="col-md-6">
              <div className="banner-content-sec">
                <h1>Study Abroad <span>Blogs</span></h1>
                <p>Abroad Insights: News and Tips for Students</p>
                <div className="hero-search-field position-relative">
                  <span><i className="fa fa-search" /></span>
                  <input
                    type="search"
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="What are you looking for?"
                  />
                  <button className="site-btn-2 site-btn">Search</button>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <Image 
                src="/img/blog-banner-img.svg" 
                alt="blog banner" 
                width={500}
                height={300}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="blog-b-section py-4">
        <div className="container">
          <div className="mb-4">
            <div className="blog-tab-scroll blog-tab d-flex flex-nowrap gap-2 overflow-auto">
              {constant.COURSE_MENU.map((cat) => (
                <button
                  key={cat.name}
                  className={`nav-link btn btn-outline-secondary flex-shrink-0 ${selectedCategory === cat.value ? 'active' : ''}`}
                  onClick={(e) => handleCategoryChange(e, cat.value)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-section-inner row gy-4">
            {loading
              ? Array.from({ length: 9 }).map((_, index) => <BlogCardSkeleton key={index} />)
              : blogs.map((blog) => (
                <div key={blog.Slug} className="col-md-6 col-lg-4">
                  <div
                    onClick={() => router.push(`/blog-description/${blog.Slug}`)}
                    className="blog-card cursor-pointer"
                  >
                    <div className="blog-card-img-box">
                      <Image
                        src={`${constant.REACT_APP_URL}/uploads/${blog.image}`}
                        alt={blog.image}
                        width={400}
                        height={250}
                        layout="responsive"
                      />
                    </div>
                    <div className="blog-card-content">
                      <ul className="list-unstyled d-flex justify-content-between align-items-center">
                        <li>
                          <span>
                            <Image 
                              src="/img/date-icon.svg" 
                              alt="calendar" 
                              width={16}
                              height={16}
                            />
                          </span>
                          <span>{formatDate(blog.createdAt)}</span>
                        </li>
                      </ul>
                      <h5>{blog.blogTitle}</h5>
                      <p
                        className="sub_text_blog"
                        dangerouslySetInnerHTML={sanitizedData(blog.blogDescription)}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-4">{renderPagination()}</nav>
          )}
        </div>
      </section>

      <section className="app-banner-section counselling-session-sec">
        <div className="container">
          <div className="row align-items-center app-banner-section-inner app-banner-section-inner-2 px-6">
            <div className="app-banner-content-left col-lg-7">
              <h2 className="mb-3">Avail A Complementary Counselling Session</h2>
              <p className="mb-4">Join thousands of students and start your journey abroad!</p>
              <button className="site-btn" onClick={() => router.push('/contact')}>Contact us</button>
            </div>
            <div className="col-lg-5 app-banner-content-right mx-auto">
              <Image 
                src="/img/counselling-session.svg" 
                alt="counselling" 
                width={360}
                height={280}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;