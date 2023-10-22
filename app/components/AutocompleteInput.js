import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisV,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const AutocompleteInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const inputRef = useRef(null); // Create a ref for the input element

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // onSearch(newQuery);
  };
  const handleAutocompleteSearch = () => {
    const inputValue = inputRef.current.value; // Access the input value using the ref

    onSearch(inputValue);
    // Trigger the autocomplete search using the query in the searchQuery state.
  };
  const clearInputs = () => {
    setQuery(""); // Clear the input field
    onSearch(""); // Trigger the autocomplete search with an empty string

    // Trigger the autocomplete search using the query in the searchQuery state.
  };

  return (
    <div className="relative">
      <div className="flex items-center border rounded">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search ..."
          value={query}
          onChange={handleInputChange}
          className="w-full p-3 rounded"
        />
        <button
          onClick={handleAutocompleteSearch}
          className="clear-button bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-700 p-2  mr-2 rounded"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>

        {query && (
          <button
            onClick={clearInputs}
            className="clear-button bg-gray-300 hover:bg-gray-400 text-gray-600 hover:text-gray-700 p-2 rounded"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AutocompleteInput;
