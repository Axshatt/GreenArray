import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileRow {
  id: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_seller: boolean;
}

function AdminUsers() {
  const { user, getAllUsers, updateUserRole } = useAuth();
  const [rows, setRows] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const users = await getAllUsers();
      setRows(users);
    } catch (e: any) {
      setError(e?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setAdmin = async (id: string, isAdmin: boolean, userName: string) => {
    const action = isAdmin ? 'promote' : 'demote';
    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${userName} to ${isAdmin ? 'admin' : 'user'}?`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const userRow = rows.find(r => r.id === id);
      await updateUserRole(id, isAdmin, userRow?.is_seller || false);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const setSeller = async (id: string, isSeller: boolean, userName: string) => {
    const action = isSeller ? 'promote' : 'demote';
    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${userName} to ${isSeller ? 'seller' : 'user'}?`
    );
    if (!confirmed) return;

    setLoading(true);
    try {
      const userRow = rows.find(r => r.id === id);
      await updateUserRole(id, userRow?.is_admin || false, isSeller);
      await load();
    } finally {
      setLoading(false);
    }
  };

  const makeMeAdmin = async () => {
    if (!user) return;
    await setAdmin(user.id, true, user.full_name);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <button
          onClick={makeMeAdmin}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Make me admin
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{error}</div>
      )}

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <table className="w-full bg-white rounded shadow overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Seller</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.full_name}</td>
                <td className="p-3">{r.email}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${r.is_admin ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {r.is_admin ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${r.is_seller ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {r.is_seller ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <div className="flex flex-col space-y-1">
                    <div>
                      {r.is_admin ? (
                        <button onClick={() => setAdmin(r.id, false, r.full_name)} className="text-red-600 hover:underline text-sm">Remove Admin</button>
                      ) : (
                        <button onClick={() => setAdmin(r.id, true, r.full_name)} className="text-green-600 hover:underline text-sm">Make Admin</button>
                      )}
                    </div>
                    <div>
                      {r.is_seller ? (
                        <button onClick={() => setSeller(r.id, false, r.full_name)} className="text-red-600 hover:underline text-sm">Remove Seller</button>
                      ) : (
                        <button onClick={() => setSeller(r.id, true, r.full_name)} className="text-green-600 hover:underline text-sm">Make Seller</button>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminUsers;


