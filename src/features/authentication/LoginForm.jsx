import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import {Input} from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import {login} from "../../services/apiAuth.js";
import {useLogin} from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function LoginForm() {
    const { login, isLogin } = useLogin()

  const [email, setEmail] = useState("dmstu@example.com");
  const [password, setPassword] = useState("pass1111");

  function handleSubmit(e) {
      e.preventDefault()

      if (!(email && password)) return null

      login({ email, password }, {
          onSettled: () => {
              setEmail("")
              setPassword("")
          }
      })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLogin}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLogin}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{ !isLogin ? "Login" : <SpinnerMini /> }</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
