import "@styles/globals.css";
import { AuthProvider } from "@provider/provider";
import { SearchProvider } from "./(form)/context/SearchContext";

export const metadata = {
    title: "Eventify",
    description: "Create & Explore at the same time.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="bg-white">
            <body>
                <main>
                    <AuthProvider>
                        <SearchProvider>{children}</SearchProvider>
                    </AuthProvider>
                </main>
            </body>
        </html>
    );
}
