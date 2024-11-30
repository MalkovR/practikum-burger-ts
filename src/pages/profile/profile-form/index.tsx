import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import style from "./profile-form.module.css";
import {Button, EmailInput, Input, PasswordInput,} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "../../../services/store";
import {getUserData} from "../../../services/auth/selectors";
import {editUser} from "../../../services/auth/actions";

export const ProfileForm = () => {
  const dispatch = useDispatch();
  const authData = useSelector(getUserData);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    if (authData) {
      const { name, email } = authData;
      setData({
        name,
        email,
        password: "",
      });
    }
  }, [authData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setButtonActive(true);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(editUser(data));
    setButtonActive(false);
  };

  const onCancel = () => {
    if (authData) {
      const { name, email } = authData;
      setData({
        name,
        email,
        password: "",
      });
    }
    setButtonActive(false);
  };

  return (
    <div className={style.profile_form}>
      <form name="profileForm" className={style.login} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          value={data.name}
          name={"name"}
          size={"default"}
          icon={"EditIcon"}
        />
        <EmailInput
          placeholder={"Логин"}
          onChange={handleChange}
          value={data.email}
          name={"email"}
          size="default"
          isIcon={true}
        />
        <PasswordInput
          placeholder="Пароль"
          onChange={handleChange}
          value={data.password}
          name={"password"}
          size="default"
          icon={"EditIcon"}
        />
        {buttonActive && (
          <div className={style.buttons}>
            <div>
              <Button
                type="primary"
                htmlType="button"
                size="medium"
                onClick={onCancel}
              >
                Отмена
              </Button>
            </div>
            <div>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
