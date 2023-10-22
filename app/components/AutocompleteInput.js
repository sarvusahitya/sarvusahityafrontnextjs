import { useState } from "react";

const AutocompleteInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const newQuery = e.target.value;

    setQuery(newQuery);
    onSearch(newQuery);
  };
  const handleClearClick = () => {
    setQuery("");
    onSearch(""); // Clear the search results when clearing the input.
  };

  return (
    <div className="autocomplete-input">
      <input
        type="text"
        placeholder="Search ..."
        value={query}
        onChange={handleInputChange}
        className="w-full p-3 border rounded"
      />
      {query && (
        <button onClick={handleClearClick} className="clear-button">
          Clear
        </button>
      )}
    </div>
  );
};

export default AutocompleteInput;
