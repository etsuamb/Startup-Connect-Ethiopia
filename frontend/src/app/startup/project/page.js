"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/startup/Sidebar";
import { getMyProjects } from "@/lib/startupApi";

export default function StartupProjectsListing() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getMyProjects();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err.message || "Unable to load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  const totalProjects = projects.length;
  const totalFundingNeeded = useMemo(
    () => projects.reduce((sum, project) => sum + Number(project.funding_goal || 0), 0),
    [projects],
  );
  const totalRaised = useMemo(
    () => projects.reduce((sum, project) => sum + Number(project.amount_raised || 0), 0),
    [projects],
  );
  const activeProjects = projects.filter((project) => project.status && project.status !== "Draft").length;

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        <header className="flex flex-col gap-6 px-8 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Projects</h1>
              <p className="text-sm text-gray-500 mt-1">Manage your startup projects, funding requests, documents, and progress updates.</p>
            </div>
            <Link href="/startup/project/create" className="inline-flex items-center gap-2 px-5 py-3 bg-[#0f3d32] text-white rounded-2xl text-sm font-bold shadow-sm hover:bg-[#0a2921] transition">
              <span>+ Create New Project</span>
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-[20px] bg-white border border-gray-100 p-5 shadow-sm flex-1 min-w-[180px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900">{loading ? "..." : totalProjects}</p>
            </div>
            <div className="rounded-[20px] bg-white border border-gray-100 p-5 shadow-sm flex-1 min-w-[180px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Funding Goal</p>
              <p className="text-3xl font-bold text-gray-900">${totalFundingNeeded.toLocaleString()}</p>
            </div>
            <div className="rounded-[20px] bg-white border border-gray-100 p-5 shadow-sm flex-1 min-w-[180px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Raised</p>
              <p className="text-3xl font-bold text-gray-900">${totalRaised.toLocaleString()}</p>
            </div>
            <div className="rounded-[20px] bg-white border border-gray-100 p-5 shadow-sm flex-1 min-w-[180px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Active Projects</p>
              <p className="text-3xl font-bold text-gray-900">{activeProjects}</p>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-10 py-8 w-full max-w-[1200px] mx-auto pb-24">
          {loading ? (
            <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm text-center text-gray-500">Loading projects...</div>
          ) : error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center text-red-700">{error}</div>
          ) : projects.length === 0 ? (
            <div className="rounded-[30px] border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-semibold text-gray-900 mb-3">No projects yet</p>
              <p className="text-sm text-gray-500 mb-6">Add your first project to begin tracking funding, documents, and updates.</p>
              <Link href="/startup/project/create" className="inline-flex items-center justify-center px-6 py-3 bg-[#0f3d32] text-white rounded-2xl font-bold hover:bg-[#0a2921] transition">Create your first project</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.project_id} className="rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{project.project_title}</h2>
                      <p className="text-sm text-gray-500 mt-2">{project.description || "No description provided yet."}</p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gray-700 bg-gray-50">
                      {project.status ? project.status : "Draft"}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Funding Goal</p>
                      <p className="font-semibold text-gray-900">${Number(project.funding_goal || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Raised</p>
                      <p className="font-semibold text-gray-900">${Number(project.amount_raised || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Timeline</p>
                      <p className="font-semibold text-gray-900">{project.start_date || "TBD"} – {project.end_date || "TBD"}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link href="/startup/project/documents" className="rounded-2xl bg-[#0f3d32] px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#0a2921] transition">Upload Documents</Link>
                    <Link href="/startup/project/create" className="rounded-2xl border border-gray-200 px-5 py-3 text-xs font-bold uppercase tracking-widest text-gray-700 hover:bg-gray-50 transition">Edit Project</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
