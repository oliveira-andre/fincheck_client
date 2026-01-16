import { createContext, useCallback, useState } from "react";
import type { BankAccount } from "../../../../../app/entities/BankAccount";
import type { Category } from "../../../../../app/entities/Category";

interface DashboardContextValue {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
  isEditAccountModalOpen: boolean;
  openEditAccountModal: (bankAccount: BankAccount) => void;
  closeEditAccountModal: () => void;
  newTransactionType: 'INCOME' | 'EXPENSE' | null;
  isNewTransactionModalOpen: boolean;
  accountBeingEdited: BankAccount | null;
  setAccountBeingEdited: (bankAccount: BankAccount) => void;
  openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
  closeNewTransactionModal: () => void;
  isNewCategoryModalOpen: boolean;
  openNewCategoryModal: () => void;
  closeNewCategoryModal: () => void;
  isEditCategoryModalOpen: boolean;
  categoryBeingEdited: Category | null;
  setCategoryBeingEdited: (category: Category) => void;
  openEditCategoryModal: (category: Category) => void;
  closeEditCategoryModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = useState(true);
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdited, setAccountBeingEdited] = useState<BankAccount | null>(null);
  const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [categoryBeingEdited, setCategoryBeingEdited] = useState<Category | null>(null);

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible(prevState => !prevState);
  }, []);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  const openEditAccountModal = useCallback((bankAccount: BankAccount) => {
    setAccountBeingEdited(bankAccount);
    setIsEditAccountModalOpen(true);
  }, []);

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdited(null);
    setIsEditAccountModalOpen(false);
  }, []);

  const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
    setNewTransactionType(type);
    setIsNewTransactionModalOpen(true);
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, []);

  const openNewCategoryModal = useCallback(() => {
    setIsNewCategoryModalOpen(true);
  }, []);

  const closeNewCategoryModal = useCallback(() => {
    setIsNewCategoryModalOpen(false);
  }, []);

  const openEditCategoryModal = useCallback((category: Category) => {
    setCategoryBeingEdited(category);
    setIsEditCategoryModalOpen(true);
  }, []);

  const closeEditCategoryModal = useCallback(() => {
    setCategoryBeingEdited(null);
    setIsEditCategoryModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
        isEditAccountModalOpen,
        openEditAccountModal,
        closeEditAccountModal,
        accountBeingEdited,
        setAccountBeingEdited,
        isNewTransactionModalOpen,
        newTransactionType,
        openNewTransactionModal,
        closeNewTransactionModal,
        isNewCategoryModalOpen,
        openNewCategoryModal,
        closeNewCategoryModal,
        isEditCategoryModalOpen,
        categoryBeingEdited,
        setCategoryBeingEdited,
        openEditCategoryModal,
        closeEditCategoryModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}