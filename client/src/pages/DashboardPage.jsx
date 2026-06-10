import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import Toast from "../components/Toast";
import { createNote, deleteNote, getNotes, updateNote } from "../services/noteService";
import { getUserInfo, logoutUser } from "../utils/auth";

function DashboardPage() {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  // Create form
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  // ── Load data ──────────────────────────────────────────────────
  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo) { navigate("/login"); return; }
    setUser(userInfo);

    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await getNotes();
        setNotes(data);
      } catch {
        showToast("Failed to load notes", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [navigate]);

  // ── Helpers ────────────────────────────────────────────────────
  const showToast = (message, type = "success") => setToast({ message, type });

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() && !formData.content.trim()) {
      showToast("Please add a title or content", "error");
      return;
    }
    try {
      const newNote = await createNote({
        title: formData.title.trim() || "Untitled",
        content: formData.content.trim(),
      });
      setNotes([newNote, ...notes]);
      setFormData({ title: "", content: "" });
      showToast("Note created!");
    } catch {
      showToast("Failed to create note", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n._id !== id));
      showToast("Note deleted");
    } catch {
      showToast("Failed to delete note", "error");
    }
  };

  const handleEdit = async (id, updatedFields) => {
    try {
      const updated = await updateNote(id, updatedFields);
      setNotes(notes.map((n) => (n._id === id ? updated : n)));
      showToast("Note updated!");
    } catch {
      showToast("Failed to update note", "error");
    }
  };

  const handleLogout = () => { logoutUser(); navigate("/login"); };

  // ── Filter ──────────────────────────────────────────────────
  const filtered = notes.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar onLogout={handleLogout} userName={user?.name} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Notes
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Hello, {user?.name}
          </p>
        </div>

        {/* Create Note Form */}
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 mb-8">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            New Note
          </h2>
          <form onSubmit={handleCreate} className="flex flex-col gap-3">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Give your note a title..."
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Write your thoughts..."
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Note
            </button>
          </form>
        </div>

        {/* Search */}
        {notes.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* Notes List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="animate-spin h-8 w-8 text-indigo-600 mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="text-slate-400 text-sm">Loading notes...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-1">
              No notes yet
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Create your first note above to get started.<br />
              Your thoughts deserve a beautiful home.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default DashboardPage;