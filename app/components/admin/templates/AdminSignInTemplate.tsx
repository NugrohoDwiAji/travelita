"use client";

import { useState, useCallback } from "react";
import AuthInput from "@/app/components/moleculs/AuthInput";
import Logo from "@/app/components/atoms/Logo";
import {
  IconEmail,
  IconLock,
  IconEyeOn,
  IconEyeOff,
} from "@/app/components/atoms/AuthIcons";
import { validateLoginData } from "@/app/utils/auth-validation";
import { loginAdmin } from "@/app/actions/auth";

export default function AdminSignInTemplate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || !password.trim()) {
        setErrorMessage("Email dan password wajib diisi.");
        return;
      }
      // Client-side field validation
      const validation = validateLoginData({ email, password });
      if (!validation.success) {
        const newErrors: typeof fieldErrors = {};
        validation.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof typeof fieldErrors;
          if (field) newErrors[field] = issue.message;
        });
        setFieldErrors(newErrors);
        return;
      }
      setFieldErrors({});
      try {
        const result = await loginAdmin(email, password);
        if (result.error) {
          // Redirect handled in login action, just clear errors here
          setErrorMessage(result.error);
        }


      } catch {}finally {
        setIsLoading(false);  
      }
    },
    [email, password],
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Background blobs */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-125 h-125 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #3d52c6, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-100 h-100 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #1434A4, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl p-8 sm:p-10"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo + header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: "linear-gradient(135deg, #1434A4, #3d52c6)",
              boxShadow: "0 8px 24px rgba(20,52,164,0.5)",
            }}
          >
            <Logo  />
          </div>

          <div
            className="mb-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
            style={{
              background: "rgba(20,52,164,0.25)",
              color: "#a0aaee",
              border: "1px solid rgba(100,120,220,0.3)",
            }}
          >
            <span
              className="inline-block rounded-full animate-pulse"
              style={{ width: 6, height: 6, background: "#60a5fa" }}
            />
            Admin Panel
          </div>

          <h1 className="mt-3 text-2xl font-extrabold text-white">
            Masuk ke Dashboard
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Khusus tim internal Travelita
          </p>
        </div>

        {/* Server error banner */}
        {errorMessage && (
          <div
            className="mb-5 rounded-xl px-4 py-3 text-sm font-medium"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.4)",
              color: "#fca5a5",
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <AuthInput
            id="admin-email"
            label="Email"
            type="email"
            placeholder="admin@travelita.id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<IconEmail size={16} />}
            error={fieldErrors.email}
            autoComplete="username"
            required
          />

          <AuthInput
            id="admin-password"
            label="Password"
            type={showPass ? "text" : "password"}
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<IconLock size={16} />}
            trailingIcon={
              showPass ? <IconEyeOff size={16} /> : <IconEyeOn size={16} />
            }
            onTrailingIconClick={() => setShowPass((p) => !p)}
            error={fieldErrors.password}
            autoComplete="current-password"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full rounded-xl py-3.5 text-sm font-extrabold text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: isLoading
                ? "rgba(100,120,220,0.4)"
                : "linear-gradient(90deg, #0d2280 0%, #1434A4 100%)",
              boxShadow: isLoading ? "none" : "0 4px 20px rgba(20,52,164,0.5)",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke="#fff"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                Memverifikasi...
              </span>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        {/* Footer */}
        <p
          className="mt-6 text-center text-xs"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          © {new Date().getFullYear()} Travelita · Admin Portal
        </p>
      </div>
    </div>
  );
}
