"use client";

import {
  HydrationBoundary as RQHydrate,
  HydrationBoundaryProps,
} from "@tanstack/react-query";

const Hydrate = (props: HydrationBoundaryProps) => {
  return <RQHydrate {...props} />;
};

export default Hydrate;
