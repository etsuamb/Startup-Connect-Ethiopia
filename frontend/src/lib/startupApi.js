import { apiFetch, apiPostJson, apiPutJson, apiPostForm, apiPutForm } from "./api";

function buildQuery(params) {
  const searchParams = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
}

export async function getStartupProfile() {
  return apiFetch("/startups/me");
}

export async function updateStartupProfile(payload) {
  return apiPutForm("/startups/profile", payload);
}

export async function getMyProjects() {
  return apiFetch("/startups/projects");
}

export async function createProject(project) {
  return apiPostJson("/startups/projects", project);
}

export async function getDocuments() {
  return apiFetch("/startups/documents");
}

export async function uploadDocument(formData) {
  return apiPostForm("/startups/documents", formData);
}

export async function searchInvestors(params = {}) {
  const query = buildQuery(params);
  return apiFetch(`/startups/investors/search?${query}`);
}

export async function searchMentors(params = {}) {
  const query = buildQuery(params);
  return apiFetch(`/startups/mentors/search?${query}`);
}

export async function getInvestorRecommendations() {
  return apiFetch("/startups/recommendations/investors");
}

export async function getMentorRecommendations() {
  return apiFetch("/startups/recommendations/mentors");
}

export async function createInvestmentRequest(payload) {
  return apiPostJson("/startups/investment-requests", payload);
}

export async function createMentorshipRequest(payload) {
  return apiPostJson("/startups/mentorship-requests", payload);
}

export async function sendInvestorMessage(investorId, message) {
  return apiPostJson(`/startups/chat/investors/${investorId}/send`, { message });
}

export async function getInvestorMessages(investorId, params = {}) {
  const query = buildQuery(params);
  return apiFetch(`/startups/chat/investors/${investorId}/messages?${query}`);
}
