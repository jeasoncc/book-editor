import { writable } from "svelte/store";
import RoleInterface from "../schema/role/role.interface";

const storeRoles = () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    init: (roles: RoleInterface[]) => {
      set(roles);
    },
    createRole: (role: RoleInterface) => {
      update(n => {
        return n.concat([role]);
      });
      return {
        create: true,
        role,
      };
    },

    setCard: (role: RoleInterface) =>
      update(n => {
        const index = n.findIndex(c => c.id == role.id);
        n[index] = role;
        return n;
      }),

    removeCard: (id: string) =>
      update(n => {
        return n.filter(n => n.id !== id);
      }),
  };
};

export const roles = storeRoles();
