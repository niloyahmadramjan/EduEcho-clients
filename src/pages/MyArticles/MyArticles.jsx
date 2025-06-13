import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ThumbsUp, MessageCircle, Pencil, Trash2 } from "lucide-react";
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
            <div className="flex justify-between gap-3 m-4 ">
              <label
                htmlFor="edit-article-modal"
                className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
              >
                <Pencil size={16} /> Edit
              </label>

              <button className="btn btn-sm btn-outline btn-error flex items-center gap-1">
                <Trash2 size={16} />
                Delete
              </button>
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
      {/* Modal Component */}
      <input type="checkbox" id="edit-article-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-2xl text-center mb-6">Edit Article</h3>

          <form className="space-y-4">
            {/* Title & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full"
                  placeholder="Article Title"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                >
                  <option disabled selected>
                    Choose a Category
                  </option>
                  <option>Technology</option>
                  <option>Science</option>
                  <option>Arts</option>
                  <option>Health</option>
                  <option>Culture</option>
                  <option>Business</option>
                  <option>Education</option>
                  <option>Photography</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="label">
                <span className="label-text">Tags (comma separated)</span>
              </label>
              <input
                type="text"
                name="tags"
                className="input input-bordered w-full"
                placeholder="React, AI, JavaScript"
              />
            </div>

            {/* Thumbnail */}
            <div>
              <label className="label">
                <span className="label-text">Thumbnail URL</span>
              </label>
              <input
                type="text"
                name="thumbnail"
                className="input input-bordered w-full"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Date */}
            <div>
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered w-full"
              />
            </div>

            {/* Content */}
            <div>
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                name="content"
                className="textarea textarea-bordered w-full"
                rows="5"
                placeholder="Update article content..."
              ></textarea>
            </div>

            {/* Author Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  readOnly
                  className="input input-bordered bg-gray-100 w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Author Photo URL</span>
                </label>
                <input
                  type="text"
                  name="author_photo"
                  readOnly
                  className="input input-bordered bg-gray-100 w-full"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <label htmlFor="edit-article-modal" className="btn btn-outline">
                Cancel
              </label>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyArticles;
