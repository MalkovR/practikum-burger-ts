import style from "./app.module.css";
import AppHeader from "../app-header";
import Burgers from "../burgers";

function App() {
  return (
    <div className={style.container}>
      <AppHeader />
      <Burgers />
    </div>
  );
}

export default App;