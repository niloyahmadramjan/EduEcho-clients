import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaUser, FaUserTie, FaShieldAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hook/useAxiosSecure';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async (page = 1, search = '') => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/admin/users?page=${page}&limit=10&search=${search}`);
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire('Error', 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, searchTerm);
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const result = await Swal.fire({
        title: 'Change User Role?',
        text: `Are you sure you want to change this user's role to ${newRole}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!'
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/admin/users/${userId}/role`, { role: newRole });
        Swal.fire('Updated!', 'User role has been updated.', 'success');
        fetchUsers(currentPage, searchTerm);
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to update user role', 'error');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    try {
      const result = await Swal.fire({
        title: 'Delete User?',
        text: `Are you sure you want to delete ${userName}? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/users/${userId}`);
        Swal.fire('Deleted!', 'User has been deleted.', 'success');
        fetchUsers(currentPage, searchTerm);
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete user', 'error');
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <FaShieldAlt className="text-purple-500" />;
      case 'author': return <FaUserTie className="text-blue-500" />;
      default: return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: 'badge-primary',
      author: 'badge-secondary',
      user: 'badge-ghost'
    };
    return `badge ${colors[role] || 'badge-ghost'}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Users Management</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search users..."
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
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={user.photo || '/default-avatar.png'} alt={user.name} />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(user.role)}
                            <span className={getRoleBadge(user.role)}>
                              {user.role}
                            </span>
                          </div>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="flex gap-2">
                            <select
                              className="select select-bordered select-sm"
                              value={user.role}
                              onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            >
                              <option value="user">User</option>
                              <option value="author">Author</option>
                              <option value="admin">Admin</option>
                            </select>
                            <button
                              onClick={() => handleDeleteUser(user._id, user.name)}
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
                onClick={() => fetchUsers(currentPage - 1, searchTerm)}
              >
                «
              </button>
              <button className="join-item btn">Page {currentPage}</button>
              <button
                className="join-item btn"
                disabled={currentPage === totalPages}
                onClick={() => fetchUsers(currentPage + 1, searchTerm)}
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

export default UsersManagement;