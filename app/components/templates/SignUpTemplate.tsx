"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/app/components/atoms/Logo";
import AuthInput from "@/app/components/moleculs/AuthInput";
import AuthSelect from "@/app/components/moleculs/AuthSelect";
import { register } from "@/app/actions/register";
import { validateSignUpData } from "@/app/utils/auth-validation";
import {
  IconEmail,
  IconLock,
  IconEyeOn,
  IconEyeOff,
  IconUser,
  IconGoogle,
  IconCheck,
  IconGlobe,
  IconMapPin,
} from "@/app/components/atoms/AuthIcons";
import { useTranslations } from "next-intl";

const STRENGTH_COLORS = ["", "#dc2626", "#f59e0b", "#3b82f6", "#16a34a"];

const CITY_MAP: Record<string, string[]> = {
  Indonesia: [
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Denpasar",
    "Mataram",
    "Yogyakarta",
    "Lombok",
    "Manado",
    "Balikpapan",
    "Malang",
    "Solo",
  ],
  Malaysia: [
    "Kuala Lumpur",
    "George Town",
    "Johor Bahru",
    "Kota Kinabalu",
    "Malacca",
  ],
  Singapura: ["Singapore"],
  Thailand: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
  Filipina: ["Manila", "Cebu", "Davao", "Quezon City"],
  Vietnam: ["Ho Chi Minh City", "Hanoi", "Da Nang"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth"],
  Jepang: ["Tokyo", "Osaka", "Kyoto", "Yokohama"],
  "Korea Selatan": ["Seoul", "Busan", "Incheon"],
};
const COUNTRIES = Object.keys(CITY_MAP);

function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export default function SignUpTemplate() {
  const t = useTranslations("auth.signUp");
  const STRENGTH_LABELS = [
    "",
    t("passwordStrength.weak"),
    t("passwordStrength.fair"),
    t("passwordStrength.good"),
    t("passwordStrength.strong"),
  ];

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const strength = password ? passwordStrength(password) : 0;

  function validate() {
    const result = validateSignUpData({
      name,
      username,
      email,
      country,
      city,
      password,
      confirmPassword: confirm,
    });

    const e: Record<string, string> = {};

    if (!result.success) {
      for (const issue of result.error.issues) {
        const key =
          issue.path[0] === "confirmPassword"
            ? "confirm"
            : String(issue.path[0]);
        if (!e[key]) e[key] = issue.message;
      }
    }

    if (!agree) e.agree = "true";

    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsLoading(true);
    setError(null);
    try {
      const result = await register({
        name,
        username,
        email,
        country,
        city,
        password,
        confirmPassword: confirm,
      });
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    } catch {
      setError(t("error.generic"));
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background:
            "linear-gradient(135deg, #eef0fb 0%, #f5f6fb 60%, #dde6ff 100%)",
        }}
      >
        <div
          className="w-full max-w-sm rounded-2xl p-10 flex flex-col items-center gap-4 text-center"
          style={{
            background: "#fff",
            boxShadow: "0 8px 40px rgba(20,52,164,0.12)",
          }}
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(22,163,74,0.1)" }}
          >
            <IconCheck size={32} style={{ color: "#16a34a" }} />
          </div>
          <h2 className="text-2xl font-extrabold" style={{ color: "#0d2280" }}>
            {t("success.title")}
          </h2>
          <p className="text-sm" style={{ color: "#4050b5" }}>
            {t("success.subtext")}
          </p>
          <Link
            href="/signin"
            className="mt-2 w-full rounded-xl py-3 text-sm font-extrabold text-white text-center"
            style={{
              background: "linear-gradient(90deg, #0d2280 0%, #1434A4 100%)",
            }}
          >
            {t("success.button")}
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background:
            "linear-gradient(135deg, #eef0fb 0%, #f5f6fb 60%, #dde6ff 100%)",
        }}
      >
        <div
          className="w-full max-w-sm rounded-2xl p-10 flex flex-col items-center gap-4 text-center"
          style={{
            background: "#fff",
            boxShadow: "0 8px 40px rgba(20,52,164,0.12)",
          }}
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <span style={{ fontSize: "32px" }}>⚠️</span>
          </div>
          <h2 className="text-2xl font-extrabold" style={{ color: "#0d2280" }}>
            {t("error.registrationFailedTitle")}
          </h2>
          <p className="text-sm" style={{ color: "#dc2626" }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 w-full rounded-xl py-3 text-sm font-extrabold text-white text-center"
            style={{
              background: "linear-gradient(90deg, #0d2280 0%, #1434A4 100%)",
            }}
          >
            {t("error.retryButton")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex"
      style={{
        background:
          "linear-gradient(135deg, #eef0fb 0%, #f5f6fb 60%, #dde6ff 100%)",
      }}
    >
      {/* Left — decorative panel (desktop only) */}
      <div
        className="hidden lg:flex lg:w-[48%] flex-col justify-between p-12"
        style={{
          background:
            "linear-gradient(160deg, #0d2280 0%, #1434A4 55%, #3d52c6 100%)",
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Logo />
          <span className="text-2xl font-extrabold text-white tracking-tight">
            Travelita
          </span>
        </div>

        {/* Features list */}
        <div>
          <p className="text-4xl font-extrabold text-white leading-tight mb-6">
            {t("leftPanelHeading")}
          </p>
          {[t("feature1"), t("feature2"), t("feature3"), t("feature4")].map(
            (item) => (
              <div key={item} className="flex items-start gap-3 mb-3">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(255,255,255,0.2)" }}
                >
                  <IconCheck size={12} style={{ color: "#fff" }} />
                </span>
                <p
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.80)" }}
                >
                  {item}
                </p>
              </div>
            ),
          )}
        </div>

        {/* Decorative dots */}
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: i === 1 ? 28 : 8,
                height: 8,
                background: i === 1 ? "#fff" : "rgba(255,255,255,0.3)",
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
            <Logo />
            <span
              className="text-xl font-extrabold"
              style={{ color: "#0d2280" }}
            >
              Travelita
            </span>
          </div>

          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ color: "#0d2280" }}
          >
            {t("pageTitle")}
          </h1>
          <p className="text-sm mb-8" style={{ color: "#4050b5" }}>
            {t("alreadyHaveAccountText")}{" "}
            <Link
              href="/signin"
              className="font-semibold underline"
              style={{ color: "#1434A4" }}
            >
              {t("signInLink")}
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
            {t("googleButton")}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
              {t("dividerText")}
            </span>
            <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <AuthInput
              id="name"
              label={t("nameLabel")}
              placeholder={t("namePlaceholder")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<IconUser size={16} />}
              error={errors.name}
              autoComplete="name"
              required
            />

            <AuthInput
              id="username"
              label={t("usernameLabel")}
              placeholder={t("usernamePlaceholder")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<IconUser size={16} />}
              error={errors.username}
              autoComplete="username"
              required
            />

            <AuthInput
              id="email"
              label={t("emailLabel")}
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<IconEmail size={16} />}
              error={errors.email}
              autoComplete="email"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <AuthSelect
                id="country"
                label={t("countryLabel")}
                placeholder={t("countryPlaceholder")}
                value={country}
                onChange={(v) => {
                  setCountry(v);
                  setCity("");
                }}
                options={COUNTRIES}
                icon={<IconGlobe size={16} />}
                error={errors.country}
                required
              />
              <AuthSelect
                id="city"
                label={t("cityLabel")}
                placeholder={t("cityPlaceholder")}
                value={city}
                onChange={setCity}
                options={CITY_MAP[country] || []}
                icon={<IconMapPin size={16} />}
                error={errors.city}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <AuthInput
                id="password"
                label={t("passwordLabel")}
                type={showPass ? "text" : "password"}
                placeholder={t("passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<IconLock size={16} />}
                trailingIcon={
                  showPass ? <IconEyeOff size={16} /> : <IconEyeOn size={16} />
                }
                onTrailingIconClick={() => setShowPass((p) => !p)}
                error={errors.password}
                autoComplete="new-password"
                required
              />
              {/* Strength bar */}
              {password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all"
                        style={{
                          background:
                            i <= strength
                              ? STRENGTH_COLORS[strength]
                              : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: STRENGTH_COLORS[strength] }}
                  >
                    {STRENGTH_LABELS[strength]}
                  </span>
                </div>
              )}
            </div>

            <AuthInput
              id="confirm"
              label={t("confirmPasswordLabel")}
              type={showConf ? "text" : "password"}
              placeholder={t("confirmPasswordPlaceholder")}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              icon={<IconLock size={16} />}
              trailingIcon={
                showConf ? <IconEyeOff size={16} /> : <IconEyeOn size={16} />
              }
              onTrailingIconClick={() => setShowConf((p) => !p)}
              error={errors.confirm}
              autoComplete="new-password"
              required
            />

            {/* Terms */}
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <div className="relative mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <div
                    className="h-4.5 w-4.5 rounded flex items-center justify-center transition-all"
                    style={{
                      border: agree ? "none" : "1.5px solid #9ca3af",
                      background: agree ? "#1434A4" : "#fff",
                      width: 18,
                      height: 18,
                    }}
                  >
                    {agree && <IconCheck size={11} style={{ color: "#fff" }} />}
                  </div>
                </div>
                <span className="text-xs" style={{ color: "#4b5563" }}>
                  {t("terms.text")}{" "}
                  <Link
                    href="#"
                    className="font-semibold underline"
                    style={{ color: "#1434A4" }}
                  >
                    {t("terms.termsLink")}
                  </Link>{" "}
                  {t("terms.and")}{" "}
                  <Link
                    href="#"
                    className="font-semibold underline"
                    style={{ color: "#1434A4" }}
                  >
                    {t("terms.privacyLink")}
                  </Link>{" "}
                  {t("terms.brand")}
                </span>
              </label>
              {errors.agree && (
                <p className="text-xs" style={{ color: "#dc2626" }}>
                  {t("terms.error")}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-xl py-3.5 text-sm font-extrabold text-white transition-all"
              style={{
                background: isLoading
                  ? "#6b7280"
                  : "linear-gradient(90deg, #0d2280 0%, #1434A4 100%)",
                boxShadow: isLoading
                  ? "none"
                  : "0 4px 16px rgba(20,52,164,0.35)",
              }}
            >
              {isLoading ? t("submitButtonLoading") : t("submitButton")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
