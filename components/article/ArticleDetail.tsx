'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { constant } from '@/constant/index.constant';
import axiosInstance from '@/services/axiosInstance';
import { useGlobal } from '@/hooks/AppStateContext';

const sanitizeContent = (content) => {
    return { __html: content || '' };
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
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [commentForm, setCommentForm] = useState({
        name: '',
        email: '',
        content: '',
        parentCommentId: null
    });
    const { user, course, logout, drawer, setDrawer } = useGlobal();

    const [replyingTo, setReplyingTo] = useState(null);
    const [showReplies, setShowReplies] = useState({});

    useEffect(() => {
        if (!article?._id) return;

        let startTime = Date.now();
        let isVisible = true;
        const handleVisibilityChange = () => {
            if (document.hidden) {
                isVisible = false;
            } else {
                isVisible = true;
                startTime = Date.now() - totalPausedTime;
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        let totalPausedTime = 0;
        let lastPauseTime = null;

        const reportReadTime = async () => {
            const endTime = Date.now();
            let activeDuration = Math.floor((endTime - startTime - totalPausedTime) / 1000); // seconds

            if (activeDuration > 0) {
                try {
                    await axiosInstance.post(`/web/blog/log/${article._id}`, {
                        readDuration: activeDuration,
                    });
                } catch (error) {
                    console.warn('Failed to log read time', error);
                }
            }
        };

        const interval = setInterval(() => {
            if (isVisible) {
                const currentDuration = Math.floor((Date.now() - startTime - totalPausedTime) / 1000);
                if (currentDuration > 0) {
                    axiosInstance.post(`/web/blog/log/${article._id}`, {
                        readDuration: currentDuration,
                    }).catch(console.error);
                    totalPausedTime = 0;
                    lastPauseTime = Date.now();
                }
            }
        }, 30000);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(interval);
            reportReadTime();
        };
    }, [article?._id]);


    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/web/comments/${article._id}`);

            if (response.data.success) {
                setComments(response.data.data.comments || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (article?.slug) {
            fetchComments();
        }

    }, [article?.slug]);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // useEffect(() => {
    //     const updateViewCount = async () => {
    //         if (article?._id) {
    //             try {
    //                 await axiosInstance.put(`/web/blog/${article._id}/view`);
    //             } catch (error) {
    //                 console.error('Error updating view count:', error);
    //             }
    //         }
    //     };

    //     updateViewCount();
    // }, [article?._id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setDrawer(true);
            return;
        }

        try {
            const response = await axiosInstance.post('/web/comments/create', {
                articleId: article._id,
                content: commentForm.content,
                parentCommentId: commentForm.parentCommentId
            });
            if (response) {
                setCommentForm({
                    name: '',
                    email: '',
                    content: '',
                    parentCommentId: null
                });
                setReplyingTo(null);
                const response = await axiosInstance.get(`/web/comments/${article._id}`);
                if (response) {
                    setComments(response.data.data.comments || []);
                }
                alert('Comment posted successfully! It will appear after admin approval.');
            } else {
                alert(response.data.message || 'Error posting comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Error posting comment');
        }
    };

    const handleReply = (commentId, authorName) => {
        setReplyingTo(commentId);
        setCommentForm(prev => ({
            ...prev,
            content: `@${authorName} `,
            parentCommentId: commentId
        }));
        // Scroll to comment form
        document.getElementById('comment-form').scrollIntoView({ behavior: 'smooth' });
    };

    const handleCancelReply = () => {
        setReplyingTo(null);
        setCommentForm(prev => ({
            ...prev,
            content: '',
            parentCommentId: null
        }));
    };

    const handleLike = async (commentId) => {
        try {
            const response = await axiosInstance.post(`/web/${commentId}/like`);

            if (response.data.success) {
                fetchComments();
            }
        } catch (error) {
            console.error('Error liking comment:', error);
        }
    };

    const handleDislike = async (commentId) => {
        try {
            const response = await axiosInstance.post(`/web/${commentId}/dislike`);

            if (response.data.success) {
                fetchComments();
            }
        } catch (error) {
            console.error('Error disliking comment:', error);
        }
    };

    const toggleReplies = (commentId) => {
        setShowReplies(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

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
                        <Link href="/blog" className="hover:text-blue-600 transition-colors">Articles</Link>
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
                        <div className="flex items-center space-x-2">
                            <span>⏱️</span>
                            <span>{Math.floor(article.readTime / 60) || 2} min read</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>👁️</span>
                            <span>{article.viewCount || 0} views</span>
                        </div>
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
                                    src={article.slug == "preparing-for-toefl-speaking-section" ? `https://gatewayabroadeducations.com/uploads/${article.coverImage}` : `https://uat.gatewayabroadeducations.com/uploads/${article.coverImage}`}
                                    alt={article.title}
                                    className="w-full h-auto"
                                    loading="lazy"
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
                                        <a
                                            target="_blank"
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${constant.REACT_APP_URL}/blog/${article.Slug}`)}`}
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <i className="fa fa-facebook text-lg"></i>
                                        </a>
                                        <a
                                            target="_blank"
                                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${constant.REACT_APP_URL}/blog/${article.Slug}`)}`}
                                            className="text-gray-600 hover:text-blue-400 transition-colors"
                                        >
                                            <i className="fa fa-twitter text-lg"></i>
                                        </a>
                                        <a
                                            target="_blank"
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${constant.REACT_APP_URL}/blog/${article.Slug}`)}`}
                                            className="text-gray-600 hover:text-blue-800 transition-colors"
                                        >
                                            <i className="fa fa-linkedin text-lg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="border-t border-gray-200 pt-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        Comments ({comments.length})
                                    </h3>
                                    {comments.length > 0 && (
                                        <button
                                            onClick={() => document.getElementById('comment-form').scrollIntoView({ behavior: 'smooth' })}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                        >
                                            Add Comment
                                        </button>
                                    )}
                                </div>

                                {/* Comment Form */}
                                <div id="comment-form" className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                                        {replyingTo ? 'Reply to Comment' : 'Leave a Comment'}
                                    </h4>
                                    {replyingTo && (
                                        <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
                                            <span className="font-medium">Replying to:</span> {commentForm.content.split(' ')[0]}
                                            <button
                                                onClick={handleCancelReply}
                                                className="ml-2 text-red-600 hover:text-red-800 text-xs"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-gray-600 text-sm mb-4">Your email address will not be published.</p>
                                    <form onSubmit={handleCommentSubmit} className="space-y-4">
                                        <textarea
                                            placeholder="Your Comment *"
                                            rows="2"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                            value={commentForm.content}
                                            onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                            required
                                        ></textarea>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 btn-primary py-2"
                                        >
                                            Post {replyingTo ? 'Reply' : 'Comment'}
                                        </button>
                                    </form>
                                </div>

                                {/* Comments List */}
                                {loading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    </div>
                                ) : (
                                    <div className=" border border-gray-200 rounded-lg p-2">
                                        {comments.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500">
                                                <p>No comments yet. Be the first to share your thoughts!</p>
                                            </div>
                                        ) : (
                                            comments.slice(0, 5).map((comment) => (
                                                <div key={comment._id} className=" rounded-xl p-2 bg-white hover:shadow-sm transition-shadow">
                                                    <div className="flex items-start space-x-2">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <span className="text-blue-600 font-medium">
                                                                    {comment.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <div>
                                                                    <span className="font-medium text-gray-900 text-sm">
                                                                        {comment.author.name || 'Anonymous'}
                                                                    </span>
                                                                </div>
                                                                <span className="text-xs text-gray-500">
                                                                    {formatDate(comment.createdAt)}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
                                                            <div className="flex items-center space-x-3 text-xs">
                                                                <button
                                                                    onClick={() => handleLike(comment._id)}
                                                                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                                                                >
                                                                    <i className="fa fa-thumbs-up"></i>
                                                                    <span>{comment.likes?.length || 0}</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDislike(comment._id)}
                                                                    className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
                                                                >
                                                                    <i className="fa fa-thumbs-down"></i>
                                                                    <span>{comment.dislikes?.length || 0}</span>
                                                                </button>
                                                                <button
                                                                    onClick={() => handleReply(comment._id, comment.author.name)}
                                                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                                                >
                                                                    Reply
                                                                </button>
                                                            </div>

                                                            {/* Replies Section */}
                                                            {comment.nestedReplies && comment.nestedReplies.length > 0 && (
                                                                <div className="mt-3 space-y-3">
                                                                    {/* Show all replies if toggled, otherwise show first 2 */}
                                                                    {(showReplies[comment._id]
                                                                        ? comment.nestedReplies
                                                                        : comment.nestedReplies.slice(0, 2)
                                                                    ).map((reply) => (
                                                                        <div key={reply._id} className="flex items-start space-x-2 ml-2">
                                                                            <div className="flex-shrink-0">
                                                                                <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                                                                                    <span className="text-purple-600 font-medium text-xs">
                                                                                        {reply.author?.name?.charAt(0)?.toUpperCase() || 'A'}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center justify-between mb-1">
                                                                                    <div>
                                                                                        <span className="font-medium text-gray-900 text-xs">
                                                                                            {reply.author?.name || 'Anonymous'}
                                                                                        </span>
                                                                                    </div>
                                                                                    <span className="text-xs text-gray-500">
                                                                                        {formatDate(reply.createdAt)}
                                                                                    </span>
                                                                                </div>
                                                                                <p className="text-gray-700 text-xs">{reply.content}</p>
                                                                                <div className="flex items-center space-x-3 text-xs mt-1">
                                                                                    <button
                                                                                        onClick={() => handleLike(reply._id)}
                                                                                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
                                                                                    >
                                                                                        <i className="fa fa-thumbs-up"></i>
                                                                                        <span>{reply.likes?.length || 0}</span>
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => handleDislike(reply._id)}
                                                                                        className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
                                                                                    >
                                                                                        <i className="fa fa-thumbs-down"></i>
                                                                                        <span>{reply.dislikes?.length || 0}</span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}

                                                                    {/* Toggle Replies Button */}
                                                                    {comment.nestedReplies.length > 2 && (
                                                                        <button
                                                                            onClick={() => toggleReplies(comment._id)}
                                                                            className="mt-2 text-xs text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                                                                        >
                                                                            {showReplies[comment._id]
                                                                                ? 'Hide replies'
                                                                                : `View ${comment.nestedReplies.length - 2} more replies`}
                                                                            <i className={`ml-1 text-xs ${showReplies[comment._id] ? 'fa fa-chevron-up' : 'fa fa-chevron-down'}`}></i>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                        {/* Show more comments button if there are more than 5 */}
                                        {comments.length > 5 && (
                                            <div className="text-center pt-4">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                                    onClick={() => alert('Showing all comments would require backend pagination implementation')}
                                                >
                                                    Load more comments
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Compact Sidebar */}
                        <div className={`lg:w-4/12 ${isSticky ? 'lg:sticky lg:top-4' : ''}`}>
                            <div className="space-y-2">
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
                                                        src={`${constant.REACT_APP_URL}/uploads/${item.coverImage || item.image}`}
                                                        alt={item.title || item.blogTitle}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2 leading-tight">
                                                        {item.title || item.blogTitle}
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
                                    <div className="space-y-1">
                                        {['GMAT', 'TOEFL', 'IELTS', 'GRE', 'PTE', 'SAT', 'SPOKEN ENGLISH'].map((category) => (
                                            <Link
                                                key={category}
                                                href={`/blog?category=${encodeURIComponent(category)}`}
                                                className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                                            >
                                                <span>{category}</span>
                                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                                    {latestArticles.filter(item =>
                                                        item.category === category ||
                                                        item.category?.name === category
                                                    ).length}
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
                                                        {item.title || item.blogTitle}
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
                                    <img className='mx-auto' src="/img/help-support-img.svg" alt="Help & Support" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}