import React from 'react';
import { motion } from 'framer-motion';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Why MEDCON 25 is the Premier Medical Conference of 2025",
      excerpt: "Discover what makes MEDCON 25 the most anticipated medical conference for healthcare professionals and students worldwide.",
      date: "December 19, 2024",
      readTime: "5 min read",
      category: "Conference",
      slug: "why-medcon-25-premier-medical-conference-2025"
    },
    {
      id: 2,
      title: "Top 10 Reasons to Attend MEDCON 25",
      excerpt: "From networking opportunities to cutting-edge research presentations, here's why you shouldn't miss MEDCON 25.",
      date: "December 18, 2024",
      readTime: "4 min read",
      category: "Benefits",
      slug: "top-10-reasons-attend-medcon-25"
    },
    {
      id: 3,
      title: "What to Expect at MEDCON 25: A Complete Guide",
      excerpt: "Your comprehensive guide to MEDCON 25 - from registration to networking events and everything in between.",
      date: "December 17, 2024",
      readTime: "6 min read",
      category: "Guide",
      slug: "what-expect-medcon-25-complete-guide"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Latest from MEDCON
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stay updated with the latest news, insights, and announcements about MEDCON 25
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  <a href={`/blog/${post.slug}`} className="block">
                    {post.title}
                  </a>
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <a 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.a
            href="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            View All Articles
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 