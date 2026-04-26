const SUPABASE_PROJECT_ID = "xvncvhgksrbiaozymtqo";

export const SUPABASE_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2bmN2aGdrc3JiaWFvenltdHFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMDczMzcsImV4cCI6MjA5Mjc4MzMzN30.3QSgvsuEUIl6TbeRwaEcKFNP_Lu063fMj-E_88TsBsE";

const AUTH_STORAGE_KEY = "pilares_admin_session";

export type SupabaseSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: {
    id: string;
    email?: string;
  };
};

type RestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  token?: string;
  body?: unknown;
  query?: string;
  prefer?: string;
  headers?: Record<string, string>;
};

const getHeaders = (
  token?: string,
  prefer?: string,
  extraHeaders?: Record<string, string>,
) => {
  const headers: Record<string, string> = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token ?? SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
    ...extraHeaders,
  };

  if (prefer) {
    headers.Prefer = prefer;
  }

  return headers;
};

export const saveAdminSession = (session: SupabaseSession) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
};

export const getAdminSession = () => {
  const rawSession = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!rawSession) return null;

  try {
    return JSON.parse(rawSession) as SupabaseSession;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const clearAdminSession = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const signInAdmin = async (email: string, password: string) => {
  const response = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    },
  );

  if (!response.ok) {
    throw new Error("E-mail ou senha inválidos.");
  }

  const payload = await response.json();

  return {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token,
    expires_at: payload.expires_at,
    user: payload.user,
  } as SupabaseSession;
};

export const supabaseRest = async <T>(
  table: string,
  {
    method = "GET",
    token,
    body,
    query = "",
    prefer,
    headers,
  }: RestOptions = {},
) => {
  const url = `${SUPABASE_URL}/rest/v1/${table}${query}`;
  const response = await fetch(url, {
    method,
    headers: getHeaders(token, prefer, headers),
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erro ao comunicar com o Supabase.");
  }

  if (response.status === 204) {
    return null as T;
  }

  const responseText = await response.text();
  if (!responseText) {
    return null as T;
  }

  return JSON.parse(responseText) as T;
};

export const createEmailContact = async (payload: {
  name?: string;
  email: string;
  phone?: string;
  source: string;
  notes?: string;
  company?: string;
  role?: string;
  city?: string;
  uf?: string;
  entity_type?: string;
  country?: string;
  team_size?: string;
  message?: string;
}) => {
  return supabaseRest<null>("email_contacts", {
    method: "POST",
    body: {
      name: payload.name || null,
      email: payload.email,
      phone: payload.phone || null,
      source: payload.source,
      notes: payload.notes || null,
      company: payload.company || null,
      role: payload.role || null,
      city: payload.city || null,
      uf: payload.uf || null,
      entity_type: payload.entity_type || null,
      country: payload.country || null,
      team_size: payload.team_size || null,
      message: payload.message || null,
      page_url:
        typeof window !== "undefined" ? window.location.href : null,
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent : null,
      status: "new",
    },
  });
};

export const verifyAdminAccess = async (session: SupabaseSession) => {
  const profiles = await supabaseRest<Array<{ id: string; role: string }>>(
    "admin_profiles",
    {
      token: session.access_token,
      query: `?id=eq.${session.user.id}&select=id,role`,
    },
  );

  return profiles.length > 0;
};
