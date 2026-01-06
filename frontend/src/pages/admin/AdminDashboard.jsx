import { useState } from "react";
import { useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminIssueCard from "./AdminIssueCard";
import AdminEditModal from "./AdminEditModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {
  fetchAdminIssues,
  updateIssueStatus,
  deleteIssue,
} from "../../services/adminService";

export default function AdminDashboard() {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingIssue, setEditingIssue] = useState(null);

  // for loading bar
  const [loading, setLoading] = useState(true);

  // ✅ ADDED: issues state (MUST exist before useEffect)
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        setLoading(true);
        const res = await fetchAdminIssues();
        setIssues(Array.isArray(res.data) ? res.data : res.data.issues || []);
      } catch (err) {
        console.error("Failed to load issues", err);
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, []);

  // 🔁 UI-only status update
  const handleStatusChange = async (id, status) => {
    try {
      await updateIssueStatus(id, status);
      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id ? { ...issue, status } : issue
        )
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  // ✏️ UI-only edit save
  const handleEditSave = (id, data) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === id ? { ...issue, ...data } : issue
      )
    );
    setEditingIssue(null);
  };

  // ❌ Step 1: only OPEN confirmation modal
  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  // ❌ Step 2: actual delete AFTER confirmation
  const handleDeleteConfirm = async () => {
    try {
      await deleteIssue(deleteTarget);
      setIssues((prev) =>
        prev.filter((i) => i._id !== deleteTarget)
      );
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Issue Moderation
        </h1>

        {/* ✅ ADDED: loading guard */}
        {loading && (
          <p className="text-gray-500">Loading issues...</p>
        )}

        {/* existing code preserved, just guarded */}
        {!loading &&
          issues.map((issue) => (
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

      {deleteTarget && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
