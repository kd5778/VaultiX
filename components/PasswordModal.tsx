"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { X, Eye, EyeOff, Shuffle, Save, KeyRound } from "lucide-react";
import axios from "axios";

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
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  refreshPasswords: () => Promise<void>;
  initialData?: PasswordEntry;
}

const PasswordModal: React.FC<Props> = ({
  isOpen,
  onClose,
  refreshPasswords,
  initialData,
}) => {
  const [form, setForm] = useState<PasswordEntry>({
    title: "",
    username: "",
    password: "",
    category: "Codes",
    cardNumber: "",
    expiry: "",
    cvv: "",
    notes: "",
    _id: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showCVV, setShowCVV] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        title: "",
        username: "",
        password: "",
        category: "Codes",
        cardNumber: "",
        expiry: "",
        cvv: "",
        notes: "",
        _id: "",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let pass = "";
    for (let i = 0; i < 16; i++)
      pass += charset[Math.floor(Math.random() * charset.length)];
    setForm((prev) => ({ ...prev, password: pass }));
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) {
      alert("Please enter a title");
      return;
    }

    try {
      setIsSubmitting(true);
      if (initialData?._id) {
        await axios.put(`/api/passwords/update/${initialData._id}`, form);
      } else {
        await axios.post("/api/passwords/add", form);
      }
      await refreshPasswords();
      onClose();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="w-full max-w-2xl bg-slate-900 text-white rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {initialData ? "Edit Password" : "Add New Password"}
              </h2>
              <p className="text-sm text-slate-400">
                {initialData
                  ? "Update your secure credentials"
                  : "Store your credentials securely"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Title *
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Facebook, Gmail, SBI Bank"
                className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
              >
                <option value="Codes">Codes</option>
                <option value="Passkeys">Passkeys</option>
                <option value="Wi-Fi">Wi-Fi</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Security">Security</option>
              </select>
            </div>
          </div>

          {form.category === "Credit Card" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Card Number
                </label>
                <input
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    Expiry Date
                  </label>
                  <input
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">
                    CVV
                  </label>
                  <div className="relative">
                    <input
                      name="cvv"
                      type={showCVV ? "text" : "password"}
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="•••"
                      className="w-full p-3 pr-12 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCVV(!showCVV)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded text-slate-400 hover:text-white transition-colors"
                    >
                      {showCVV ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="you@example.com or username"
                  className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••••••••••"
                    className="w-full p-3 pr-24 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={generatePassword}
                      className="p-1.5 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:text-purple-300 transition-colors"
                      title="Generate password"
                    >
                      <Shuffle size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1.5 rounded bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
                      title="Toggle visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any additional information, hints, or backup codes..."
              rows={3}
              className="w-full p-3 rounded-xl bg-slate-800/50 border border-white/10 text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-white/10 bg-slate-800/30">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !form.title.trim()}
            className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                {initialData ? "Update Password" : "Save Password"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
