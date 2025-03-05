<div align="center">
  <!-- <img src="aesthetics/wild-oasis-og.png" alt="The Wild Oasis" width="800px" /> -->
  <h1>✨ The Wild Oasis ✨</h1>
  <p><em>A sophisticated hotel management solution</em></p>
</div>

<p align="center">
  <a href="#key-features">Features</a> •
  <a href="#technologies-used">Technologies</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#data-management">Data</a> •
  <a href="#authentication-and-security">Security</a> •
  <a href="#user-interface">UI</a>
</p>

---

**The Wild Oasis** is a comprehensive hotel management application built with modern web technologies. This elegant solution empowers hotel staff to efficiently manage bookings, cabins, guests, and daily operations through an intuitive and responsive interface.

## ✨ Key Features

- **🔐 Authentication System** — Secure login and user management with role-based access control
- **📊 Dashboard** — Visual overview of key metrics including occupancy rates, bookings, sales, and check-ins/check-outs
- **📅 Booking Management** — Complete system to view, create, update, and delete bookings with filtering and sorting options
- **🔑 Check-in/Check-out System** — Streamlined process for guest arrivals and departures
- **🏡 Cabin Management** — Tools to manage cabin inventory, pricing, and availability
- **👥 User Management** — Admin controls for managing staff accounts and permissions
- **⚙️ Settings** — Customizable application settings to tailor the system to specific business needs
- **🌓 Dark Mode Support** — Toggle between light and dark themes for comfortable viewing in any environment
- **📱 Responsive Design** — Optimized for various screen sizes and devices

## 🛠️ Technologies Used

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" alt="React Query" />
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://img.shields.io/badge/Styled_Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" alt="Styled Components" />
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
      </td>
      <td align="center">
        <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
      </td>
    </tr>
  </table>
</div>

Additional technologies:

- **React Hook Form** — For form validation and handling
- **React Hot Toast** — For user notifications
- **Date-fns** — For date manipulation and formatting

## 🏗️ Architecture

The application follows a modern React architecture with:

- **🧩 Feature-based organization** — Code is organized by feature rather than by type
- **🪝 Custom hooks** — For reusable logic and data fetching
- **🌐 Context API** — For global state management (dark mode)
- **🔒 Protected routes** — To secure access to authenticated areas
- **📱 Responsive UI components** — Built with styled-components for consistent styling

## 💾 Data Management

- **🔄 React Query** — For server state management, caching, and synchronization
- **⚡ Optimistic updates** — For a responsive user experience
- **📄 Pagination** — For efficient data loading
- **🔍 Filtering and sorting** — For data exploration

## 🔐 Authentication and Security

- **🔑 Supabase Authentication** — Email/password authentication
- **🛡️ Protected routes** — Ensuring only authenticated users can access certain parts of the application
- **👤 User profiles** — With avatar upload capability
- **🔒 Password management** — Secure password update functionality

## 🎨 User Interface

- **🌓 Dark/Light mode** — Theme toggle with persistent user preference
- **🔔 Toast notifications** — For user feedback
- **💬 Modal dialogs** — For confirmations and forms
- **📊 Responsive tables** — For data display with sorting and filtering
- **✅ Form validation** — With helpful error messages

---

<div align="center">
  <p><strong>Credits</strong></p>
  <p>This project was developed as part of Jonas Schmedtmann's React course, with additional features and customizations added to enhance functionality and user experience.</p>
</div>
