import Link from "next/link";

const AutocompleteResults = ({ results }) => {
  return (
    <>
      {results.length > 0 && (
        <ul className="mt-2 border rounded shadow-lg absolute  bg-white z-100000">
          {results.map((result) => (
            <li
              key={result.post_slug}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {/* Customize the rendering as needed */}
              <Link href={`/posts/${result._id}`}>
                <div className="custom-result">
                  <h3>{result.post_name}</h3>
                  <b>Category: {result.category_slug}</b>
                  <p>Poet: {result.poet_name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default AutocompleteResults;
