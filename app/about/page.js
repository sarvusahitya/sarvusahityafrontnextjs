"use client";
import AutocompleteInput from "../components/AutocompleteInput";
import AutocompleteResults from "../components/AutocompleteResults";
import { useEffect, useState } from "react";

const AutoCompleteComponent = () => {
  const [results, setResults] = useState([]);

  const searchForAutocomplete = async (query) => {
    try {
      console.log(query.length);
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

  return (
    <div>
      <AutocompleteInput onSearch={searchForAutocomplete} />
      <AutocompleteResults results={results} />
    </div>
  );
};

export default AutoCompleteComponent;
