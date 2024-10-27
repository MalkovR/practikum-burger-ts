import React, { useState } from "react";
import style from "./profile-form.module.css";
import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

const ProfileForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  return (
    <div className={style.profile_form}>
      <form name="profileForm" className={style.login} onSubmit={""}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setUsername(e.target.value)}
          icon={"EditIcon"}
          value="some name"
          name={"username"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <EmailInput
          placeholder={"Логин"}
          onChange={(e) => setEmail(e.target.value)}
          value="some@email.com"
          name={"email"}
          isIcon={true}
        />
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value="some password"
          name={"password"}
          icon="EditIcon"
        />
      </form>
    </div>
  );
};

export default ProfileForm;
