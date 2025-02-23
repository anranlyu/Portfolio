import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import initGame from './initGame';
import ReactUI from './ReatUI';
import { Provider } from 'jotai';
import { store } from './store';

const ui = document.getElementById('ui') as HTMLElement;
const root = createRoot(ui);
root.render(
  <StrictMode>
    <Provider store={store}>
      <ReactUI />
    </Provider>
  </StrictMode>
);

initGame();
