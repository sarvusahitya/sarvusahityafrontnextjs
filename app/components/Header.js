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
      console.log("process.env.NEXT_PUBLIC_API_BASE_URL11111");
      console.log(process.env.NEXT_PUBLIC_API_BASE_URL);
      if (query.length > 5) {
        const axios = require("axios");
        let data = JSON.stringify({
          page: 1,
          size: 10,
          search: query,
        });

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/search/autocomplete`,
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjgwNTc5MzM2LCJleHAiOjE2ODMxNzEzMzZ9.N3FtKTmIpbgve4-PzBEcZIDpW7AeupHTjvm4mNnYYbk",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(response.data.data);
            setResults(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      console.log(query.length);
      // if (query.length > 3) {
      //   const apiUrl =
      //     "https://sarvusahitya.cyclic.cloud/post/search/autocomplete";
      //   // const apiUrl = "http://localhost:8086/post/search/autocomplete";

      //   // Define the request body
      //   const reqBody = {
      //     page: 1,
      //     size: 10,
      //     search: query,
      //   };

      //   // Make a POST request to the API
      //   fetch(apiUrl, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(reqBody),
      //   })
      //     .then((response) => response.json())
      //     .then((data) => {
      //       if (data.success) {
      //         setResults(data.data);
      //       } else {
      //         console.error("Failed to fetch sliders");
      //       }
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching sliders:", error);
      //     });
      // }
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
