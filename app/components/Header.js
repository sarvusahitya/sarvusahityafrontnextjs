"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import AutocompleteInput from "../components/AutocompleteInput";
import AutocompleteResults from "../components/AutocompleteResults";
import { NextSeo } from "next-seo";
const axios = require("axios");

import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [results, setResults] = useState([]);

  const searchForAutocomplete = async (query) => {
    try {
      if (query.length < 1) {
        setResults([]);
        return null;
      }
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
          setResults(response.data.data);
        })
        .catch((error) => {
          console.log(error);
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
            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
          </Link>
        </div>

        <div className="autocomplete-container relative z-9">
          <AutocompleteInput onSearch={searchForAutocomplete} />

          <AutocompleteResults results={results} />
        </div>
      </div>
    </header>
  );
};

export default Header;
