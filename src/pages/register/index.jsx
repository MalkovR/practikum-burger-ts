import React, { useState, useRef } from "react";
import style from "./register.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const Register = () => {
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
    <div className={style.register_page_container}>
      <div className={style.register_form}>
        <h2 className="text text_type_main-medium mb-4">Регистрация</h2>
        <form name="register" className={style.login} onSubmit={""}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            name={"username"}
            errorText={"Ошибка"}
            size={"default"}
          />
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

          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </form>
      </div>
      <p className={"text text_type_main-default text_color_inactive"}>
        Уже зарегистрированы?&nbsp;
        <Link to="/login" className={style.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};

export default Register;