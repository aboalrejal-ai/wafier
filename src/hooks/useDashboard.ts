import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchDashboard, updateBudget } from "../services/data-service";
import { useAppStore } from "../stores/app-store";

export function useDashboard() {
  const { setDashboard, setLoading } = useAppStore();
  const query = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    refetchInterval: 60000,
  });

  useEffect(() => {
    setLoading(query.isLoading);
    if (query.data) setDashboard(query.data);
  }, [query.data, query.isLoading, setDashboard, setLoading]);

  return query;
}

export function useBudgetMutation() {
  const queryClient = useQueryClient();
  const { setDashboard } = useAppStore();

  return async (amount: number) => {
    const data = await updateBudget(amount);
    setDashboard(data);
    queryClient.invalidateQueries({ queryKey: ["dashboard"] });
  };
}
