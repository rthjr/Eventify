
import "@styles/globals.css";
import { AuthProvider } from "@provider/provider";
import SideBar from "@components/layout/SideBar";

export const metadata = {
    title: "Eventify",
    description: "Create & Explore at the same time.",
};



export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-dashboardBG ">
                <main><AuthProvider> 
                    {children}
                    <SideBar />
                     </AuthProvider> </main>
            </body>
        </html>
    );
}