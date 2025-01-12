"use client"
import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    // Initialize state for favorites
    const [pageFavorite, setPageFavorite] = useState({});

    // Load favorites from localStorage on initial render
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedFavorites = localStorage.getItem("pageFavorite");
            if (storedFavorites) {
                setPageFavorite(JSON.parse(storedFavorites));
            }
        }
    }, []);

    // Save favorites to localStorage whenever pageFavorite changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("pageFavorite", JSON.stringify(pageFavorite));
        }
    }, [pageFavorite]);

    // Add event to favorites
    const handleAddToFavorite = (eventId) => {
        setPageFavorite((prev) => ({
            ...prev,
            [eventId]: true,
        }));
    };

    // Remove event from favorites
    const handleDeleteFavorite = (eventId) => {
        setPageFavorite((prev) => {
            const updatedFavorites = { ...prev };
            delete updatedFavorites[eventId];
            return updatedFavorites;
        });
    };

    return (
        <FavoriteContext.Provider
            value={{
                pageFavorite,
                handleAddToFavorite,
                handleDeleteFavorite,
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => useContext(FavoriteContext);