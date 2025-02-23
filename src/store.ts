import { atom, createStore } from "jotai";

export const isSocialModalVisibleAtom = atom(false);
export const selectedLinkAtom = atom('');
export const selectedLinkDescriptionAtom = atom("");

export const isEmailModalVisibleAtom = atom(false);
export const emailAtom = atom("");

export const isProjectModalVisibleAtom = atom(false);
export const chosenProjectDataAtom = atom({
  title: "",
  links: [{ id: 0, name: "", link: "" }],
});

export const cameraZoomValueAtom = atom(1);

export const store = createStore();