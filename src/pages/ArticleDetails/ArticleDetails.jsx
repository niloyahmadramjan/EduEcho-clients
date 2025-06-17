import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ArrowLeft } from "lucide-react";
import AuthUser from "../../services/Hook/AuthUser";
import axios from "axios";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const ArticleDetails = () => {
  const article = useLoaderData();
  const { user } = AuthUser();
  const navigate = useNavigate();

  const [likesData, setLikesData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch Likes
  const fetchLikes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/articles/likes");
      setLikesData(res.data[article._id] || []);
    } catch (err) {
      console.error("Error fetching likes:", err);
    }
  };

  // Fetch Comments
  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/articles/comments");
      const filtered = res.data
        .filter((comment) => comment.article_id === article._id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // newest first
      setCommentsData(filtered);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  useEffect(() => {
    fetchLikes();
    fetchComments();
  }, [article._id]);

  // Handle Like
  const handleToggleLike = async () => {
    if (!user) {
      return Swal.fire({
        title: "Login required to like",
        icon: "warning",
        confirmButtonText: "Login",
      });
    }

    const likePayload = {
      articleId: article._id,
      userUID: user.uid,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
    };

    try {
      await axios.post("http://localhost:3000/articles/likes", likePayload);
      fetchLikes();
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  // Handle Add Comment
  const handleAddComment = async () => {
    if (!user) {
      return Swal.fire({
        title: "Login required to comment",
        icon: "warning",
        confirmButtonText: "Login",
      });
    }

    if (!newComment.trim()) return;

    const commentPayload = {
      article_id: article._id,
      user_id: user.uid,
      user_name: user.displayName,
      user_photo: user.photoURL,
      comment: newComment.trim(),
    };

    try {
      await axios.post("http://localhost:3000/articles/comments", commentPayload);
      await fetchComments();
      setNewComment("");
    } catch (err) {
      console.error("Comment error:", err);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 mb-6 text-primary hover:underline"
      >
        <ArrowLeft /> Go Back
      </button>

      {/* Article Title */}
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">
        {article.title}
      </h1>

      {/* Article Meta */}
      <div className="flex justify-center gap-3 mb-6 text-gray-500">
        <span className="bg-gray-200 px-2 py-0.5 rounded-full">
          {article.category}
        </span>
        <span>{new Date(article.date).toLocaleDateString()}</span>
      </div>

      {/* Article Image */}
      <img
        src={article.thumbnail}
        alt={article.title}
        className="w-full rounded-xl mb-6 shadow-lg"
      />

      {/* Article Content */}
      <div className="prose max-w-none mb-8 text-gray-700">
        <p>{article.content}</p>
      </div>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Tags:</h4>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-primary/10 text-primary text-sm px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Author */}
      <div className="flex items-center gap-4 border-t pt-4 mb-8">
        <img
          src={article.author_photo}
          alt={article.username}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
        />
        <div>
          <p className="font-semibold">{article.username}</p>
          <p className="text-sm text-gray-500">{article.email}</p>
        </div>
      </div>

      {/* Likes */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={handleToggleLike}
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <ThumbsUp size={20} /> Like
        </button>
        <span className="text-sm text-gray-600">
          {likesData.length} {likesData.length === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Comments */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">
          Comments ({commentsData.length})
        </h3>

        <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
          {commentsData.length === 0 ? (
            <p className="text-gray-500">No comments yet.</p>
          ) : (
            commentsData.map((cmt, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-gray-100 p-3 rounded-md"
              >
                <img
                  src={cmt.user_photo}
                  alt={cmt.user_name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{cmt.user_name}</p>
                  <p className="text-sm text-gray-700">{cmt.comment}</p>
                  {cmt.timestamp && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(cmt.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Comment */}
        <div className="flex items-center gap-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="input input-sm input-bordered flex-grow"
          />
          <button onClick={handleAddComment} className="btn btn-sm btn-primary">
            Post
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleDetails;
