import './App.css'
import AppHeader from './components/AppHeader/index'
import BurgerIngredients from './components/BurgerIngredients/index'
import BurgerConstructor from './components/BurgerConstructor/index'


function App() {

  return (
    < div className='container'>
      <AppHeader />
      <div style={{height: "100%", width: "100%", display: "flex"}}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div>
  )
}

export default App
