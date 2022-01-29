import { writable } from "svelte/store";
import { ProjectInterface } from "../schema/project/project.interface";

const storeProjects = () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    init: (projects: ProjectInterface[]) => {
      set(projects);
    },
    createProject: (project: ProjectInterface) => {
      update(n => {
        n = n.concat([project]);
        return n;
      });
      return {
        create: true,
        project,
      };
    },

    removeProject: (id: string) =>
      update(n => {
        return n.filter(n => n.id !== id);
      }),
    setProject: (project: ProjectInterface) =>
      update(n => {
        n[n.findIndex(p => p.id == project.id)] = project;
        return n;
      }),
  };
};

export const projects = storeProjects();
