import { Loader } from "@/components/loader";
import { AuthContext } from "@/context/auth";
import { loginSchema } from "@/schemas/validation/auth";
import { login } from "@/services/auth";
import { checkIfIsEmailOrUsername, mappedErrors } from "@/utils/mapped-errors";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { useContext, useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "wouter";

export const Login = () => {
  const [errors, setErrors] = useState({});

  const { handleLogin, handleError } = useContext(AuthContext);

  const [_, setLocation] = useLocation();

  const { redirect } = useParams();
  const previousPath = redirect ? decodeURIComponent(redirect): null;

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials) => login(credentials),
    onSuccess: (data) => {
      handleLogin(data);
      toast.success("¡Bienvenido nuevamente!");
      console.log("Previous path", previousPath);
      setLocation(previousPath ? previousPath : "/");
    },
    onError: (err) => {
      handleError(err);
      toast.error("Credenciales inválidas");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { usernameOrEmail, password } = data;
    const field = checkIfIsEmailOrUsername(usernameOrEmail);
    const credentials = {
      [field]: usernameOrEmail,
      password,
    };
    const { success, errors } = mappedErrors(loginSchema, credentials);
    if (!success) {
      setErrors(errors);
      return;
    }
    e.target.reset();
    setErrors({});
    mutate(credentials);
  };
  return (
    <>
      {isPending && <Loader />}
      <Card className="w-full max-w-xl m-auto">
        <Title>Login</Title>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 mb-6">
            <label>
              <Text>Usuario o e-mail:</Text>
              <TextInput
                className="w-full px-3"
                label="Username or Email"
                name="usernameOrEmail"
                placeholder="Ingrese su usuario o e-mail"
                autoComplete="off"
                error={Boolean(errors.username ?? errors.email)}
                errorMessage={errors.username ?? errors.email}
              />
            </label>
            <label>
              <Text>Password:</Text>
              <TextInput
                className="w-full px-3"
                label="Password"
                name="password"
                placeholder="Ingrese su contraseña"
                type="password"
                autoComplete="off"
                error={Boolean(errors.password)}
                errorMessage={errors.password}
              />
            </label>
          </div>
          <Button className="w-full px-3" icon={ArrowRightEndOnRectangleIcon}>
            Login
          </Button>
        </form>
      </Card>
    </>
  );
};
