"use client";
import { useState } from "react";

function groupByDate(subscribers) {
  const groups = {};
  for (const s of subscribers) {
    const date = new Date(s.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(s);
  }
  return groups;
}

function exportCSV(subscribers) {
  const rows = [
    ["id", "email", "created_at"],
    ...subscribers.map((s) => [s.id, s.email, s.created_at]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "subscribers.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [subscribers, setSubscribers] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(
        "https://lead-api-nine.vercel.app/api/subscribers",
        {
          headers: { Authorization: `Bearer ${password}` },
        },
      );
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setSubscribers(data.subscribers);
    } catch (err) {
      setError(true);
    }
    setLoading(false);
  }

  if (!subscribers) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col gap-4 w-72">
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Admin Access
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="bg-transparent border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/50 transition-colors"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="border border-white/20 rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors text-white"
          >
            {loading ? "..." : "Enter"}
          </button>
          {error && (
            <p className="text-red-400 text-xs text-center">Wrong password</p>
          )}
        </div>
      </div>
    );
  }

  const groups = groupByDate(subscribers);

  return (
    <div className="min-h-screen bg-black px-8 pt-40">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <p className="text-white/40 text-xs tracking-widest uppercase">
            Subscribers
          </p>
          <div className="flex items-center gap-4">
            <p className="text-white/30 text-xs">{subscribers.length} total</p>
            <button
              onClick={() => exportCSV(subscribers)}
              className="border border-white/20 rounded-full px-4 py-2 text-xs hover:bg-white hover:text-black transition-colors text-white"
            >
              Export CSV
            </button>
          </div>
        </div>

        {subscribers.length === 0 && (
          <p className="text-white/30 text-sm">No subscribers yet.</p>
        )}

        {Object.entries(groups).map(([date, entries]) => (
          <div key={date} className="mb-8">
            <p className="text-white/30 text-xs tracking-widest uppercase mb-2 pb-2 border-b border-white/10">
              {date}
            </p>
            {entries.map((s) => (
              <div
                key={s.id}
                className="flex justify-between items-center py-3 border-b border-white/10"
              >
                <p className="text-white text-sm">{s.email}</p>
                <p className="text-white/30 text-xs">
                  {new Date(s.created_at).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
