import style from './app.module.css'
import AppHeader from './components/app-header'
import Burgers from './components/burgers'


function App() {

    return (
      <div className={style.container}>
        <AppHeader />
        <Burgers />
      </div>
    )
  }

export default App;