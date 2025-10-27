import React, { useState, useEffect } from 'react';
import { FaSearch, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';

const CommentsManagement = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure = useAxiosSecure();

  const fetchComments = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/admin/comments?page=${page}&limit=10&search=${search}`);
      setComments(res.data.comments);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error('Error fetching comments:', error);
      Swal.fire('Error', 'Failed to fetch comments', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchComments(1, searchTerm);
  };

  const handleDeleteComment = async (commentId, commentText) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Comment?',
        text: `Are you sure you want to delete this comment?`,
        html: `<p>"${commentText.substring(0, 100)}${commentText.length > 100 ? '...' : ''}"</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/comments/${commentId}`);
        Swal.fire('Deleted!', 'Comment has been deleted.', 'success');
        fetchComments(currentPage, searchTerm);
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete comment', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Comments Management</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search comments..."
                className="input input-bordered"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Comment</th>
                      <th>User</th>
                      <th>Article</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comments.map((comment) => (
                      <tr key={comment._id}>
                        <td>
                          <div className="max-w-xs lg:max-w-md">
                            <p className="line-clamp-2">{comment.comment}</p>
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="avatar">
                              <div className="mask mask-squircle w-8 h-8">
                                <img src={comment.userPhoto || '/default-avatar.png'} alt={comment.userName} />
                              </div>
                            </div>
                            <span className="font-medium">{comment.userName}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-outline">Article #{comment.article_id}</span>
                        </td>
                        <td>{new Date(comment.timestamp).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteComment(comment._id, comment.comment)}
                            className="btn btn-error btn-sm"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="join">
              <button
                className="join-item btn"
                disabled={currentPage === 1}
                onClick={() => fetchComments(currentPage - 1, searchTerm)}
              >
                «
              </button>
              <button className="join-item btn">Page {currentPage}</button>
              <button
                className="join-item btn"
                disabled={currentPage === totalPages}
                onClick={() => fetchComments(currentPage + 1, searchTerm)}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsManagement;