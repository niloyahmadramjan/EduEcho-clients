import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ThumbsUp, MessageCircle, Pencil, Trash2 } from "lucide-react";
import AuthUser from "../../services/Hook/AuthUser";
import LoadingAnimation from "../loadingPage/LoadingAnimation";
import Swal from "sweetalert2";

const MyArticles = () => {
  const { user } = AuthUser();
  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState([]);

  const fetchArticles = async () => {
    setLoading(true);
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

  useEffect(() => {
    fetchArticles();
  }, [showArticles, user]);

  // handleUpdate data
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3000/articles/${editData._id}`, editData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          document.getElementById("edit-article-modal").checked = false;
          fetchArticles();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Article",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: err.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const handleDeleteArticle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/articles/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              fetchArticles();
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

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

            <div className="flex justify-between gap-3 m-4">
              <label
                htmlFor="edit-article-modal"
                className="btn btn-sm btn-outline btn-primary flex items-center gap-1"
                onClick={() => setEditData(article)}
              >
                <Pencil size={16} /> Edit
              </label>

              <button
                onClick={() => handleDeleteArticle(article._id)}
                className="btn btn-sm btn-outline btn-error flex items-center gap-1"
              >
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
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered w-full"
                  value={editData.title || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  value={editData.category || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, category: e.target.value })
                  }
                >
                  <option disabled>Choose a Category</option>
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

            <div>
              <label className="label">
                <span className="label-text">Tags (comma separated)</span>
              </label>
              <input
                type="text"
                name="tags"
                className="input input-bordered w-full"
                value={editData.tags || ""}
                onChange={(e) =>
                  setEditData({ ...editData, tags: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Thumbnail URL</span>
              </label>
              <input
                type="text"
                name="thumbnail"
                className="input input-bordered w-full"
                value={editData.thumbnail || ""}
                onChange={(e) =>
                  setEditData({ ...editData, thumbnail: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                type="date"
                name="date"
                className="input input-bordered w-full"
                value={editData.date || ""}
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Content</span>
              </label>
              <textarea
                name="content"
                className="textarea textarea-bordered w-full"
                rows="5"
                value={editData.content || ""}
                onChange={(e) =>
                  setEditData({ ...editData, content: e.target.value })
                }
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  readOnly
                  className="input input-bordered bg-gray-00 w-full"
                  value={user.displayName}
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
                  className="input input-bordered bg-gray-400 w-full"
                  value={editData.author_photo}
                />
              </div>
            </div>

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