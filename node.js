import React, { useEffect, useMemo, useRef, useState } from "react";
import { Home, Users, Folder, Settings, Plus, User as UserIcon, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// -----------------------------
// Emerald Cove Properties – Minimal Dashboard
// Step 1: Static layout with local state + add-client modal
// TailwindCSS recommended. Works in a single file for quick preview.
// -----------------------------

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "clients", label: "Clients", icon: Users },
  { key: "projects", label: "Projects", icon: Folder },
  { key: "settings", label: "Settings", icon: Settings },
];

const seedClients = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" },
  { name: "Joe Bloggs", email: "joe.bloggs@example.com" },
  { name: "Sarah Johnson", email: "sarah.johnson@example.com" },
];

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [clients, setClients] = useState(() => {
    try {
      const raw = localStorage.getItem("ec_clients");
      return raw ? JSON.parse(raw) : seedClients;
    } catch (e) {
      return seedClients;
    }
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("ec_clients", JSON.stringify(clients));
    } catch (e) {
      // ignore
    }
  }, [clients]);

  const totalClients = clients.length;

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top Bar */}
      <header className="h-16 bg-white/70 backdrop-blur border-b border-neutral-200 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <GemIcon className="w-9 h-9 text-emerald-600" />
          <div className="leading-tight">
            <div className="font-semibold tracking-wide text-emerald-900 text-lg">EMERALD COVE</div>
            <div className="text-[10px] tracking-widest text-neutral-500 -mt-0.5">PROPERTIES</div>
          </div>
        </div>
        <div className="hidden md:block text-xs sm:text-sm tracking-widest text-neutral-600">
          WHERE EVERY HOME IS A TREASURE
        </div>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-neutral-700" />
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-60 shrink-0 bg-neutral-900 text-neutral-100 min-h-[calc(100vh-4rem)] p-3 sm:p-4">
          <nav className="space-y-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => setActive(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition shadow-sm/0 ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-300 hover:bg-neutral-800/60"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-5 sm:p-8">
          {active === "dashboard" && (
            <section>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Dashboard</h1>

              <div className="mt-6">
                <div className="bg-neutral-100 rounded-2xl p-5 sm:p-6 border border-neutral-200 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-neutral-600 font-medium">Total Clients</div>
                    <div className="text-3xl font-extrabold">{totalClients}</div>
                  </div>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 text-white px-4 py-3 shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <Plus className="w-4 h-4" /> Add Client
                  </button>
                </div>
              </div>

              <section className="mt-10">
                <h2 className="text-2xl sm:text-3xl font-semibold">Clients</h2>
                <div className="mt-4 bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-neutral-50 text-neutral-600 text-sm">
                      <tr>
                        <th className="text-left py-3 px-6">Name</th>
                        <th className="text-left py-3 px-6">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {clients.map((c, i) => (
                        <tr key={i} className="hover:bg-neutral-50">
                          <td className="py-3 px-6">{c.name}</td>
                          <td className="py-3 px-6 text-neutral-700">{c.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </section>
          )}

          {active === "clients" && (
            <ClientListPage
              clients={clients}
              onAdd={() => setModalOpen(true)}
              setClients={setClients}
            />
          )}

          {active === "projects" && (
            <Placeholder title="Projects" subtitle="Track property projects here." />
          )}
          {active === "settings" && (
            <Placeholder title="Settings" subtitle="Manage preferences and integrations." />)
          }
        </main>
      </div>

      <AddClientModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={(client) => {
          setClients((prev) => [...prev, client]);
          setModalOpen(false);
        }}
      />
    </div>
  );
}

function Placeholder({ title, subtitle }) {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 text-neutral-600">{subtitle}</p>
      <div className="mt-6 p-6 border rounded-2xl bg-white">Coming soon…</div>
    </div>
  );
}

function ClientListPage({ clients, onAdd, setClients }) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Clients</h1>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 text-white px-4 py-3 shadow hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4" /> Add Client
        </button>
      </div>

      <div className="mt-4 bg-white rounded-2xl border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 text-neutral-600 text-sm">
            <tr>
              <th className="text-left py-3 px-6">Name</th>
              <th className="text-left py-3 px-6">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {clients.map((c, i) => (
              <tr key={i} className="hover:bg-neutral-50">
                <td className="py-3 px-6">{c.name}</td>
                <td className="py-3 px-6 text-neutral-700">{c.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AddClientModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const ref = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    } else {
      setName("");
      setEmail("");
      setErrors({});
    }
  }, [open]);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    onAdd({ name: name.trim(), email: email.trim() });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ y: 20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border"
            >
              <h3 className="text-xl font-semibold">Add Client</h3>
              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-neutral-700 mb-1">Name</label>
                  <input
                    ref={ref}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Jane Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-neutral-700 mb-1">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="jane@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl border hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Save Client
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GemIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 3l3.5 3.5L12 10 8.5 6.5 12 3z" fill="currentColor" opacity=".85" />
      <path d="M4 9l4.5-4.5L12 10l-5 9L4 9z" fill="currentColor" opacity=".6" />
      <path d="M20 9l-4.5-4.5L12 10l5 9 3-10z" fill="currentColor" />
    </svg>
  );
}
