import { createUserSchema } from "@/schemas/validation/user";
import { createUser } from "@/services/users";
import { mappedErrors } from "@/utils/mapped-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export const CreateUser = () => {
  const [errors, setErrors] = useState({});

  const [, setNavigate] = useLocation();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["user"],
    mutationFn: (userData) => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created");
      setTimeout(() => {
        setNavigate("/users");
      }, 1000);
    },
    onError: () => {
      toast.error("Error creating user");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { success, errors } = mappedErrors(createUserSchema, data);
    if (!success) {
      setErrors(errors);
      return;
    }
    e.target.reset();
    setErrors({});
    mutate(data);
  };
  return (
    <Card className="w-full max-w-xl m-auto">
      <Title>Create User</Title>
      <form className="mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-6">
          <label>
            <Text>Name:</Text>
            <TextInput
              className="w-full px-3"
              label="Name"
              name="name"
              placeholder="Joe Doe"
              autoComplete="off"
              error={Boolean(errors.name)}
              errorMessage={errors.name}
            />
          </label>
          <label>
            <Text>Username:</Text>
            <TextInput
              className="w-full px-3"
              label="Username"
              name="userName"
              placeholder="JoeDoe"
              type="text"
              autoComplete="off"
              error={Boolean(errors.userName)}
              errorMessage={errors.userName}
            />
          </label>
          <label>
            <Text>Email:</Text>
            <TextInput
              className="w-full px-3"
              label="Email"
              name="email"
              placeholder="example@mail.com"
              type="email"
              autoComplete="off"
              error={Boolean(errors.email)}
              errorMessage={errors.email}
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

          <label>
            <Text>Confirm Password:</Text>
            <TextInput
              className="w-full px-3"
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Repeat password here"
              type="password"
              autoComplete="off"
              error={Boolean(errors.confirmPassword)}
              errorMessage={errors.confirmPassword}
            />
          </label>
        </div>
        <Button className="w-full px-3">Create</Button>
      </form>
    </Card>
  );
};
