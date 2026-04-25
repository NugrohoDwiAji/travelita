# Zod Validation Reference - Travelita

Panduan penggunaan Zod untuk validasi form di Travelita Auth System.

## 📦 Installation

```bash
npm install zod
```

✅ Sudah terinstall dan dikonfigurasi!

## 🔍 Schemas yang Tersedia

### Email Schema
```typescript
import { emailSchema } from "@/app/utils/auth-validation";

// Validasi email
const result = emailSchema.safeParse("user@example.com");
if (result.success) {
  console.log(result.data); // "user@example.com"
} else {
  console.log(result.error.issues); // Error details
}
```

### Username Schema
```typescript
import { usernameSchema } from "@/app/utils/auth-validation";

// Rules:
// - Min 3 karakter
// - Max 20 karakter
// - Hanya alphanumeric + underscore
const result = usernameSchema.safeParse("john_doe");
```

### Password Schema
```typescript
import { passwordSchema } from "@/app/utils/auth-validation";

// Rules:
// - Min 8 karakter
// - Min 1 uppercase letter
// - Min 1 lowercase letter
// - Min 1 digit
const result = passwordSchema.safeParse("SecurePass123");
```

### Name Schema
```typescript
import { nameSchema } from "@/app/utils/auth-validation";

// Rules:
// - Min 2 karakter
// - Max 50 karakter
const result = nameSchema.safeParse("John Doe");
```

### SignUp Schema
```typescript
import { signUpSchema, type SignUpFormData } from "@/app/utils/auth-validation";

const formData = {
  email: "user@example.com",
  name: "John Doe",
  username: "john_doe",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
};

const result = signUpSchema.safeParse(formData);

if (result.success) {
  // formData valid
  const validData: SignUpFormData = result.data;
} else {
  // formData invalid
  result.error.issues.forEach(issue => {
    console.log(`${issue.path}: ${issue.message}`);
  });
}
```

### Login Schema
```typescript
import { loginSchema, type LoginFormData } from "@/app/utils/auth-validation";

const loginData = {
  email: "user@example.com",
  password: "SecurePass123",
};

const result = loginSchema.safeParse(loginData);
```

## 🎣 Helper Functions

### validateSignUpData
```typescript
import { validateSignUpData } from "@/app/utils/auth-validation";

const result = validateSignUpData({
  email: "user@example.com",
  name: "John Doe",
  username: "john_doe",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
});

if (!result.success) {
  const firstError = result.error.issues[0];
  console.error(firstError?.message);
  // Output: "Password harus mengandung minimal 1 huruf besar"
}
```

### validateLoginData
```typescript
import { validateLoginData } from "@/app/utils/auth-validation";

const result = validateLoginData({
  email: "user@example.com",
  password: "password123",
});

if (!result.success) {
  result.error.issues.forEach(issue => {
    console.error(issue.message);
  });
}
```

## 🔑 Type Inference

Zod schemas auto-generate TypeScript types:

```typescript
import type { SignUpFormData, LoginFormData } from "@/app/utils/auth-validation";

// Equivalent to:
// type SignUpFormData = {
//   email: string;
//   name: string;
//   username: string;
//   password: string;
//   confirmPassword: string;
// }

// type LoginFormData = {
//   email: string;
//   password: string;
// }

function handleSignUp(data: SignUpFormData) {
  // TypeScript knows all fields are strings
}
```

## 📋 Error Handling

Zod returns detailed error info:

```typescript
const result = validateSignUpData({
  email: "invalid",
  name: "A",
  username: "ab",
  password: "short",
  confirmPassword: "short",
});

if (!result.success) {
  result.error.issues.forEach(issue => {
    console.log({
      path: issue.path,        // ['email']
      message: issue.message,  // "Invalid email"
      code: issue.code,        // "invalid_string"
    });
  });
}

// Output:
// [
//   { path: ['email'], message: 'Invalid email', code: 'invalid_string' },
//   { path: ['name'], message: 'Nama minimal 2 karakter', code: 'too_small' },
//   { path: ['username'], message: 'Username minimal 3 karakter', code: 'too_small' },
//   ...
// ]
```

## 🎯 Validasi Custom

Untuk menambah validasi custom:

```typescript
import { z } from "zod";

const customSchema = z.object({
  email: z.string().email("Email tidak valid"),
  age: z.number().min(18, "Minimal 18 tahun"),
}).refine(
  (data) => data.email.includes("@company.com"),
  {
    message: "Harus menggunakan email company",
    path: ["email"],
  }
);

const result = customSchema.safeParse({
  email: "user@gmail.com",
  age: 25,
});
// Error: "Harus menggunakan email company"
```

## 🚀 Client-Side Validation

Di form component:

```typescript
"use client";

import { validateSignUpData } from "@/app/utils/auth-validation";

export function SignUpForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = validateSignUpData({
      email: formData.email,
      name: formData.name,
      username: formData.username,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (!result.success) {
      // Set errors untuk ditampilkan di UI
      result.error.issues.forEach(issue => {
        const path = issue.path[0] as string;
        setErrors(prev => ({
          ...prev,
          [path]: issue.message,
        }));
      });
      return;
    }

    // Proceed dengan submit
    submitForm(result.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      {errors.email && <span>{errors.email}</span>}
      {/* ... */}
    </form>
  );
}
```

## 🔄 Server-Side Validation

Di API route:

```typescript
import { validateSignUpData } from "@/app/utils/auth-validation";
import { errorResponse, successResponse } from "@/app/lib/api-response";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = validateSignUpData(body);

  if (!validation.success) {
    const firstError = validation.error.issues[0];
    return errorResponse(
      firstError?.message || "Validasi gagal",
      400,
      validation.error.issues
    );
  }

  const validatedData = validation.data;
  // Process valid data...
}
```

## 🎨 Integrasi dengan useSignUp Hook

Hook sudah terintegrasi dengan Zod:

```typescript
import { useSignUp } from "@/app/hooks/useSignUp";

export function MyComponent() {
  const { isLoading, error, success, signUp } = useSignUp();

  const handleSubmit = async (formData) => {
    // Hook akan auto-validate dengan Zod sebelum submit
    await signUp(formData);
  };

  if (error) {
    return <p>{error}</p>; // Error dari Zod atau server
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}
```

## 📚 Referensi Lengkap

- [Zod Documentation](https://zod.dev)
- [Zod Validators Cheatsheet](https://zod.dev/?id=basic-types)

## ✅ Checklist

- ✅ Zod sudah diinstall (v3+)
- ✅ Schemas sudah defined di `auth-validation.ts`
- ✅ Types auto-generated dari schemas
- ✅ API route using Zod validation
- ✅ Hooks using Zod validation
- ✅ Error handling configured
- ✅ Type-safe across frontend & backend
