"use client";

import { createContext, useContext, useState } from "react";

// Create Context
const SearchContext = createContext();

// Provide Context
export function SearchProvider({ children }) {
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
}

// Custom Hook for Convenience
export function useSearch() {
    return useContext(SearchContext);
}
