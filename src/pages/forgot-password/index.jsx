import React, { useState } from "react";
import style from "./forgot-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={style.forgot_page_container}>
      <div className={style.forgot_form}>
        <h2 className="text text_type_main-medium mb-4">
          Восстановление пароля
        </h2>
        <form name="login" className={style.login} onSubmit={""}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Button type="primary" size="medium">
            Восстановить
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

export default ForgotPassword;