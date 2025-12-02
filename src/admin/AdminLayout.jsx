import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminTopbar from "./components/AdminTopbar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1">
        
        {/* Topbar */}
        <AdminTopbar />

        {/* Active Page */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
