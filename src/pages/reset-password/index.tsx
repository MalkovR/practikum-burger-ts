import {SyntheticEvent, useRef, useState} from "react";
import style from "./reset-password.module.css";
import {Button, Input,} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {resetPasswordRequest} from "../../utils/burger-api";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
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

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    resetPasswordRequest(password, token);
    navigate("/login", { state: { resetPassword: false } });
  };

  return (
    <div className={style.reset_page_container}>
      <div className={style.reset_form}>
        <h2 className="text text_type_main-medium mb-4">
          Восстановление пароля
        </h2>
        <form name="resetPassword" className={style.login} onSubmit={onSubmit}>
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
            value={token}
            onChange={(e) => setToken(e.target.value)}
            name={"код"}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Button htmlType="submit" type="primary" size="medium">
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
