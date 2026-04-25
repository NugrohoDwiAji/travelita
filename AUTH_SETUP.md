# Authentication Setup - Travelita

Dokumentasi lengkap untuk sistem autentikasi signup/login di Travelita.

## 📁 Struktur File

```
app/
├── api/auth/
│   └── register/
│       └── route.ts              # API endpoint untuk signup
├── hooks/
│   ├── useSignUp.ts             # Client hook untuk signup
│   └── useLogin.ts              # Client hook untuk login
├── utils/
│   ├── auth-validation.ts       # Fungsi validasi input
│   └── password.ts              # Fungsi hashing & compare password
├── types/
│   └── auth.ts                  # Type definitions
├── lib/
│   ├── prisma.ts                # Prisma client instance
│   └── api-response.ts          # Response helper functions
└── components/templates/
    └── SignUpTemplate/
        └── SignUpTemplate.tsx   # UI untuk signup (sudah integrated)
```

## 🔐 Fitur Keamanan

### 1. Password Hashing
- Menggunakan **bcryptjs** (v3.0.3)
- Salt rounds: 10 (default)
- Password tidak pernah disimpan plain text

```typescript
import { hashPassword, comparePassword } from "@/app/utils/password";

// Hash password saat signup
const hashedPassword = await hashPassword(userPassword);

// Verify password saat login
const isMatch = await comparePassword(userInputPassword, hashedPassword);
```

### 2. Validasi Input Ketat

#### Email
- Format valid (RFC 5322 simplified)

#### Username
- Minimal 3 karakter
- Maksimal 20 karakter
- Hanya huruf, angka, underscore

#### Password
- Minimal 8 karakter
- Minimal 1 huruf besar
- Minimal 1 huruf kecil
- Minimal 1 angka

#### Nama
- Minimal 2 karakter
- Maksimal 50 karakter

```typescript
import { validateSignUpData } from "@/app/utils/auth-validation";

const validation = validateSignUpData({
  email: "user@example.com",
  name: "John Doe",
  username: "john_doe",
  password: "SecurePass123",
  confirmPassword: "SecurePass123"
});

if (!validation.valid) {
  console.error(validation.message);
}
```

### 3. Duplikasi Prevention
- Email unik di database (unique constraint)
- Username unik di database

## 🚀 API Endpoint

### POST `/api/auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "username": "john_doe",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-string",
    "email": "user@example.com",
    "name": "John Doe",
    "username": "john_doe",
    "createdAt": "2026-04-08T10:30:00Z"
  },
  "message": "Pendaftaran berhasil"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Email sudah terdaftar",
  "error": "..."
}
```

## 🎣 Client-Side Hooks

### useSignUp Hook

```typescript
import { useSignUp } from "@/app/hooks/useSignUp";

export function MyComponent() {
  const { isLoading, error, success, signUp, reset } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await signUp({
      email: "user@example.com",
      name: "John Doe",
      username: "john_doe",
      password: "SecurePass123",
      confirmPassword: "SecurePass123"
    });
  };

  if (success) {
    return <p>Sukses! Redirecting...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
}
```

**Return Values:**
- `isLoading: boolean` - Sedang memproses request
- `error: string | null` - Error message dari server
- `success: boolean` - Signup berhasil
- `signUp(data)` - Fungsi untuk submit signup
- `reset()` - Reset state

**Behavior:**
- Auto-redirect ke `/signin` setelah 1.5 detik jika berhasil
- Menampilkan error message jika gagal
- Loading state selama proses

### useLogin Hook

```typescript
import { useLogin } from "@/app/hooks/useLogin";

export function LoginComponent() {
  const { isLoading, error, success, login, reset } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await login({
      email: "user@example.com",
      password: "SecurePass123"
    });
  };

  // Similar usage to useSignUp
}
```

## 🔧 Setup Database

Pastikan table `users` sudah ada di database dengan struktur:

```prisma
model Users {
  id        String   @id @default(uuid())
  name      String
  username  String   @unique
  email     String   @unique
  password  String   // hashed password
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

## 📝 Environment Variables

Pastikan `.env` sudah dikonfigurasi dengan database credentials:

```env
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=travelita
```

## 🔗 Integrasi Dengan Komponen

### SignUpTemplate sudah terintegrasi dengan `useSignUp`

File: `app/components/templates/SignUpTemplate/SignUpTemplate.tsx`

- ✅ Validasi form
- ✅ Error handling
- ✅ Loading state
- ✅ Success message
- ✅ Auto-redirect ke signin

### Untuk membuat form signup custom:

```typescript
"use client";

import { useState } from "react";
import { useSignUp } from "@/app/hooks/useSignUp";

export default function CustomSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const { isLoading, error, success, signUp } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(formData);
  };

  if (success) {
    return <div>✓ Sign up successful! Redirecting...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      {/* other fields */}
      <button disabled={isLoading}>Sign Up</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
}
```

## ⚡ Validation Functions

Gunakan utility di `app/utils/auth-validation.ts`:

```typescript
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateName,
  validateSignUpData
} from "@/app/utils/auth-validation";

// Validasi individual
validateEmail("user@example.com"); // true
validateUsername("john_doe");      // { valid: true }
validatePassword("SecurePass123"); // { valid: true }
validateName("John Doe");          // { valid: true }

// Validasi semua sekaligus
validateSignUpData({
  email: "user@example.com",
  name: "John Doe",
  username: "john_doe",
  password: "SecurePass123",
  confirmPassword: "SecurePass123"
});
// { valid: true }
```

## 🔄 Request Flow

```
User Form
    ↓
Client validation (useSignUp hook)
    ↓
POST /api/auth/register
    ↓
Server validation (auth-validation.ts)
    ↓
Check email/username duplicate
    ↓
Hash password (bcryptjs)
    ↓
Create user in database
    ↓
Return success response
    ↓
Auto-redirect to signin
```

## 🛠️ Troubleshooting

### "Module not found: @/generated/prisma/client"
- Pastikan sudah run `prisma generate`
- Check `prisma.schema` valid

### "Expected 1 arguments, but got 0" (Prisma)
- Gunakan prisma instance dari `app/lib/prisma.ts`
- Jangan buat instance baru setiap kali

### "Email sudah terdaftar"
- Email harus unik
- Check database untuk email duplikat

### Password validation gagal
- Minimal 8 karakter
- Harus ada huruf besar, kecil, angka

## 📚 Type Definitions

```typescript
// app/types/auth.ts
export interface SignUpFormData {
  email: string;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  id: string;
  email: string;
  name: string;
  username: string;
  createdAt: Date;
}
```

## 🎯 Next Steps

- [ ] Implementasi Login API (`POST /api/auth/login`)
- [ ] JWT token generation & verification
- [ ] Email verification sebelum activate account
- [ ] Password reset functionality
- [ ] Social login (Google, Facebook, etc.)
- [ ] Rate limiting untuk signup/login
- [ ] Session management
