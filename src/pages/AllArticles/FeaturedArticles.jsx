import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ThumbsUp, MessageCircle } from "lucide-react";

const FeaturedArticles = () => {
  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/articles");
        const sliced = data.slice(0, 6);
        if (showArticles) {
          setArticles(sliced);
          return;
        }
        setArticles(data);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };
    fetchArticles();
  }, [showArticles]);

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">
        {" "}
        Featured Articles
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <motion.div
            key={article._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className=" shadow-xl rounded-2xl overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
              {article.category}
              <div className="absolute -bottom-5 left-4 flex items-center space-x-2 bg-transparent shadow p-2 rounded-xl">
                <img
                  src={article.author_photo}
                  alt={article.author_name}
                  className="w-10 h-10 rounded-full border-2 border-transparent"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {article.author_name}
                  </p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>
            </div>

            <div className="p-6 pt-8 flex flex-col flex-grow">
              <div className="flex flex-wrap gap-2 mb-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-xs px-2 py-1 rounded-full text-gray-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 flex-grow">
                {article.content.slice(0, 120)}...
              </p>

              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition cursor-pointer">
                  <ThumbsUp size={18} />
                  <span> 0</span>
                </button>

                <div className="flex items-center gap-1 text-gray-500 cursor-pointer hover:text-blue-600">
                  <MessageCircle size={18} />
                  <span>0</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="w-full text-center">
        <button
          onClick={() => setShowArticles(!showArticles)}
          
        >
        
          {showArticles ? <span className="btn btn-dash btn-primary my-5">More Articles</span> :<span className="btn btn-dash btn-secondary my-5">Less Articles</span> }
        </button>
      </div>
    </div>
  );
};

export default FeaturedArticles;
