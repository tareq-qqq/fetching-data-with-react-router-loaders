import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export function useInvalidateOnNavigation(queryKey) {
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const key = state?.key;

  useEffect(() => {
    if (!queryClient.isFetching({ queryKey })) {
      queryClient.invalidateQueries({ queryKey });
    }
  }, [queryKey, key, queryClient]);
}
