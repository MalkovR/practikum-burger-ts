import style from "./app.module.css";
import {AppHeader} from "../app-header";
import {Burgers} from "../burgers";
import {Login} from "../../pages/login";
import {Register} from "../../pages/register";
import {ForgotPassword} from "../../pages/forgot-password";
import {ResetPassword} from "../../pages/reset-password";
import {Profile} from "../../pages/profile";
import {Feed} from "../../pages/feed";
import {ProfileOrders} from "../../pages/profile-orders";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {OnlyAuth, OnlyUnAuth,} from "../protected-route-element/protected-route-element.tsx";
import {useDispatch, useSelector} from "../../services/store";
import {useEffect} from "react";
import {checkUserAuth} from "../../services/auth/actions";
import {IngredientDetails} from "../ingredient-details";
import {getBurgerIngredientsAll} from "../../services/burger-ingredients/selectors";
import {getIngredients} from "../../services/burger-ingredients/actions";
import {Modal} from "../modal";
import {OrderInfo} from "../order-info";

export const App = () => {
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
          <Route path="/" element={<Burgers />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route
            path="/register"
            element={<OnlyUnAuth component={<Register />} />}
          />
          <Route
            path="/forgot-password"
            element={<OnlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path="/reset-password"
            element={<OnlyUnAuth component={<ResetPassword />} />}
          />
          <Route path='/feed/:id' element={<OrderInfo />} />
          <Route path="/feed" element={ <Feed />}/>
          <Route path='/profile/orders/:id' element={<OnlyAuth component={<OrderInfo />} />}/>
          <Route path="/profile/orders" element={<OnlyAuth component={<ProfileOrders />} />}/>
          <Route
            path="/profile"
            element={<OnlyAuth component={<Profile />} />}
          />
        </Routes>
        {backgroundState && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClose={() => navigate("/")}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
        {backgroundState && (
            <Routes>
              <Route
                  path='/feed/:id'
                  element={
                    <Modal  title="" onClose={() => navigate("/feed")}>
                      <OrderInfo/>
                    </Modal>
                  }
              />
            </Routes>
        )}
        {backgroundState && (
            <Routes>
              <Route
                  path='/profile/orders/:id'
                  element={
                    <Modal  title="" onClose={() => navigate("/profile/orders")}>
                      <OrderInfo/>
                    </Modal>
                  }
              />
            </Routes>
        )}
      </DndProvider>
    </div>
  );
}
