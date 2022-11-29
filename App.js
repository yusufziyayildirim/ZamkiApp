import { Provider } from "react-redux";
import { store } from './src/store';
import Router from './src/navigation/Router';

export default function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}