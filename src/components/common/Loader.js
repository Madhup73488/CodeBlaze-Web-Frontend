// src/components/Loader.js
import { useLoader } from "../contexts/LoaderContext";

function Loader() {
  const { loading } = useLoader();

  return (
    <>
      {loading && (
        <div className="top-loader-container">
          <div className="top-loader" />
        </div>
      )}
      {loading && <div className="page-dim-overlay" />}
    </>
  );
}

export default Loader;
