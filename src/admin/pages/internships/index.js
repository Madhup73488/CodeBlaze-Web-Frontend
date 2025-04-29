import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Spinner from "../../components/common/Spinner";

// Lazy load components for better performance
const InternshipList = lazy(() => import("./InternshipList"));
const InternshipCreate = lazy(() => import("./InternshipCreate"));
const InternshipEdit = lazy(() => import("./InternshipEdit"));
const InternshipDetail = lazy(() => import("./InternshipDetail"));

const InternshipsRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route index element={<InternshipList />} />
        <Route path="create" element={<InternshipCreate />} />
        <Route path=":id/edit" element={<InternshipEdit />} />
        <Route path=":id" element={<InternshipDetail />} />
      </Routes>
    </Suspense>
  );
};

export default InternshipsRoutes;
