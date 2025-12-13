import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div>
      <h1> auth layout</h1>

      <Outlet />
    </div>
  )
}