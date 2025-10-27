import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';

const ArticlesManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure = useAxiosSecure();

  const fetchArticles = async (page = 1, search = '', status = '', category = '') => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(
        `/admin/articles?page=${page}&limit=10&search=${search}&status=${status}&category=${category}`
      );
      setArticles(res.data.articles);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error('Error fetching articles:', error);
      Swal.fire('Error', 'Failed to fetch articles', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles(1, searchTerm, statusFilter, categoryFilter);
  };

  const handleStatusChange = async (articleId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: 'Change Article Status?',
        text: `Are you sure you want to change this article's status to ${newStatus}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/admin/articles/${articleId}/status`, { status: newStatus });
        Swal.fire('Updated!', 'Article status has been updated.', 'success');
        fetchArticles(currentPage, searchTerm, statusFilter, categoryFilter);
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update article status', 'error');
    }
  };

  const handleDeleteArticle = async (articleId, articleTitle) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Article?',
        text: `Are you sure you want to delete "${articleTitle}"? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/articles/${articleId}`);
        Swal.fire('Deleted!', 'Article has been deleted.', 'success');
        fetchArticles(currentPage, searchTerm, statusFilter, categoryFilter);
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete article', 'error');
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      published: 'badge-success',
      draft: 'badge-warning',
      archived: 'badge-error'
    };
    return `badge ${colors[status] || 'badge-ghost'}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Articles Management</h2>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search articles..."
              className="input input-bordered"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select select-bordered"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
            <select
              className="select select-bordered"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="technology">Technology</option>
              <option value="science">Science</option>
              <option value="education">Education</option>
            </select>
            <button type="submit" className="btn btn-primary">
              <FaSearch />
            </button>
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
                      <th>Article</th>
                      <th>Author</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={article.image || '/default-article.png'} alt={article.title} />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold line-clamp-1">{article.title}</div>
                            </div>
                          </div>
                        </td>
                        <td>{article.email}</td>
                        <td>
                          <span className="badge badge-outline">{article.category}</span>
                        </td>
                        <td>
                          <select
                            className="select select-bordered select-sm"
                            value={article.status || 'draft'}
                            onChange={(e) => handleStatusChange(article._id, e.target.value)}
                          >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>
                        <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteArticle(article._id, article.title)}
                              className="btn btn-error btn-sm"
                            >
                              <FaTrash />
                            </button>
                          </div>
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
                onClick={() => fetchArticles(currentPage - 1, searchTerm, statusFilter, categoryFilter)}
              >
                «
              </button>
              <button className="join-item btn">Page {currentPage}</button>
              <button
                className="join-item btn"
                disabled={currentPage === totalPages}
                onClick={() => fetchArticles(currentPage + 1, searchTerm, statusFilter, categoryFilter)}
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

export default ArticlesManagement;