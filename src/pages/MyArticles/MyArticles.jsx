import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ThumbsUp, MessageCircle, Pencil, Trash2, X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import AuthUser from "../../services/Hook/AuthUser";
import LoadingAnimation from "../loadingPage/LoadingAnimation";
import Swal from "sweetalert2";

const MyArticles = () => {
  const { user } = AuthUser();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState({});
  const [likesData, setLikesData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [modalArticleId, setModalArticleId] = useState(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://eduecho-server.vercel.app/myArticles?email=${user.email}`, {
              headers: {
              Authorization: `Bearer ${localStorage.getItem("eduEcho-access-token")}`,
                    }
    });
      const sliced = data.slice(0, 6);
      setArticles(showArticles ? sliced : data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [showArticles, user]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axios.get(
          "https://eduecho-server.vercel.app/articles/likes"
        );
        setLikesData(res.data);
      } catch (err) {
        console.error("Error fetching likes:", err.message);
      }
    };
    fetchLikes();
  }, [articles]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await axios.get(
          "https://eduecho-server.vercel.app/articles/comments"
        );
        setCommentsData(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [articles]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://eduecho-server.vercel.app/articles/${editData._id}`,
        editData
      )
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
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  const handleToggleLike = async (articleId) => {
    if (!user) {
      return Swal.fire({
        title: "Login required to like",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    }

    const articleLikeInfo = {
      articleId,
      userUID: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
    };

    try {
      await axios.post(
        "https://eduecho-server.vercel.app/articles/likes",
        articleLikeInfo
      );
      const res = await axios.get(
        "https://eduecho-server.vercel.app/articles/likes"
      );
      setLikesData(res.data);
    } catch (err) {
      console.error("Like error:", err.message);
    }
  };

  const getLikeInfo = (id) => {
    const uidList = likesData[id] || [];
    return {
      countLikes: uidList.length,
      liked: uidList.includes(user?.uid),
    };
  };

  const getCommentsForArticle = (articleId) => {
    return commentsData.filter((comment) => comment.article_id === articleId);
  };

  const handleAddComment = async (articleId) => {
    if (!user) {
      Swal.fire({
        title: "Login required to comment",
        icon: "warning",
        confirmButtonText: "Login",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (!newComment.trim()) return;

    const commentPayload = {
      article_id: articleId,
      user_id: user.uid,
      user_name: user.displayName,
      user_photo: user.photoURL,
      comment: newComment.trim(),
    };

    try {
      await axios.post(
        "https://eduecho-server.vercel.app/articles/comments",
        commentPayload
      );
      const { data } = await axios.get(
        "https://eduecho-server.vercel.app/articles/comments"
      );
      setCommentsData(data);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteArticle = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://eduecho-server.vercel.app/articles/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              fetchArticles();
              Swal.fire(
                "Deleted!",
                "Your article has been deleted.",
                "success"
              );
            }
          })
          .catch((err) => console.error(err.message));
      }
    });
  };

  const stripHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) return <LoadingAnimation />;

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">My Articles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, i) => {
          const { countLikes, liked } = getLikeInfo(article._id);
          const comments = getCommentsForArticle(article._id);

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
                  {stripHtml(article.content).slice(0, 120)}...
                </p>

                <div className="flex justify-end">
                  <Link
                    to={`/readMore/${article._id}`}
                    className="btn border-none"
                  >
                    Read More
                  </Link>
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
                    Like <span>{countLikes}</span>
                  </button>

                  <button
                    onClick={() => setModalArticleId(article._id)}
                    className="flex items-center gap-1 text-gray-500 hover:text-primary transition cursor-pointer"
                  >
                    <MessageCircle size={18} />
                    Comment <span>{comments.length}</span>
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

      {/* Comment Modal */}
      {modalArticleId && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg w-full max-w-lg p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setModalArticleId(null)}
            >
              <X size={24} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Comments</h3>

            <div className="max-h-60 overflow-y-auto space-y-3 mb-4">
              {getCommentsForArticle(modalArticleId).map((cmt, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded-md text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <img
                      src={cmt.user_photo}
                      alt={cmt.user_name}
                      className="w-6 h-6 rounded-full"
                    />
                    <strong>{cmt.user_name}</strong>
                  </div>
                  <p className="ml-8">{cmt.comment}</p>
                </div>
              ))}
            </div>

            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="input input-bordered w-full mb-2"
            />
            <button
              onClick={() => handleAddComment(modalArticleId)}
              className="btn btn-primary w-full"
            >
              Post Comment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
