"use client";

import { useState, useTransition, useRef } from "react";
import { updateProfile } from "@/app/actions/profile";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type ProfileInfo = {
  id: string;
  userId: string;
  country: string | null;
  city: string;
  profilePicture: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type ProfileUserData = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
  profile: ProfileInfo | null;
};

type ProfileUserCardProps = {
  user: ProfileUserData;
};

function PersonalDataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="sm:col-span-2 break-all text-sm font-medium text-slate-800">
        {value}
      </p>
    </div>
  );
}

function EditField({
  label,
  id,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-3">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 pt-2"
      >
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="sm:col-span-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 outline-none transition-all focus:border-[#1434A4] focus:bg-white focus:shadow-[0_0_0_3px_rgba(20,52,164,0.08)]"
      />
    </div>
  );
}

function EditFieldReadOnly({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="sm:col-span-2 break-all rounded-xl border border-dashed border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-400">
        {value}
      </p>
    </div>
  );
}

export default function ProfileUserCard({ user }: ProfileUserCardProps) {
  const t = useTranslations("profile");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [country, setCountry] = useState(user.profile?.country ?? "");
  const [city, setCity] = useState(user.profile?.city ?? "");
  const [profilePicture, setProfilePicture] = useState(
    user.profile?.profilePicture ?? "",
  );

  const displayPicture = profilePicture || null;

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleCancel() {
    setName(user.name);
    setUsername(user.username);
    setCountry(user.profile?.country ?? "");
    setCity(user.profile?.city ?? "");
    setProfilePicture(user.profile?.profilePicture ?? "");
    setError(null);
    setIsEditing(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicture(reader.result as string);
    };
    reader.readAsDataURL(file);
    // reset value agar file yang sama bisa dipilih ulang
    e.target.value = "";
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = await updateProfile(user.id, {
        name,
        username,
        country,
        city,
        profilePicture,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      setIsEditing(false);
      router.refresh();
    });
  }

  return (
    <section className="flex w-full justify-center">
      <article className="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white pb-10 shadow-[0_24px_50px_rgba(15,23,42,0.12)]">
        <div className="h-36 w-full bg-[#1434A4]" />

        <div className="-mt-16 flex flex-col px-6 sm:px-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Avatar – clickable in edit mode */}
              <div
                className={[
                  "relative h-32 w-32 sm:h-40 sm:w-40",
                  isEditing ? "cursor-pointer" : "cursor-default",
                ].join(" ")}
                onClick={() => isEditing && fileInputRef.current?.click()}
              >
                {displayPicture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={displayPicture}
                    alt={t("avatarAlt", { name })}
                    className="h-full w-full rounded-2xl border-4 border-white object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl border-4 border-white bg-[#1f3faf] text-3xl font-bold text-white shadow-lg">
                    {initials || "U"}
                  </div>
                )}

                {/* Pencil overlay – only in edit mode */}
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 drop-shadow"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </div>
                )}
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
                {name}
              </h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                {user.email}
              </p>
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="mt-2 rounded-xl bg-[#1434A4] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0f2b8f]"
              >
                {t("editButton")}
              </button>
            ) : (
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 disabled:opacity-50"
                >
                  {t("cancelButton")}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isPending}
                  className="rounded-xl bg-[#1434A4] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0f2b8f] disabled:opacity-50"
                >
                  {isPending ? t("saveButtonLoading") : t("saveButton")}
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">
              {t("sectionTitle")}
            </h2>

            {error && (
              <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-4 sm:px-5">
              {isEditing ? (
                <>
                  <EditField
                    label={t("fields.nameLabel")}
                    id="edit-name"
                    value={name}
                    onChange={setName}
                    placeholder={t("fields.namePlaceholder")}
                  />
                  <EditField
                    label={t("fields.usernameLabel")}
                    id="edit-username"
                    value={username}
                    onChange={setUsername}
                    placeholder={t("fields.usernamePlaceholder")}
                  />
                  <EditFieldReadOnly
                    label={t("fields.emailLabel")}
                    value={user.email}
                  />
                  <EditField
                    label={t("fields.countryLabel")}
                    id="edit-country"
                    value={country}
                    onChange={setCountry}
                    placeholder={t("fields.countryPlaceholder")}
                  />
                  <EditField
                    label={t("fields.cityLabel")}
                    id="edit-city"
                    value={city}
                    onChange={setCity}
                    placeholder={t("fields.cityPlaceholder")}
                  />
                </>
              ) : (
                <>
                  <PersonalDataRow label={t("fields.nameLabel")} value={name} />
                  <PersonalDataRow
                    label={t("fields.usernameLabel")}
                    value={username}
                  />
                  <PersonalDataRow
                    label={t("fields.emailLabel")}
                    value={user.email}
                  />
                  <PersonalDataRow
                    label={t("fields.countryLabel")}
                    value={country || t("notSetYet")}
                  />
                  <PersonalDataRow
                    label={t("fields.cityLabel")}
                    value={city || t("notSetYet")}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
