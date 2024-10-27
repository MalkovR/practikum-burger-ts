import React, { useState, useRef } from "react";
import style from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const passwordRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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

  return (
    <div className={style.reset_page_container}>
      <div className={style.reset_form}>
        <h2 className="text text_type_main-medium mb-4">
          Восстановление пароля
        </h2>
        <form name="register" className={style.login} onSubmit={""}>
          <Input
            ref={passwordRef}
            type={"password"}
            placeholder={"Введите новый пароль"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name={"password"}
            errorText={"Ошибка"}
            size={"default"}
            icon={isPasswordHidden ? "ShowIcon" : "HideIcon"}
            onIconClick={hidePassword}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            name={"код"}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </form>
      </div>
      <p className={"text text_type_main-default text_color_inactive"}>
        Вспомнили пароль?&nbsp;
        <Link to="/login" className={style.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
