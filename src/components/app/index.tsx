import style from "./app.module.css";
import AppHeader from "../app-header";
import Burgers from "../burgers";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <Burgers />
      </DndProvider>
    </div>
  );
}

export default App;
