import './App.css';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ContributionsPage } from './components/ContributionsPage';

const store = setupStore();
setupListeners(store.dispatch);

function App() {
  return (
    <>
      <Provider store={store}>
        <ContributionsPage />
      </Provider>
    </>
  );
}

export default App;
