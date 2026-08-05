import { HashRouter } from "react-router-dom";
import AppRoutes from './AppRoutes';
const App = () => {

  return (
    <>
      <HashRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </HashRouter>
    </>
  );
}

export default App
