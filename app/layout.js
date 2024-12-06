
import "@styles/globals.css";
import { AuthProvider } from "@provider/provider";
export const metadata = {
    title: "Eventify",
    description: "Create & Explore at the same time.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-white">
                <main><AuthProvider> {children} </AuthProvider> </main>
            </body>
        </html>
    );
}