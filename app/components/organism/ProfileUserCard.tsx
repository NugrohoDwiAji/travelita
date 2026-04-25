"use client";

import { useState, useTransition, useRef } from "react";
import { updateProfile } from "@/app/actions/profile";
import { useRouter } from "next/navigation";

type ProfileInfo = {
  id: string;
  userId: string;
  coutry: string;
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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="sm:col-span-2 break-all text-sm font-medium text-slate-800">{value}</p>
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
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{label}</p>
      <p className="sm:col-span-2 break-all rounded-xl border border-dashed border-slate-200 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-400">
        {value}
      </p>
    </div>
  );
}

export default function ProfileUserCard({ user }: ProfileUserCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [coutry, setCoutry] = useState(user.profile?.coutry ?? "");
  const [city, setCity] = useState(user.profile?.city ?? "");
  const [profilePicture, setProfilePicture] = useState(
    user.profile?.profilePicture ?? ""
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
    setCoutry(user.profile?.coutry ?? "");
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
        coutry,
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
                  <img
                    src={displayPicture}
                    alt={`Foto profil ${name}`}
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

              <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">{name}</h1>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">{user.email}</p>
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="mt-2 rounded-xl bg-[#1434A4] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0f2b8f]"
              >
                Edit Profile
              </button>
            ) : (
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50 disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isPending}
                  className="rounded-xl bg-[#1434A4] px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0f2b8f] disabled:opacity-50"
                >
                  {isPending ? "Menyimpan…" : "Simpan"}
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6">
            <h2 className="text-base font-bold text-slate-900 sm:text-lg">Data Pribadi</h2>

            {error && (
              <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white px-4 sm:px-5">
              {isEditing ? (
                <>
                  <EditField label="Nama" id="edit-name" value={name} onChange={setName} placeholder="Nama lengkap" />
                  <EditField label="Username" id="edit-username" value={username} onChange={setUsername} placeholder="username" />
                  <EditFieldReadOnly label="Email" value={user.email} />
                  <EditField label="Country" id="edit-country" value={coutry} onChange={setCoutry} placeholder="Negara" />
                  <EditField label="City" id="edit-city" value={city} onChange={setCity} placeholder="Kota" />
                </>
              ) : (
                <>
                  <PersonalDataRow label="Nama" value={name} />
                  <PersonalDataRow label="Username" value={username} />
                  <PersonalDataRow label="Email" value={user.email} />
                  <PersonalDataRow label="Country" value={coutry || "Belum diatur"} />
                  <PersonalDataRow label="City" value={city || "Belum diatur"} />
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}