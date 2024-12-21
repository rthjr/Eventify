'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SideBarIConText } from "./SideBarIcon";


export default function SideBar() {
  const [activePage, setActivePage] = useState("Dashboard");
  const router = useRouter();

  return (
    <div className="flex">
     
      <div className="fixed top-0 md:left-0 h-screen w-64 m-0 md:flex hidden md:flex-col bg-white text-black">
        <div className="mt-10 ml-10">
          <h1 className="mb-10">Hello Admin</h1>
          <div>
            <SideBarIConText
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="icon icon-tabler icons-tabler-filled icon-tabler-layout-dashboard"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 3a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2zm10 -4a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2zm0 -8a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-4a2 2 0 0 1 -2 -2v-2a2 2 0 0 1 2 -2z" />
                </svg>
              }
              text={"Dashboard"}
              onClick={() => {
                setActivePage("Dashboard");
                router.push("/dashboard");
              }}
              isActive={activePage === "Dashboard"}
            />
          </div>
          <div>
            <SideBarIConText
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-category-2"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M14 4h6v6h-6z" />
                  <path d="M4 14h6v6h-6z" />
                  <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                  <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </svg>
              }
              text={"Category"}
              onClick={() => {
                setActivePage("Category");
                router.push("/dashboard/category");
              }}
              isActive={activePage === "Category"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

