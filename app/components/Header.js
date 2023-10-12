"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import AutocompleteInput from "../components/AutocompleteInput";
import AutocompleteResults from "../components/AutocompleteResults";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [results, setResults] = useState([]);

  const searchForAutocomplete = async (query) => {
    try {
      const apiUrl = "https://sarvusahitya.cyclic.cloud/searchforautocomplete";

      // Define the request body
      const reqBody = {
        page: 1,
        size: 10,
        search: query,
      };

      // Make a POST request to the API
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setResults(data.data);
          } else {
            console.error("Failed to fetch sliders");
          }
        })
        .catch((error) => {
          console.error("Error fetching sliders:", error);
        });
    } catch (error) {
      console.error("Error fetching autocomplete results", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <div>
          <Link href="/">
            <span>
              <img src="/images/logo.png" alt="Logo" width={100} height={100} />
            </span>
          </Link>
        </div>

        <div className="autocomplete-container relative">
          <AutocompleteInput onSearch={searchForAutocomplete} />
          <AutocompleteResults results={results} />
        </div>
      </div>
    </header>
  );
};

export default Header;
