import { useState } from "react";

const AutocompleteInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const newQuery = e.target.value;

    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <input
      type="text"
      placeholder="Search for devlop"
      value={query}
      onChange={handleInputChange}
      className="w-full p-3 border rounded"
    />
  );
};

export default AutocompleteInput;
