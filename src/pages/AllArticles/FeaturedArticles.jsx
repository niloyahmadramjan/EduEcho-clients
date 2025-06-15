import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ThumbsUp, MessageCircle } from "lucide-react";
import LoadingAnimation from "../loadingPage/LoadingAnimation";
import AuthUser from "../../services/Hook/AuthUser";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(true);
  const [loading, setLoading] = useState(false);
  const [likesData, setLikesData] = useState({});
  const { user } = AuthUser();

  // Fetch articles
  useEffect(() => {
    setLoading(true);
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/articles");
        const sliced = data.slice(0, 6);
        setArticles(showArticles ? sliced : data);
      } catch (err) {
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [showArticles]);

  // Fetch like data
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/articles/likes");
        setLikesData(res.data);
      } catch (err) {
        console.error("Error fetching likes:", err.message);
      }
    };
    fetchLikes();
  }, [articles]);

  const handleToggleLike = async (articleId) => {
    if (!user?.uid) return alert("Please login to like articles.");

    const articleLikeInfo = {
      articleId,
      userUID: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
    };

    try {
      await axios.post("http://localhost:3000/articles/likes", articleLikeInfo);

      // Refresh likes after liking
      const res = await axios.get("http://localhost:3000/articles/likes");
      setLikesData(res.data);
    } catch (err) {
      console.error("Like error:", err.message);
    }
  };

  // Fixed version: Handles likesData as object
  const getLikeInfo = (id) => {
    const uidList = likesData[id] || [];
    return {
      count: uidList.length,
      liked: uidList.includes(user?.uid),
    };
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        Featured Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, i) => {
          const { count, liked } = getLikeInfo(article._id);

          return (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-base-100 shadow-md rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 md:h-52 lg:h-56 w-full bg-gray-100 overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-2 text-sm text-gray-500">
                  <span className="bg-gray-200 text-xs font-medium px-2 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span>{article.read_time || "5 min read"}</span>
                </div>

                <h3 className="text-lg font-semibold text-base-content mb-1">
                  {article.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {article.content.slice(0, 120)}...
                </p>

                <div className="flex justify-end">
                  <button className="btn border-none">Read More</button>
                </div>

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

                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <button
                    onClick={() => handleToggleLike(article._id)}
                    className={`flex items-center gap-1 transition cursor-pointer ${
                      liked
                        ? "text-blue-600"
                        : "text-gray-500 hover:text-primary"
                    }`}
                  >
                    <ThumbsUp size={18} />
                    Like <span>{count}</span>
                  </button>

                  <button className="flex items-center gap-1 text-gray-500 hover:text-primary transition cursor-pointer">
                    <MessageCircle size={18} />
                    Comment <span>20</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
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

export default FeaturedArticles;
