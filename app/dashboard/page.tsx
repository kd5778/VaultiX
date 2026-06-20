"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Sun,
  KeyRound,
  Wifi,
  CreditCard,
  Trash2,
  AlertCircle,
  Plus,
  Search,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Edit,
  Trash,
  Shield,
  Lock,
  RotateCcw,
} from "lucide-react";

import PasswordModal from "@/components/PasswordModal";

interface PasswordEntry {
  title: string;
  username: string;
  password: string;
  category: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  notes: string;
  _id: string;
  updatedAt?: string;
}

const categories = [
  { label: "All", icon: Sun, color: "from-yellow-500 to-orange-500" },
  { label: "Passkeys", icon: KeyRound, color: "from-blue-500 to-purple-500" },
  { label: "Codes", icon: KeyRound, color: "from-green-500 to-emerald-500" },
  { label: "Wi-Fi", icon: Wifi, color: "from-cyan-500 to-blue-500" },
  { label: "Security", icon: AlertCircle, color: "from-red-500 to-pink-500" },
  { label: "Deleted", icon: Trash2, color: "from-gray-500 to-slate-500" },
  {
    label: "Credit Card",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
  },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PasswordEntry | null>(null);
  const [items, setItems] = useState<PasswordEntry[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<PasswordEntry | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/passwords/get");
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch passwords:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this password?")) return;
    try {
      await axios.delete(`/api/passwords/delete/${id}`);
      fetchPasswords();
      setSelectedItem(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await axios.put(`/api/passwords/restore/${id}`);
      fetchPasswords();
      setSelectedItem(null);
    } catch (err) {
      console.error("Restore failed:", err);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!confirm("This will permanently delete this password. This cannot be undone. Continue?")) return;
    try {
      await axios.delete(`/api/passwords/permanent/${id}`);
      fetchPasswords();
      setSelectedItem(null);
    } catch (err) {
      console.error("Permanent delete failed:", err);
    }
  };

  const handleEmptyTrash = async () => {
    if (!confirm("This will permanently delete all items in Deleted. This cannot be undone. Continue?")) return;
    try {
      await axios.delete("/api/passwords/empty-trash");
      fetchPasswords();
      setSelectedItem(null);
    } catch (err) {
      console.error("Empty trash failed:", err);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      alert("Failed to copy to clipboard.");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchCategory =
      selectedCategory === "All"
        ? item.category !== "Deleted"
        : item.category === selectedCategory;
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: PasswordEntry) => {
    setEditData(item);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gradient-to-br from-slate-50 via-purple-50/20 to-slate-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-slate-900 text-slate-900 dark:text-white">
      <div className="w-64 p-6 border-r border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold gradient-text">Categories</h2>
        </div>

        {categories.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            onClick={() => {
              setSelectedCategory(label);
              setSelectedItem(null);
            }}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
              selectedCategory === label
                ? `bg-gradient-to-r ${color} text-white shadow-lg`
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            }`}
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
            {selectedCategory === label && (
              <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="w-80 border-r border-slate-200 dark:border-white/10 p-6 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search passwords..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-700/50 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Lock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No passwords found</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item._id}
                className={`group p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-200/50 dark:hover:bg-white/5 border border-transparent hover:border-slate-300 dark:hover:border-white/10 ${
                  selectedItem?._id === item._id
                    ? "bg-slate-200/50 dark:bg-white/10 border-slate-300 dark:border-white/20"
                    : ""
                }`}
                onClick={() => {
                  setSelectedItem(item);
                  setShowPassword(false);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 truncate">
                      {item.username}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-200 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                        {item.category}
                      </span>
                      {selectedCategory === "Deleted" && item.updatedAt && (
                        <span className="text-xs text-red-400">
                          {Math.max(0, 30 - Math.floor((Date.now() - new Date(item.updatedAt).getTime()) / 86400000))} days left
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {selectedCategory === "Deleted" ? (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestore(item._id);
                          }}
                          className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 transition-colors"
                          title="Restore"
                        >
                          <RotateCcw size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePermanentDelete(item._id);
                          }}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-colors"
                          title="Delete Forever"
                        >
                          <Trash size={14} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditModal(item);
                          }}
                          className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-300 transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.password);
                          }}
                          className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-300 transition-colors"
                          title="Copy Password"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id);
                          }}
                          className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-colors"
                          title="Delete"
                        >
                          <Trash size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 p-8 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                {selectedItem ? selectedItem.title : "Welcome to VaultiX"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400">
                {selectedItem
                  ? "Manage your secure credentials"
                  : selectedCategory === "Deleted"
                  ? "Items here are permanently deleted after 30 days"
                  : "Your passwords are protected with military-grade encryption"}
              </p>
            </div>

            {selectedCategory === "Deleted" ? (
              filteredItems.length > 0 && (
                <button
                  onClick={handleEmptyTrash}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 hover:scale-105"
                >
                  <Trash size={20} />
                  Empty Trash
                </button>
              )
            ) : (
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
              >
                <Plus size={20} />
                Add Password
              </button>
            )}
          </div>

          {selectedItem ? (
            <div className="glass-effect rounded-2xl p-8 border border-slate-200 dark:border-white/10 max-w-4xl mx-auto space-y-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <KeyRound size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {selectedItem.title}
                      </h2>
                      {selectedItem.category !== "Credit Card" &&
                        selectedItem.category !== "Wi-Fi" && (
                          <a
                            href={`https://${selectedItem.title.toLowerCase()}.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                          >
                            <ExternalLink size={14} />
                            Visit Site
                          </a>
                        )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">
                      Category:{" "}
                      <span className="text-slate-900 dark:text-white font-medium">
                        {selectedItem.category}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {selectedItem.category === "Deleted" ? (
                    <>
                      <button
                        onClick={() => handleRestore(selectedItem._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                      >
                        <RotateCcw size={16} />
                        Restore
                      </button>
                      <button
                        onClick={() => handlePermanentDelete(selectedItem._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash size={16} />
                        Delete Forever
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => openEditModal(selectedItem)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(selectedItem._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        <Trash size={16} />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedItem.category !== "Credit Card" ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Username
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-white/10">
                        <span className="text-slate-900 dark:text-white font-mono flex-1">
                          {selectedItem.username}
                        </span>
                        <button
                          onClick={() => handleCopy(selectedItem.username)}
                          className="p-1.5 rounded bg-slate-200 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="Copy username"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Password
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-white/10">
                        <span className="text-slate-900 dark:text-white font-mono flex-1">
                          {showPassword
                            ? selectedItem.password
                            : "•".repeat(12)}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1.5 rounded bg-slate-200 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="Toggle visibility"
                          >
                            {showPassword ? (
                              <EyeOff size={14} />
                            ) : (
                              <Eye size={14} />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopy(selectedItem.password)}
                            className="p-1.5 rounded bg-slate-200 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                            title="Copy password"
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Card Number
                      </label>
                      <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-white/10">
                        <span className="text-slate-900 dark:text-white font-mono flex-1">
                          {selectedItem.cardNumber}
                        </span>
                        <button
                          onClick={() => handleCopy(selectedItem.cardNumber)}
                          className="p-1.5 rounded bg-slate-200 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="Copy card number"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Expiry
                        </label>
                        <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-white/10">
                          <span className="text-slate-900 dark:text-white">
                            {selectedItem.expiry}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          CVV
                        </label>
                        <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-white/10">
                          <span className="text-slate-900 dark:text-white">{selectedItem.cvv}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {selectedItem.notes && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Notes
                  </label>
                  <div className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-white/10">
                    <p className="text-slate-600 dark:text-slate-300">{selectedItem.notes}</p>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-xl border border-purple-300/30 dark:border-purple-500/20">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Security Tips
                </h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Update passwords every 30 days
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Use unique passwords for each account
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Enable 2FA whenever possible
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Never share your credentials
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a password</h3>
              <p className="text-center max-w-md text-slate-500">
                Choose a password from the list to view its details and manage
                your credentials securely.
              </p>
            </div>
          )}
        </div>

        {isModalOpen && (
          <PasswordModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            refreshPasswords={fetchPasswords}
            initialData={editData as PasswordEntry}
          />
        )}
      </div>
    </div>
  );
}