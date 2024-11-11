import style from "./app.module.css";
import AppHeader from "../app-header";
import Burgers from "../burgers";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  OnlyAuth,
  OnlyUnAuth,
} from "../protected-route-element/protected-route-element";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkUserAuth } from "../../services/auth/actions";
import IngredientDetails from "../ingredient-details";
import { getBurgerIngredientsAll } from "../../services/burger-ingredients/selectors";
import { getIngredients } from "../../services/burger-ingredients/actions";
import { useLocation } from "react-router-dom";
import { resetIngredientsDetails } from "../../services/selected-ingredient/actions";
import Modal from "../modal";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, error, ingredients } = useSelector(getBurgerIngredientsAll);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  if (ingredients.length === 0) {
    return <p>Нет ингредиентов</p>;
  }

  const backgroundState = location.state && location.state.backgroundLocation;

  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <AppHeader />
        <Routes location={backgroundState || location}>
          <Route exact path="/" element={<Burgers />} />
          <Route path="ingredients/:id" element={<IngredientDetails />} />
          <Route
            exact
            path="/login"
            element={<OnlyUnAuth component={<Login />} />}
          />
          <Route
            exact
            path="/register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            exact
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            exact
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route
            exact
            path="/profile"
            element={<OnlyAuth component={<Profile />} />}
          />
          {/* like zaglushka */}
          <Route
            path="/profile/orders"
            element={<OnlyAuth component={<Profile />} />}
          />
        </Routes>
        {backgroundState && (
          <Routes>
            <Route
              path="ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClose={() => navigate("/")}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </DndProvider>
    </div>
  );
}

export default App;
