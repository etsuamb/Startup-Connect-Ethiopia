"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/startup/Sidebar";
import { getDocuments, uploadDocument } from "@/lib/startupApi";

export default function StartupProjectDocuments() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function loadDocuments() {
      try {
        const data = await getDocuments();
        setDocuments(data.documents || []);
      } catch (err) {
        setError(err.message || "Unable to load documents.");
      }
    }
    loadDocuments();
  }, []);

  async function handleUpload(event) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!file) {
      setError("Please choose a document to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (description) formData.append("description", description);

    setLoading(true);
    try {
      await uploadDocument(formData);
      setSuccess("Document uploaded successfully.");
      setFile(null);
      setDescription("");
      const data = await getDocuments();
      setDocuments(data.documents || []);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8f9] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <header className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-100 sticky top-0 z-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0f3d32] tracking-tight">Project Documents</h1>
            <p className="text-sm text-gray-500 mt-1">Upload required files and keep all startup documents accessible in one place.</p>
          </div>
        </header>

        <div className="px-4 sm:px-10 py-10 w-full max-w-[1000px] mx-auto pb-24">
          {error && <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          {success && <div className="mb-6 rounded-3xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{success}</div>}

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Upload a document</h2>
              <form onSubmit={handleUpload} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Document</label>
                  <input
                    type="file"
                    accept="application/pdf,video/mp4"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Description (optional)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                    placeholder="Example: Pitch deck, financial model, or supporting document"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2921] transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Uploading…" : "Upload Document"}
                </button>
              </form>
            </div>

            <div className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Uploaded documents</h2>
              {documents.length === 0 ? (
                <p className="text-sm text-gray-500">No documents uploaded yet. Your uploads will appear here.</p>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.document_id} className="rounded-3xl border border-gray-100 bg-[#f8fafc] p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-bold text-gray-900">{doc.file_name}</p>
                          <p className="text-xs text-gray-500 mt-1">{doc.description || "No description"}</p>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{doc.file_type || "FILE"}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                        <span>{doc.created_at ? new Date(doc.created_at).toLocaleDateString() : "Unknown date"}</span>
                        <span>{doc.file_size_bytes ? `${(doc.file_size_bytes / 1024).toFixed(1)} KB` : "Unknown size"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200 mt-8">
            <Link href="/startup/project" className="px-8 py-3.5 bg-white border border-[#0f3d32] text-[#0f3d32] font-bold rounded-lg hover:bg-gray-50 transition text-sm shadow-sm">
              Back to My Projects
            </Link>
            <div className="flex items-center gap-4 ml-auto">
              <span className="text-[11px] text-gray-400 font-medium italic hidden sm:block">Auto-saving progress...</span>
              <Link href="/startup/project/create" className="px-8 py-3.5 bg-[#0f3d32] hover:bg-[#0a2921] text-white font-bold rounded-lg transition shadow-md text-sm">
                + Create Another Project
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
