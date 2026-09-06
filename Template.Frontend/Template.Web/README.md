# Clean Architecture Frontend Template (`Template.Web`)

A enterprise-ready, modular React + TypeScript frontend template built on **Clean Architecture** principles and the **Component Triplet Pattern** (`.tsx` view, `use[Name].ts` hook logic, and `.css` styling).

Designed to seamlessly pair with `Template.Backend` (.NET Core / ASP.NET Core Clean Architecture API) or any REST backend.

---

## 🏛️ Clean Architecture Layering

```
src/
├── domain/                  # DOMAIN LAYER (Pure TS, Zero UI Framework dependencies)
│   ├── dtos/                # BaseAPIResponse<T>, Pagination, AuthDTOs, StudentDTOs
│   ├── entities/            # User, Student entities
│   └── index.ts             # Domain Barrel
│
├── infrastructure/          # INFRASTRUCTURE LAYER (External Services & Adapters)
│   ├── http/                # Fetch/Axios client wrapper with Bearer token interceptors
│   ├── storage/             # TokenStorage localStorage persistence adapter
│   ├── api/                 # Endpoint services (authApi, studentApi)
│   ├── mocks/               # Standalone mock server adapters (VITE_USE_MOCK_DATA)
│   └── index.ts             # Infrastructure Barrel
│
├── application/             # APPLICATION LAYER (State, Contexts & Use Cases)
│   ├── context/             # AuthContext, ThemeContext, ToastContext
│   └── index.ts             # Application Barrel
│
├── presentation/            # PRESENTATION LAYER (UI Components, Layouts, Pages & Styles)
│   ├── styles/              # Design tokens, CSS variables & Glassmorphism themes
│   ├── components/          # Shared Component Triplets (Button, Input, Modal, Toast, Navbar, Sidebar)
│   ├── layouts/             # Layout Triplets (MainLayout, AuthLayout)
│   └── pages/               # Feature Page Triplets (DashboardPage, LoginPage, RegisterPage, StudentsPage)
│
├── App.tsx                  # App Root View
├── useApp.ts                # App Root Logic (ViewModel)
└── main.tsx                 # Application Entrypoint
```

---

## 🧩 Component Triplet Pattern (`.tsx`, `.ts`, `.css`)

Every component, layout, and page strictly isolates concerns across 3 dedicated files:

1. **`ComponentName.tsx`**: Pure presentation markup and JSX layout.
2. **`useComponentName.ts`**: TypeScript custom hook containing state, handlers, side effects, and API calls.
3. **`ComponentName.css`**: Component styles utilizing design system CSS variables (`variables.css`).
4. **`index.ts`**: Clean export barrel.

---

## 🚀 How to Fork / Inject into a New Project

1. **Copy/Fork Directory**:
   Copy the `Template.Web` directory to your new project repository.

2. **Configure Environment (`.env`)**:
   ```env
   # Connect to your backend API URL
   VITE_API_BASE_URL=http://localhost:5000/api/v1

   # Set to 'false' to connect to live API, or 'true' for offline mock preview
   VITE_USE_MOCK_DATA=false
   ```

3. **Path Aliases Configured**:
   Imports remain clean across all layers:
   ```ts
   import type { BaseAPIResponse } from '@domain/index';
   import { httpClient } from '@infrastructure/http/httpClient';
   import { useAuth } from '@application/context/AuthContext';
   import { Button } from '@presentation/components/Button';
   ```

4. **Install Dependencies & Run**:
   ```bash
   npm install
   npm run dev
   ```

---

## 🔌 Integration with `Template.Backend`

This frontend template directly mirrors the endpoint contracts of `Template.Backend`:

| Backend Controller | Frontend API Service | Matching Endpoints |
| :--- | :--- | :--- |
| `AuthController.cs` | `src/infrastructure/api/authApi.ts` | `/auth/login`, `/auth/register`, `/auth/send-otp`, `/auth/verify-otp`, `/auth/forgot-password`, `/auth/me` |
| `StudentController.cs` | `src/infrastructure/api/studentApi.ts` | `GET /students`, `POST /students` |

---

## 🛠️ Build & Verification

```bash
# Type check and build production bundle
npm run build

# Preview build locally
npm run preview
```
