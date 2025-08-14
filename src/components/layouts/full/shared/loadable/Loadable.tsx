import React, { Suspense } from "react";

// Wraps a lazy-loaded component in Suspense
const Loadable = <T extends object>(Component: React.ComponentType<T>): React.FC<T> => {
  const Wrapped: React.FC<T> = (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
  return Wrapped;
};

export default Loadable;