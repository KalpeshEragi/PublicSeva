import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminIssueCard from "./AdminIssueCard";
import AdminEditModal from "./AdminEditModal";

export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [editingIssue, setEditingIssue] = useState(null);

  // 🔌 TODO: Replace with API call
  useEffect(() => {
    // GET /api/admin/issues
    setIssues([]); 
  }, []);

  const handleStatusChange = (id, status) => {
    // PATCH /api/admin/issues/:id/status
    console.log(id, status);
  };

  const handleEditSave = (id, data) => {
    // PATCH /api/admin/issues/:id
    console.log(id, data);
    setEditingIssue(null);
  };

  const handleDelete = (id) => {
    // DELETE /api/admin/issues/:id
    console.log(id);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-5">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Issue Moderation
        </h1>

        {issues.map((issue) => (
          <AdminIssueCard
            key={issue._id}
            issue={issue}
            onStatusChange={handleStatusChange}
            onEdit={setEditingIssue}
            onDelete={handleDelete}
          />
        ))}
      </main>

      {editingIssue && (
        <AdminEditModal
          issue={editingIssue}
          onClose={() => setEditingIssue(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
