import { Loader } from "@/components/loader";
import { updateUserSchema } from "@/schemas/validation/user";
import { getUser, updateUser } from "@/services/users";
import { mappedErrors } from "@/utils/mapped-errors";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "wouter";

export const UpdateUser = () => {
  const { id } = useParams();
  const [, setNavigate] = useLocation();

  const [errors, setErrors] = useState({});

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateUser", id],
    mutationFn: (userData) => updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated");
      setTimeout(() => {
        setNavigate("/users");
      }, 1000);
    },
    onError: () => {
      toast.error("Error updating user");
    },
  });

  if (isError) toast.error("Error getting users");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const { success, errors } = mappedErrors(updateUserSchema, data);
    if (!success) {
      setErrors(errors);
      return;
    }
    e.target.reset();
    setErrors({});
    mutate(data);
  };
  return (
    <>
      {isLoading || isPending ? (
        <Loader />
      ) : (
        <Card className="w-full max-w-xl m-auto mt-10">
          <Title>Update User</Title>
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
                  defaultValue={data?.name}
                  error={Boolean(errors.name)}
                  errorMessage={errors.name}
                />
              </label>
              <label>
                <Text>Username:</Text>
                <TextInput
                  className="w-full px-3"
                  label="Username"
                  name="username"
                  placeholder="JoeDoe"
                  autoComplete="off"
                  defaultValue={data?.userName}
                  error={Boolean(errors.username)}
                  errorMessage={errors.username}
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
                  defaultValue={data?.email}
                  error={Boolean(errors.email)}
                  errorMessage={errors.email}
                />
              </label>
            </div>
            <Button className="w-full px-3">Update</Button>
            <Button
              onClick={() => setNavigate("/users")}
              icon={ArrowLeftIcon}
              type="button"
              variant="secondary"
              className="w-full px-3 mt-5"
            >
              Volver
            </Button>
          </form>
        </Card>
      )}
    </>
  );
};
