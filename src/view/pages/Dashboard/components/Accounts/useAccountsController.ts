import { useMemo, useState } from "react";

import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";

export function useAccountsController() {
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const windowWidth = useWindowWidth();
  const {
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal,
  } = useDashboard();

  const { accounts, isFetching } = useBankAccounts();
  const { categories, isFetching: isFetchingCategories } = useCategories();

  const currentBalance = useMemo(() => {
    if (!accounts) return 0;

    return accounts.reduce((total, account) => total + account.currentBalance, 0);
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts: accounts ?? [],
    categories: categories ?? [],
    isLoadingCategories: isFetchingCategories,
    openNewAccountModal,
    currentBalance,
  };
}