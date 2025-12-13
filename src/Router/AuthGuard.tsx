import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const isAuthenticated = false

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />
  }

  return (
    <Outlet />
  )
}