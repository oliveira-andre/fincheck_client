import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "./DropdownMenu";
import { useAuth } from "../../app/hooks/useAuth";
import { useTheme } from "../../app/hooks/useTheme";

export function UserMenu() {
  const { signOut, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-0 dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100 dark:border-gray-700 cursor-pointer">
          <span className="text-teal-900 dark:text-teal-300 font-medium tracking-[-0.5px] text-sm">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-40">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={toggleTheme}
        >
          {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signOut}
        >
          Sair
          <ExitIcon className="w-4 h-4" />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}