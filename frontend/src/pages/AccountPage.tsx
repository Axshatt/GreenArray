import React, { useEffect, useState } from "react";

interface User {
  fullName: string;
  email: string;
  is_admin?: boolean;
}

function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // saved after login
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-600">Loading account info...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Account</h1>
        <p className="text-gray-600">No account details found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>

      {/* User Info */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        <p>
          <span className="font-medium">Full Name:</span> {user.fullName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        {user.is_admin && (
          <p className="text-green-600 font-semibold mt-2">✅ Admin Access</p>
        )}
      </div>

      {/* Order History Placeholder */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        <p className="text-gray-600">You have no orders yet.</p>
      </div>
    </div>
  );
}

export default AccountPage;
