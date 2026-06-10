import { useState } from "react";
import DeleteModal from "./DeleteModal";

function NoteCard({ note, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({
    title: note.title,
    content: note.content,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onEdit(note._id, editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ title: note.title, content: note.content });
    setIsEditing(false);
  };

  const handleConfirmDelete = () => {
    onDelete(note._id);
    setShowDeleteModal(false);
  };

  // Format time as "Just now", "2 hours ago", etc.
  const formatTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return created.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: created.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 group flex flex-col h-full">

        {isEditing ? (
          /* ── Edit Mode ── */
          <div className="flex flex-col gap-3 h-full">
            <input
              name="title"
              value={editData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="content"
              value={editData.content}
              onChange={handleChange}
              placeholder="Write your thoughts..."
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none flex-1"
            />
            <div className="flex gap-2 mt-auto">
              <button
                onClick={handleSave}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 rounded-lg transition cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-sm font-semibold py-2 rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ── View Mode ── */
          <>
            {/* Top: Title and edit/delete icons */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 flex-1">
                {note.title || "Untitled"}
              </h3>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  title="Edit"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  title="Delete"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 flex-1 mb-3 whitespace-pre-wrap">
              {note.content || "No content"}
            </p>

            {/* Footer: timestamp */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
              <span className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                </svg>
                {formatTime(note.createdAt)}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <DeleteModal
          title={note.title || "Untitled"}
          onDelete={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}

export default NoteCard;