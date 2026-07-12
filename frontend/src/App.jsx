import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import AppContent from './routes/AppRoutes';
import './App.css'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
