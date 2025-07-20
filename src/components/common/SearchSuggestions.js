import { Link } from "react-router-dom";

export default function SearchSuggestions({
  suggestions,
  searchTerm,
  onClose,
}) {
  if (!searchTerm || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-b-md shadow-lg z-10">
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>
            <Link
              to={`/courses/${suggestion.id}`}
              className="block p-2 hover:bg-gray-100"
              onClick={onClose}
            >
              {suggestion.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
