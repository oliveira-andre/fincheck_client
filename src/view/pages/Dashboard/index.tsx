import { useAuth } from "../../../app/hooks/useAuth";

export function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div>
      <button onClick={signOut}>Sair</button>
    </div>
  )
}