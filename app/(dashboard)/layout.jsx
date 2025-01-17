"use client";
import "@styles/globals.css";
import { AuthProvider } from "@provider/provider";
import SideBar from "@components/layout/SideBar";
import { SessionProvider, useSession } from "next-auth/react";
import LoadingPage from "@components/util/Loading";
import NotFound from "@components/util/NotFound";
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
  if (status === "loading") {
    return <div className='flex justify-center items-center min-h-screen'>
                <LoadingPage />
              </div>;
  }
  if (!session) {
    return <div className='flex justify-center items-center min-h-screen'>
    <NotFound />
  </div>;
  }
  return session?.user.role === "admin" ? (
    <div className="flex">
      <div className="lg:w-2/12">
        <SideBar />
      </div>
      <div className=" w-full md:w-10/12">{children}</div>
    </div>
  ) : (
    <NotFound/>
  );
}
