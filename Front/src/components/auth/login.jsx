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

export const Login = () => {
  const [errors, setErrors] = useState({});

  const { handleLogin, handleError } = useContext(AuthContext);

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: (credentials) => login(credentials),
    onSuccess: (data) => {
      handleLogin(data);
      toast.success("Welcome back!");
    },
    onError: (err) => {
      handleError(err);
      toast.error("Invalid credentials");
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
              <Text>Username or Email:</Text>
              <TextInput
                className="w-full px-3"
                label="Username or Email"
                name="usernameOrEmail"
                placeholder="Type username or email here"
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
                placeholder="Type password here"
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
