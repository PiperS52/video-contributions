import './App.css';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ContributionsPage } from './components/ContributionsPage';
import { Navigate, Route, Routes } from 'react-router';

const store = setupStore();
setupListeners(store.dispatch);

function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="/contributions" />}
          ></Route>
          <Route path="contributions" element={<ContributionsPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
