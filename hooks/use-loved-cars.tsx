import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Car } from "@prisma/client";
import { useToast } from "./use-toast";

interface UseLovedCarsType {
  lovedItems: Car[];
  addLoveItem: (data: Car) => void;
  removeLovedItem: (id: string) => void;
}

const useLovedCarsStore = create(
  persist<UseLovedCarsType>(
    (set, get) => ({
      lovedItems: [],
      addLoveItem: (data: Car) => {
        const currentLovedItems = get().lovedItems;
        const existingItem = currentLovedItems.find(
          (item) => item.id === data.id
        );

        if (existingItem) {
          return;
        }

        set({
          lovedItems: [...get().lovedItems, data],
        });
      },
      
      removeLovedItem: (id: string) => {
        set({
          lovedItems: [...get().lovedItems.filter((item) => item.id !== id)],
        });
      },
    }),
    {
      name: "loved-products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useLovedCars = () => {
  const { toast } = useToast();
  const store = useLovedCarsStore();

  const addLoveItem = (data: Car) => {
    const currentLovedItems = store.lovedItems;
    const existingItem = currentLovedItems.find(
      (item) => item.id === data.id
    );

    if (existingItem) {
      return toast({
        title: "El coche ya existe en la lista 💔",
      });
    }

    store.addLoveItem(data);

    toast({
      title: "Coche añadido a la lista 🚙",
    });
  };

  const removeLovedItem = (id: string) => {
    store.removeLovedItem(id);

    toast({
      title: "El carr se ha eliminado de favoritos ",
    });
  };

  return {
    lovedItems: store.lovedItems,
    addLoveItem,
    removeLovedItem,
  };
};