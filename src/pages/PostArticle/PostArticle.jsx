import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import AuthUser from "../../services/Hook/AuthUser";

const PostArticle = () => {
  const { user } = AuthUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Optional: handle empty tags
    data.tags = data.tags
      ? data.tags.split(",").map((tag) => tag.trim())
      : [];

    data.email = user?.email;
    data.username = user?.displayName;
    data.author_photo = user?.photoURL;

    try {
      const res = await axios.post("https://eduecho-server.vercel.app/articles", data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Article posted successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message || "Something went wrong",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Post a New Article</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 rounded-xl shadow-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Choose a Category</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
              <option value="Arts">Arts</option>
              <option value="Health">Health</option>
              <option value="Culture">Culture</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Photography">Photography</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma separated) <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            name="tags"
            placeholder="AI, Future, Innovation"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Thumbnail Image URL
          </label>
          <input
            type="text"
            name="thumbnail"
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            rows={6}
            placeholder="Write something about the article..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Username
            </label>
            <input
              type="text"
              name="username"
              value={user?.displayName || ""}
              readOnly
              className="w-full bg-gray-400 border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author Photo URL
            </label>
            <input
              type="text"
              name="author_photo"
              value={user?.photoURL || ""}
              readOnly
              className="w-full bg-gray-400 border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300"
        >
          Post Article
        </button>
      </form>
    </div>
  );
};

export default PostArticle;
