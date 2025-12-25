import { useContext } from "react";
import { DashboardContext } from "./index";

export function useDashboard() {
  return useContext(DashboardContext);
}