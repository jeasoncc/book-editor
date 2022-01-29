import { writable } from "svelte/store";
import { getRandomNumber } from "../tools/getRandomNumber";
import { CardInterface } from "../schema/card/card.interface";

const storeCards = () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    init: (cards: CardInterface[]) => {
      set(cards);
    },
    createCard: (
      project: string,
      title: string,
      content: string,
      showTooltip: boolean
    ) =>
      update(n => {
        return n.concat([
          {
            id: getRandomNumber(),
            project: project,
            title: title,
            content: content,
            showTooltip: showTooltip,
          },
        ]);
      }),
    /**
     * Update card by id.
     * @param {CardInterface} card Card object.
     */
    setCard: (card: CardInterface) =>
      update(n => {
        const index = n.findIndex(c => c.id == card.id);
        n[index] = card;
        return n;
      }),
    /**
     * Removes card.
     * @param {string} id ID of the tab.
     */
    removeCard: (id: string) =>
      update(n => {
        return n.filter(n => n.id !== id);
      }),
  };
};

export const cards = storeCards();
