import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// invalidate queries when navigating to the same route from the same route
// when not using loaders
export function useInvalidateOnNavigation(queryKey) {
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (
      location.state?.previousPathname === location.pathname &&
      !queryClient.isFetching({ queryKey })
    ) {
      console.log(`invalidating query: ${queryKey}`);
      queryClient.invalidateQueries({ queryKey });
    }
  }, [
    location.pathname,
    location.state?.previousPathname,
    queryClient,
    queryKey,
  ]);
}
