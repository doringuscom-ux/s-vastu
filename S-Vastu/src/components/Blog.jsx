import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BLOGS_API } from '../utils/api';

export default function Blog({ hideHeader = false, limit }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(BLOGS_API);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const displayedPosts = limit ? posts.slice(0, limit) : posts;
  const hasMore = limit && posts.length > limit;

  return (
    <section id="blog" className={`bg-slate-50 relative ${hideHeader ? 'py-10' : 'py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B8860B] font-serif italic tracking-wider text-2xl sm:text-3xl">Our Insights</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-3 mb-6">
              Latest from the <span className="text-[#B8860B]">Blog</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">
              Stay updated with expert tips, scientific explanations, and practical remedies for everyday Vastu compliance.
            </p>
          </div>
        )}

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading blogs...</div>
        ) : displayedPosts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No blog posts found. Please check back later.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <motion.div
                key={post._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col group cursor-pointer"
                whileHover={{ y: -8 }}
              >
                <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.coverImage || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop"}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
                      <span className="text-sm font-bold text-[#D4AF37]">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#B8860B] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6 flex-1 text-sm line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + '...'}
                    </p>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b-2 border-[#D4AF37] pb-1 self-start group-hover:text-[#B8860B] group-hover:border-[#B8860B] transition-colors">
                      Read Article
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-gray-900 font-bold rounded-full hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
              View All Posts
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
