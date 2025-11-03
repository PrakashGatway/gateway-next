// app/blog/[slug]/ArticleClient.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { constant } from '@/constant/index.constant';
import DOMPurify from 'dompurify';

const sanitizeContent = (content) => {
    return { __html: DOMPurify.sanitize(content || '') };
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export default function ArticleClient({
    article,
    similarArticles = [],
    latestArticles = [],
}) {

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!article || !article.slug) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center max-w-sm">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📄</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">Article Not Found</h1>
                    <Link
                        href="/blog"
                        className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Back to Articles
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Compact Hero */}
            <section className="hero-gradient py-8">
                <div className="container-sm mx-auto px-4 pt-24 pb-8">
                    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                        <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
                        <span>›</span>
                        <Link href="/article" className="hover:text-blue-600 transition-colors">Articles</Link>
                        <span>›</span>
                        <span className="text-gray-900 font-medium truncate">{article.title}</span>
                    </nav>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                            <span>📅</span>
                            <span>{formatDate(article.createdAt)}</span>
                        </div>
                        {article.category && (
                            <div className="flex items-center space-x-2">
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                                    {article.category.name}
                                </span>
                            </div>
                        )}
                        {/* <div className="flex items-center space-x-2">
              <span>⏱️</span>
              <span>5 min read</span>
            </div> */}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-8">
                <div className="container-sm mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Article Content */}
                        <div className="lg:w-8/12">
                            {/* Featured Image */}
                            <div className="rounded-xl overflow-hidden mb-6">
                                <img
                                    src={`https://uat.gatewayabroadeducations.com/uploads/${article.coverImage}`}
                                    alt={article.title}
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Article Body */}
                            <article className="prose prose-gray max-w-none">
                                <div
                                    className="text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={sanitizeContent(decodeURIComponent(escape(atob(article.content))))}
                                />
                            </article>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-8 mb-6">
                                {article.category && (
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                                        #{article.category?.name}
                                    </span>
                                )}
                                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm">
                                    #Education
                                </span>
                            </div>

                            {/* Social Share */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Share this article:</span>
                                    <div className="flex space-x-3">
                                        <Link
                                            target="_blank"
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${constant.REACT_APP_URL}/blog/${article.Slug}`)}`}
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <i className="fa fa-facebook text-lg"></i>
                                        </Link>
                                        <Link
                                            target="_blank"
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${constant.REACT_APP_URL}/blog/${article.Slug}`)}`}
                                            className="text-gray-600 hover:text-blue-400 transition-colors"
                                        >
                                            <i className="fa fa-twitter text-lg"></i>
                                        </Link>
                                        <Link
                                            target="_blank"
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${constant.REACT_APP_URL}/blog/${article.Slug}`)}`}
                                            className="text-gray-600 hover:text-blue-800 transition-colors"
                                        >
                                            <i className="fa fa-linkedin text-lg"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Comment Form */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h4 className="text-lg font-bold text-gray-900 mb-2">Leave a Comment</h4>
                                <p className="text-gray-600 text-sm mb-4">Your email address will not be published.</p>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Your Name *"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            required
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your Email *"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            required
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Your Comment *"
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                        required
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Post Comment
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Compact Sidebar */}
                        <div className={`lg:w-4/12 ${isSticky ? 'lg:sticky lg:top-4' : ''}`}>
                            <div className="space-y-6">
                                {/* Search */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="relative">
                                        <input
                                            type="search"
                                            placeholder="Search articles..."
                                            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm"
                                        />
                                        <i className="fa fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                                    </div>
                                </div>

                                {/* Latest Articles */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h5 className="font-bold text-gray-900 mb-3">Latest Articles</h5>
                                    <div className="space-y-3">
                                        {latestArticles.slice(0, 4).map((item) => (
                                            <Link
                                                key={item.Slug}
                                                href={`/blog/${item.Slug}`}
                                                className="flex items-center space-x-3 group hover:no-underline"
                                            >
                                                <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden">
                                                    <img
                                                        src={`${constant.REACT_APP_URL}/uploads/${item.image}`}
                                                        alt={item.blogTitle}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-tight">
                                                        {item.blogTitle}
                                                    </p>
                                                    <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h5 className="font-bold text-gray-900 mb-3">Categories</h5>
                                    <div className="space-y-2">
                                        {['GMAT', 'TOEFL', 'IELTS', 'GRE', 'PTE', 'SAT', 'SPOKEN ENGLISH'].map((category) => (
                                            <Link
                                                key={category}
                                                href={`/blog?category=${encodeURIComponent(category)}`}
                                                className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                                <span>{category}</span>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                    {latestArticles.filter(item => item.category === category).length}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Similar Articles */}
                                {similarArticles.length > 0 && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h5 className="font-bold text-gray-900 mb-3">Related Articles</h5>
                                        <div className="space-y-3">
                                            {similarArticles.map((item) => (
                                                <Link
                                                    key={item.Slug}
                                                    href={`/blog/${item.Slug}`}
                                                    className="block p-3 bg-white rounded border border-blue-100 hover:border-blue-300 transition-colors group"
                                                >
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                                                        {item.blogTitle}
                                                    </p>
                                                    <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compact CTA */}
            <section className="app-banner-section">
                <div className="container">
                    <div className="app-banner-section-inner app-banner-section-inner-2">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="app-banner-content-left">
                                    <h2 className="mb-3">Have a question about GMAT?</h2>
                                    <p className="mb-4">Want some help figuring out what kind of prep service is right for you?</p>
                                    <Link className="site-btn" href="/contact">Help &amp; Support</Link>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="app-banner-content-right text-center mx-auto">
                                    <img className='mx-auto' src="/img/help-support-img.svg" alt="Help & Support" /> {/* Use relative path if local */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}