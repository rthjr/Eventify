"use client";
import "@styles/globals.css";
import { AuthProvider } from "@provider/provider";
import SideBar from "@components/layout/SideBar";
import { SessionProvider, useSession } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dashboardBG ">
        <main>
          <SessionProvider>
            <AuthProvider>
              <ProtectedLayout>{children}</ProtectedLayout>
            </AuthProvider>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}

function ProtectedLayout({ children }) {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <div>please make sure to sign in first </div>;
  }
  if (!session) {
    return <div>please make sure to sign in first </div>;
  }
  console.log(session.user.role);
  return session?.user.role === "admin" ? (
    <div className="flex">
      <div className="lg:w-2/12">
        <SideBar />
      </div>
      <div className=" w-full md:w-10/12">{children}</div>
    </div>
  ) : (
    <div>you do not have permission to access this page</div>
  );
}
