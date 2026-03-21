"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/app/components/atoms/Logo/Logo";
import AuthInput from "@/app/components/moleculs/AuthInput/AuthInput";
import {
  IconEmail,
  IconLock,
  IconEyeOn,
  IconEyeOff,
  IconGoogle,
} from "@/app/components/atoms/AuthIcons/AuthIcons";

export default function SignInTemplate() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors]     = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading]   = useState(false);

  function validate() {
    const e: typeof errors = {};
    if (!email.trim())                          e.email    = "Email wajib diisi.";
    else if (!/\S+@\S+\.\S+/.test(email))       e.email    = "Format email tidak valid.";
    if (!password)                              e.password = "Password wajib diisi.";
    else if (password.length < 6)               e.password = "Password minimal 6 karakter.";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    // TODO: integrate with auth provider
    setTimeout(() => setLoading(false), 1500);
  }

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "linear-gradient(135deg, #eef0fb 0%, #f5f6fb 60%, #dde6ff 100%)" }}
    >
      {/* Left — decorative panel (desktop only) */}
      <div
        className="hidden lg:flex lg:w-[48%] flex-col justify-between p-12"
        style={{
          background: "linear-gradient(160deg, #0d2280 0%, #1434A4 55%, #3d52c6 100%)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Logo width={40} height={40} />
          <span className="text-2xl font-extrabold text-white tracking-tight">Travelita</span>
        </div>

        {/* Quote */}
        <div>
          <p
            className="text-4xl font-extrabold text-white leading-tight mb-4"
          >
            Selamat datang<br />kembali! 👋
          </p>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.65)" }}>
            Masuk ke akunmu dan lanjutkan petualanganmu bersama Travelita.
          </p>
        </div>

        {/* Decorative dots */}
        <div className="flex gap-2">
          {[0,1,2,3,4].map((i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: i === 0 ? 28 : 8,
                height: 8,
                background: i === 0 ? "#fff" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Right — form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <Logo width={32} height={32} />
            <span className="text-xl font-extrabold" style={{ color: "#0d2280" }}>Travelita</span>
          </div>

          <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#0d2280" }}>Masuk</h1>
          <p className="text-sm mb-8" style={{ color: "#4050b5" }}>
            Belum punya akun?{" "}
            <Link href="/signup" className="font-semibold underline" style={{ color: "#1434A4" }}>
              Daftar sekarang
            </Link>
          </p>

          {/* Google SSO */}
          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-xl py-3 text-sm font-semibold transition-all mb-6"
            style={{
              background: "#fff",
              border: "1.5px solid #e5e7eb",
              color: "#374151",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <IconGoogle size={18} />
            Masuk dengan Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>atau masuk dengan email</span>
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <AuthInput
              id="email"
              label="Email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<IconEmail size={16} />}
              error={errors.email}
              autoComplete="email"
              required
            />

            <AuthInput
              id="password"
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<IconLock size={16} />}
              trailingIcon={showPass ? <IconEyeOff size={16} /> : <IconEyeOn size={16} />}
              onTrailingIconClick={() => setShowPass((p) => !p)}
              error={errors.password}
              autoComplete="current-password"
              required
            />

            {/* Forgot */}
            <div className="flex justify-end -mt-2">
              <Link href="#" className="text-xs font-semibold" style={{ color: "#1434A4" }}>
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl py-3.5 text-sm font-extrabold text-white transition-all"
              style={{
                background: loading ? "#6b7280" : "linear-gradient(90deg, #0d2280 0%, #1434A4 100%)",
                boxShadow: loading ? "none" : "0 4px 16px rgba(20,52,164,0.35)",
              }}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
