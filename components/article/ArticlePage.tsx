"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Loader from "@/components/loader";
import axiosInstance from "@/services/axiosInstance";

// Replace with your actual API service
const fetchArticles = async ({ page, limit, category, search }: {
  page: number;
  limit: number;
  category?: string;
  search?: string;
}) => {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));
  if (category && category !== 'All') params.set('category', category);
  if (search) params.set('search', search);

  const res = await axiosInstance(`/web/blog?${params.toString()}`);
  if (res.status !== 200) throw new Error('Failed to fetch articles');
  return res?.data
};

const BlogCardSkeleton = () => (
  <div className="w-full">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="w-full h-48 bg-gray-200 animate-pulse rounded-t-xl" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="w-32 h-4 bg-gray-200 animate-pulse rounded" />
          <div className="w-20 h-4 bg-gray-200 animate-pulse rounded" />
        </div>
        <div className="w-3/4 h-5 bg-gray-200 animate-pulse rounded mb-3" />
        <div className="w-full h-3 bg-gray-200 animate-pulse rounded mb-2" />
        <div className="w-5/6 h-3 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  </div>
);

const Blog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category") || "";
  const pageParam = Number(searchParams.get("page") || 1);

  const blogsPerPage = 12;

  const [articles, setArticles] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || '');
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setcategories] = useState([]);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateUrlParams = (page: number, category: string) => {
    const params = new URLSearchParams();
    if (category !== "All") params.set("category", category);
    if (page > 1) params.set("page", page.toString());
    router.push(`/article?${params.toString()}`);
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScroll();
    container.addEventListener("scroll", checkScroll);
    return () => container.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const res = await axiosInstance("/web/cat?limit=100");
      if (res.status !== 200) throw new Error("Failed to fetch categories");
      console.log(res.data);
      setcategories(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchArticlesData = useCallback(
    async (page: number, category: string, search: string) => {
      try {
        setLoading(true);
        const res = await fetchArticles({
          page,
          limit: blogsPerPage,
          category,
          search,
        });

        setArticles(res.data || []);
        setTotalPages(res.pages || 1);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    },
    [blogsPerPage]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(pageParam);
    setSelectedCategory(categoryParam);
    fetchArticlesData(pageParam, categoryParam, debouncedSearchQuery);
  }, [pageParam, categoryParam, debouncedSearchQuery, fetchArticlesData]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e: React.MouseEvent, category: string) => {
    e.preventDefault();
    setSelectedCategory(category);
    setCurrentPage(1);
    updateUrlParams(1, category);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrlParams(page, selectedCategory);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

  const getCoverImageUrl = (coverImage: string) => {
    if (!coverImage) return "/img/placeholder-blog.jpg";
    if (coverImage.startsWith("http")) return coverImage;
    return `https://uat.gatewayabroadeducations.com/uploads/${coverImage}`;
  };

  const renderPagination = () => {
    const pages: (number | string)[] = [];
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
        pages.push("...");
      }
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          &laquo;
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => handlePageChange(Number(page))}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 ${currentPage === page
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          &raquo;
        </button>
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-gradient banner-sec">
        <div className="container max-w-6xl">
          <div className="row align-items-center lg:pt-12 pt-28">
            <div className="col-md-6">
              <div className="banner-content-sec">
                <h1>
                  Study Abroad <span>Articles</span>
                </h1>
                <p>Abroad Insights: News and Tips for Students</p>
                <div className="hero-search-field position-relative">
                  <span>
                    <i className="fa fa-search" />
                  </span>
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

      {/* Blog Section */}
      <section className="py-16 pt-6 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="relative mb-12">
            {showLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex space-x-2 overflow-x-auto no-scrollbar py-2 px-1"
              style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
            >
              <button
                key={'all'}
                onClick={(e) => handleCategoryChange(e, '')}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory == '' || selectedCategory == null
                  ? "bg-red-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
              >
                {'All'}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={(e) => handleCategoryChange(e, cat._id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 ${selectedCategory === cat._id
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {showRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200"
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 9 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))
              : articles.map((article) => (
                <div
                  key={article.slug}
                  onClick={() => router.push(`/article/${article.slug}`)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:scale-[1.02]">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getCoverImageUrl(article.coverImage)}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 pt-2 pb-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Image
                            src="/img/date-icon.svg"
                            alt="calendar"
                            width={16}
                            height={16}
                          />
                          <span>{formatDate(article.createdAt)}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2.5">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && renderPagination()}

          {/* No Results */}
          {!loading && articles.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default function AllArticles() {
  return (
    <Suspense fallback={<BlogCardSkeleton />}>
      <Blog />
    </Suspense>
  );
}