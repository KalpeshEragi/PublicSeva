import React, { useState } from "react";

// Simple Check Status page for PublicSeva
// Assumes Tailwind CSS is already configured

export default function CheckStatus() {
  const [reportId, setReportId] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock API call (replace with real backend endpoint later)
  const checkStatus = async () => {
    if (!reportId.trim()) {
      setError("Please enter a valid Report ID");
      return;
    }

    setError("");
    setLoading(true);
    setStatus(null);

    try {
      // 🔁 Replace this with real API call
      // const res = await fetch(`/api/reports/${reportId}`);
      // const data = await res.json();

      // Mock response
      await new Promise((r) => setTimeout(r, 800));
      const data = {
        reportId,
        status: "In Progress", // Open | In Progress | Resolved
        lastUpdated: "2026-01-04",
        location: "Thane, Maharashtra",
      };

      setStatus(data);
    } catch (err) {
      setError("Unable to fetch status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          Check Report Status
        </h1>

        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6">
          Enter your Report ID to track the current status of your waste complaint.
        </p>

        <input
          type="text"
          placeholder="Enter Report ID"
          value={reportId}
          onChange={(e) => setReportId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
        />

        {error && (
          <p className="text-sm text-red-500 mb-3 text-center">{error}</p>
        )}

        <button
          onClick={checkStatus}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          {loading ? "Checking..." : "Check Status"}
        </button>

        {status && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold mb-2">Report Details</h2>
            <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
              <p><strong>ID:</strong> {status.reportId}</p>
              <p><strong>Status:</strong> 
                <span className={
                  status.status === "Resolved"
                    ? "text-green-600"
                    : status.status === "In Progress"
                    ? "text-yellow-600"
                    : "text-red-600"
                }>
                  {" "}{status.status}
                </span>
              </p>
              <p><strong>Location:</strong> {status.location}</p>
              <p><strong>Last Updated:</strong> {status.lastUpdated}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
