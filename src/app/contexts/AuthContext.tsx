import { createContext, useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { localStorageKeys } from "../config/localStorageKeys";
import { userService } from "../services/userService";
import { LaunchScreen } from "../../view/components/LaunchScreen";

interface AuthContextValue {
  signedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess, refetch } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => userService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, [signedIn]);

  const signOut = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    refetch();
    setSignedIn(false);
  }, [refetch]);

  useEffect(() => {
    if (isError) {
      toast.error('Sessão expirada, faça login novamente');
      signOut();
    }
  }, [isError, signOut])

  return (
    <AuthContext.Provider
    value={{
      signedIn: isSuccess && signedIn,
      signIn,
      signOut
    }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  )
}
