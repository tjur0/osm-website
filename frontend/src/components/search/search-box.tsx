"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";

const debounceTime = 500;

export function SearchBox() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string) => {
    fetch(`https://photon.komoot.io/api/?q=${query}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
      });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.length > 2) {
        handleSearch(searchQuery);
      }
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, debounceTime]);

  return (
    <div>
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Zoeken"
      />
    </div>
  );
}
