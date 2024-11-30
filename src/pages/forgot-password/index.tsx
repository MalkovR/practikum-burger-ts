import {FormEvent, useState} from "react";
import style from "./forgot-password.module.css";
import {Button, Input,} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useNavigate} from "react-router-dom";
import {forgotPasswordRequest} from "../../utils/burger-api";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPasswordRequest(email);
    navigate("/reset-password", { state: { resetPassword: true } });
  };

  return (
    <div className={style.forgot_page_container}>
      <div className={style.forgot_form}>
        <h2 className="text text_type_main-medium mb-4">
          Восстановление пароля
        </h2>
        <form name="forgotPassword" className={style.login} onSubmit={onSubmit}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name={"email"}
            errorText={"Ошибка"}
            size={"default"}
          />

          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            disabled={!email}
          >
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
