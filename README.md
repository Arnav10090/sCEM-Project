<div align="center">

# 🏭 sCEM - Steel Coil Equipment Management System

<img src="./public/Hitachi-Logo.png" alt="Hitachi Logo" width="200"/>

### 🚀 Next-Generation Industrial Equipment Monitoring & Management Platform

[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2.7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Bun](https://img.shields.io/badge/Bun-1.3.4-000000?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📋 Overview

**sCEM** (Steel Coil Equipment Management) is a comprehensive, real-time industrial monitoring and management system designed for steel manufacturing facilities. Built with modern web technologies, it provides operators with powerful tools to monitor equipment status, track KPIs, manage alarms, and configure critical parameters—all through an intuitive, responsive interface.

### 🎯 Key Highlights

- 📊 **Real-time Dashboard** - Live KPI tracking and equipment status visualization
- ⚙️ **Equipment Management** - Comprehensive verification and configuration tools
- 🔔 **Smart Alarm System** - Real-time alerts with intelligent overflow handling
- 📈 **Parameter Monitoring** - Advanced trends analysis and live data feeds
- 🏗️ **System Architecture** - Visual system topology and documentation
- 📑 **Planning & Reports** - Comprehensive reporting and analytics

---

## ✨ Features

### 🖥️ Main Dashboard
- **Live KPI Cards** - Real-time metrics for production monitoring
- **Equipment Status** - Visual representation of equipment states
- **Interactive Charts** - Dynamic data visualization using Recharts
- **Quick Navigation** - Seamless access to all system modules

### 🔍 Equipment Verification
- **Real-time Validation** - Continuous equipment health checks
- **Status Tracking** - Comprehensive equipment state monitoring
- **Historical Data** - Access to equipment performance history

### 📊 Parameter Monitoring
- **Live Trends** - Real-time parameter visualization
- **Video Feed Integration** - Live video monitoring of steel coil movement
- **Data Analytics** - Advanced parameter analysis and reporting

### ⚙️ Equipment Configuration
- **Parameter Management** - Configure critical equipment settings
- **Profile Management** - Save and load equipment configurations
- **Access Control** - Role-based configuration permissions

### 🚨 Alarm Management
- **Real-time Alerts** - Instant notification of critical events
- **Smart Overflow** - Intelligent alarm stacking (max 10 in footer)
- **Global Popup** - Periodic alarm notifications across all pages
- **Alarm Table** - Comprehensive alarm history and filtering

### 📈 Planning & Reports
- **Analytics Dashboard** - Comprehensive production analytics
- **Custom Reports** - Configurable report generation
- **Data Export** - Export capabilities for further analysis

### 🏗️ System Architecture
- **Visual Topology** - Interactive system architecture diagrams
- **Documentation** - Comprehensive system documentation
- **Component Overview** - Detailed component specifications

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Bun](https://bun.sh/)** v1.3.4 or higher - A fast all-in-one JavaScript runtime
  ```bash
  # Install Bun (Windows)
  powershell -c "irm bun.sh/install.ps1|iex"
  
  # Verify installation
  bun --version
  ```

### Quick Start

```bash
# 1️⃣ Clone the repository
git clone <YOUR_GIT_URL>

# 2️⃣ Navigate to project directory
cd sCEM-Project

# 3️⃣ Install dependencies (using Bun for faster installation)
bun install

# 4️⃣ Start development server
bun run dev

# 🎉 Open your browser at http://localhost:5173
```

### Alternative Installation Methods

<details>
<summary><b>Using npm</b></summary>

```bash
npm install
npm run dev
```
</details>

<details>
<summary><b>Using pnpm</b></summary>

```bash
pnpm install
pnpm dev
```
</details>

<details>
<summary><b>Using GitHub Codespaces</b></summary>

1. Navigate to the repository on GitHub
2. Click the **Code** button (green)
3. Select the **Codespaces** tab
4. Click **New codespace**
5. Wait for the environment to initialize
6. Run `bun install && bun run dev`
</details>

---

## 💻 Usage

### Development Commands

```bash
# Start development server with hot-reload
bun run dev

# Build for production
bun run build

# Build for development (with source maps)
bun run build:dev

# Preview production build
bun run preview

# Run linter
bun run lint
```

### Project Structure

```
sCEM-Project/
├── public/              # Static assets (images, icons, etc.)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components (Header, Footer, Navigation)
│   │   ├── pages/       # Page-specific components
│   │   └── ui/          # shadcn/ui components
│   ├── context/         # React Context providers
│   │   ├── AlarmContext.tsx       # Alarm state management
│   │   └── EquipmentContext.tsx   # Equipment state management
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and helpers
│   ├── pages/           # Main page components
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── index.html
├── package.json
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

### Key Modules

<details>
<summary><b>🎯 Context Providers</b></summary>

- **`EquipmentContext`** - Manages equipment state and configurations
- **`AlarmContext`** - Handles alarm generation, display, and overflow logic
</details>

<details>
<summary><b>🎨 UI Components</b></summary>

Built with **shadcn/ui** - a collection of beautifully designed, accessible components:
- Accordion, Alert Dialog, Avatar, Checkbox
- Dialog, Dropdown Menu, Popover, Tabs
- Toast notifications, Tooltips, and more
</details>

<details>
<summary><b>📊 Data Visualization</b></summary>

- **Recharts** - Advanced charting library for real-time data
- **Custom Charts** - Tailored visualizations for industrial data
</details>

---

## 🛠️ Tech Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.3 | UI framework for building interactive interfaces |
| **TypeScript** | 5.8.3 | Type-safe JavaScript for robust code |
| **Vite** | 7.2.7 | Lightning-fast build tool and dev server |
| **Bun** | 1.3.4 | Fast JavaScript runtime and package manager |

### UI & Styling

| Technology | Description |
|------------|-------------|
| **Tailwind CSS** | Utility-first CSS framework for rapid UI development |
| **shadcn/ui** | High-quality, accessible component library |
| **Radix UI** | Unstyled, accessible UI primitives |
| **Lucide React** | Beautiful & consistent icon library |

### State Management & Data

| Technology | Purpose |
|------------|---------|
| **React Context** | Global state management for equipment and alarms |
| **TanStack Query** | Powerful data synchronization and caching |
| **React Hook Form** | Performant form handling with validation |
| **Zod** | TypeScript-first schema validation |

### Additional Libraries

- **React Router DOM** - Client-side routing
- **Recharts** - Composable charting library
- **date-fns** - Modern date utility library
- **Embla Carousel** - Lightweight carousel library
- **Sonner** - Beautiful toast notifications

---

## 📖 Documentation

### Configuration

<details>
<summary><b>Environment Setup</b></summary>

Create a `.env` file in the root directory for environment-specific configurations:

```env
# Add your environment variables here
# VITE_API_URL=your_api_url
```
</details>

<details>
<summary><b>Customization</b></summary>

- **Theme**: Modify `tailwind.config.ts` for custom colors and design tokens
- **Components**: Customize shadcn/ui components in `src/components/ui/`
- **Routes**: Add new routes in `src/App.tsx`
</details>

### Development Guidelines

- **Code Style**: Follow TypeScript best practices
- **Components**: Use functional components with hooks
- **State Management**: Leverage React Context for global state
- **Styling**: Use Tailwind CSS utility classes
- **Type Safety**: Ensure all components are properly typed

---

## 🚢 Deployment

### Build for Production

```bash
# Create optimized production build
bun run build

# Preview production build locally
bun run preview
```

### Deploy with Lovable

1. Open your [Lovable project dashboard](https://lovable.dev/)
2. Navigate to **Share → Publish**
3. Follow the deployment wizard

### Custom Domain

To connect a custom domain:
1. Go to **Project → Settings → Domains**
2. Click **Connect Domain**
3. Follow the [custom domain setup guide](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is part of the HICAD Projects portfolio.

---

## 🙏 Acknowledgments

- **Hitachi** - For the industrial equipment and domain expertise
- **shadcn/ui** - For the beautiful component library
- **Lovable** - For the development platform
- **Open Source Community** - For the amazing tools and libraries

---

<div align="center">

### 🌟 Built with modern web technologies for industrial excellence

**Made with ❤️ for Industrial Automation**

</div>
