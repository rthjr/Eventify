import "@styles/globals.css";
import { AuthProvider } from "@provider/provider";
import { SearchProvider } from "./(form)/context/SearchContext";
import { FavoriteProvider } from "./(form)/context/FavoriteContext";

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
                        <SearchProvider>
                            <FavoriteProvider> {/* Add FavoriteProvider here */}
                                {children}
                            </FavoriteProvider>
                        </SearchProvider>
                    </AuthProvider>
                </main>
            </body>
        </html>
    );
}