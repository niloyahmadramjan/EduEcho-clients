import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ThumbsUp, MessageCircle } from "lucide-react";
import AuthUser from "../../services/Hook/AuthUser";
import LoadingAnimation from "../loadingPage/LoadingAnimation";

const MyArticles = () => {
  const { user } = AuthUser();
  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/myArticles?email=${user.email}`
        );
        const sliced = data.slice(0, 6);
        if (showArticles) {
          setArticles(sliced);
          return;
        }
        setArticles(data);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [showArticles, user]);

  if (loading) {
    return <LoadingAnimation />;
  }
  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">My Articles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-base-100 shadow-md rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl"
          >
            {/* Image Header */}
            <div className="h-48 md:h-52 lg:h-56 w-full bg-gray-100 overflow-hidden">
              <img
                src={article.thumbnail}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="p-5 flex flex-col flex-grow">
              {/* Tags */}
              <div className="flex items-center gap-3 mb-2 text-sm text-gray-500">
                <span className="bg-gray-200 text-xs font-medium px-2 py-0.5 rounded-full">
                  {article.category}
                </span>
                <span>{article.read_time || "5 min read"}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-base-content mb-1">
                {article.title}
              </h3>

              {/* Short description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {article.content.slice(0, 120)}...
              </p>

              {/* Author Info + Date */}
              <div className="mt-auto pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author_photo}
                    alt={article.author_name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{article.author_name}</span>
                </div>
                <div>{article.date || "Dec 8, 2024"}</div>
              </div>

              {/* Like & Comment Buttons */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition cursor-pointer">
                  <ThumbsUp size={18} />
                  <span>Like</span>
                </button>

                <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition cursor-pointer">
                  <MessageCircle size={18} />
                  <span>Comment</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full text-center">
        <button onClick={() => setShowArticles(!showArticles)}>
          {showArticles ? (
            <span className="btn btn-dash btn-primary my-5">More Articles</span>
          ) : (
            <span className="btn btn-dash btn-secondary my-5">
              Less Articles
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default MyArticles;
