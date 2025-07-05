**AI Persona:** You are an expert full-stack developer with deep expertise in Next.js 14 (App Router), TypeScript, Tailwind CSS, and Supabase. Your specialty is creating modern, clean, and highly functional B2B web applications with a minimalist aesthetic.

**Core Objective:** Generate the code for a wholesale (B2B) webshop for car care products. The key functionality is not direct purchase, but rather a "Request a Quote" system. The design should be modern, clean, and inspired by Apple's design language, heavily utilizing glassmorphism effects for key UI elements.

**Technology Stack:**
- **Framework:** Next.js 14 (using the App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Backend as a Service (BaaS):** Supabase for database and authentication.
- **UI Components:** Use Shadcn/UI for pre-built, accessible components (Buttons, Modals, Forms, Tables) to accelerate development and maintain a clean look.

**Project Structure & File Organization:**
- `/app`: Main routing directory.
  - `/(main)`: Group for public-facing routes.
    - `/page.tsx`: Homepage.
    - `/proizvodi/page.tsx`: Product listing page.
    - `/proizvodi/[slug]/page.tsx`: Product detail page.
  - `/(auth)`: Group for authentication routes.
    - `/login/page.tsx`
    - `/register/page.tsx`
  - `/admin`: Group for protected admin routes.
    - `/dashboard/page.tsx`: Main admin dashboard to view inquiries.
- `/components`: Reusable React components.
  - `/ui`: Components from Shadcn/UI.
  - `/shared`: General components like Navbar, Footer.
  - `/products`: Components like ProductCard, ProductGrid.
  - `/admin`: Components for the admin dashboard, like InquiriesTable.
- `/lib`: Helper functions and configurations.
  - `/supabase.ts`: Supabase client configuration.
  - `/types.ts`: TypeScript type definitions.
- `/public`: Static assets.
  - `/images/products/`: Directory for all product images.

**Supabase Database Schema (Provide SQL):**
1.  **`categories` table:**
    - `id`: UUID (primary key)
    - `name`: TEXT (e.g., "Poliranje", "Čišćenje enterijera")
    - `slug`: TEXT (unique, for URL)
2.  **`products` table:**
    - `id`: UUID (primary key)
    - `name`: TEXT (e.g., "SELF POWER", "TIGER")
    - `description`: TEXT
    - `product_code`: TEXT (e.g., "25/1-411025")
    - `image_url`: TEXT (path to the image in `/public/images/products/`, e.g., `/images/products/self-power.png`)
    - `category_id`: UUID (foreign key to `categories.id`)
    - `slug`: TEXT (unique, for URL)
3.  **`inquiries` (Upiti) table:**
    - `id`: UUID (primary key)
    - `created_at`: TIMESTAMPTZ
    - `product_id`: UUID (foreign key to `products.id`)
    - `user_id`: UUID (foreign key to `auth.users`, nullable if submitted by a non-logged-in user)
    - `customer_name`: TEXT
    - `customer_email`: TEXT
    - `customer_company`: TEXT (optional)
    - `message`: TEXT
    - `status`: TEXT (enum-like: 'new', 'contacted', 'closed'), default 'new'.

**Feature Implementation Details:**

1.  **Design & Layout:**
    - **Overall Theme:** Minimalist, lots of white space. Use a dark mode variant.
    - **Typography:** Use `next/font/google` to import the "Inter" font.
    - **Glassmorphism:** Apply this effect to the main Navbar and any Modals. The Tailwind CSS for this should be something like `bg-white/30 backdrop-blur-lg border border-gray-200/50`.
    - **Layout:** Create a root layout (`/app/layout.tsx`) with a shared Navbar and Footer.

2.  **Product Pages:**
    - **Product Listing (`/proizvodi`):**
      - Fetch all products from Supabase.
      - Display them in a responsive grid using CSS Grid.
      - Implement a sidebar with category filters. Clicking a category should filter the products shown.
    - **Product Detail (`/proizvodi/[slug]`):**
      - Fetch a single product based on the `slug` from the URL.
      - Show a large product image, name, description, and product code.
      - A prominent "Zatraži Ponudu" (Request a Quote) button.

3.  **Quote Request Flow:**
    - Clicking "Zatraži Ponudu" opens a Modal (`Shadcn/UI Dialog`).
    - The form in the modal should contain fields: Name, Email, Company Name, Message.
    - If the user is logged in, pre-fill their name and email.
    - On form submission, a new record is created in the `inquiries` table in Supabase. Use a Next.js Server Action for this.

4.  **Authentication (Supabase Auth):**
    - Implement simple login and register pages.
    - Use Supabase's email/password provider.
    - The Navbar should show "Login/Register" for guests and "Admin Panel / Logout" for logged-in admins.

5.  **Admin Dashboard (`/admin/dashboard`):**
    - **Protected Route:** This route must only be accessible to logged-in users (or users with a specific 'admin' role, if you implement that). Use Next.js Middleware (`middleware.ts`) to protect this route.
    - **Inquiries Table:** Display all records from the `inquiries` table using `Shadcn/UI Table`.
    - **Columns:** Show Product Name, Customer Name, Customer Email, Status, and Date.
    - **Functionality:** Admins should be able to click on an inquiry to see the full message and change its status ('new', 'contacted', 'closed') via a dropdown, which updates the record in Supabase.

**Code Generation Instructions:**
- Please generate the code file by file, starting with the Supabase SQL schema.
- Follow with the Next.js project structure as outlined above.
- Use TypeScript for all types, props, and functions.
- Add comments explaining the logic for Supabase queries, server actions, and route protection in the middleware.
- For product data, assume I will manually populate the `/public/images/products/` directory and the Supabase tables.