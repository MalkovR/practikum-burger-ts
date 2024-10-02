import style from './App.module.css'
import AppHeader from './components/AppHeader/index'
import BurgerIngredients from './components/BurgerIngredients/index'
import BurgerConstructor from './components/BurgerConstructor/index'


function App() {

  return (
    < div className={style.container}>
      <AppHeader />
      <div className={style.burgersContainer}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  )
}

export default App
