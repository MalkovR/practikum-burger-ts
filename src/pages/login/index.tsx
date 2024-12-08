import { FormEvent, useRef, useState } from "react";
import style from "./login.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { login } from "../../services/auth/actions";
import { useDispatch } from "../../services/store";

export const Login = () => {
  const dispatch = useDispatch();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const hidePassword = () => {
    let passwordInput = passwordRef.current;
    if (passwordInput) {
      passwordInput.type === "password"
        ? (passwordInput.setAttribute("type", "text"),
          setIsPasswordHidden(false))
        : (passwordInput.setAttribute("type", "password"),
          setIsPasswordHidden(true));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email: email, password: password }));
  };

  return (
    <div className={style.login_page_container}>
      <div className={style.login_form}>
        <h2 className="text text_type_main-medium mb-4">Вход</h2>
        <form name="login" className={style.login} onSubmit={handleSubmit}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            ref={passwordRef}
            type={"password"}
            placeholder={"Пароль"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={"password"}
            errorText={"Ошибка"}
            size={"default"}
            icon={isPasswordHidden ? "ShowIcon" : "HideIcon"}
            onIconClick={hidePassword}
          />

          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
      </div>
      <div>
        <p className={"text text_type_main-default text_color_inactive"}>
          Вы - новый пользователь?&nbsp;
          <Link to="/register" className={style.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={"text text_type_main-default text_color_inactive"}>
          Забыли пароль?&nbsp;
          <Link to="/forgot-password" className={style.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
};
