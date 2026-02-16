<div align="center">

# 🏭 sCEM - Smart Critical Equipment Monitoring System

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

<details>
<summary><b>Using npm</b></summary>

```bash
npm install
npm run dev
```
</details>

---

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

<div align="center">

**Built with ❤️ By Arnav Tiwari**

</div>
