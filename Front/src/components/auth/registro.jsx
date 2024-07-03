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
import { register } from "../../services/auth";
import { registerSchema } from "../../schemas/validation/auth";

export const Registro = () => {
    const [errors, setErrors] = useState({});

    const { handleLogin, handleError } = useContext(AuthContext);

    const { mutate, isPending } = useMutation({
        mutationKey: ["register"],
        mutationFn: (credentials) => register(credentials),
        onSuccess: (data) => {
            //   handleLogin(data);
            toast.success("¡Te has registrado con exito!");
        },
        onError: (err) => {
            handleError(err);
            toast.error("Hubo un error creando tu cuenta");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const { name, userName, email, password } = data;
        const credentials = {
            name,
            userName,
            email,
            password,
        };
        // const field = checkIfIsEmailOrUsername(usernameOrEmail);
        // const credentials = {
        //   [field]: usernameOrEmail,
        //   password,
        // };
        const { success, errors } = mappedErrors(registerSchema, credentials);
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
                            <Text>Nombre:</Text>
                            <TextInput
                                className="w-full px-3"
                                label="Nombre"
                                name="name"
                                placeholder="Ingrese su nombre"
                                autoComplete="off"
                                error={Boolean(errors.name)}
                                errorMessage={errors.name}
                            />
                        </label>
                        <label>
                            <Text>Usuario:</Text>
                            <TextInput
                                className="w-full px-3"
                                label="Username"
                                name="userName"
                                placeholder="Ingrese su usuario"
                                autoComplete="off"
                                error={Boolean(errors.username)}
                                errorMessage={errors.username}
                            />
                        </label>
                        <label>
                            <Text>E-mail:</Text>
                            <TextInput
                                className="w-full px-3"
                                label="Email"
                                name="email"
                                placeholder="Ingrese su e-mail"
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
                                placeholder="Ingrese su contraseña"
                                type="password"
                                autoComplete="off"
                                error={Boolean(errors.password)}
                                errorMessage={errors.password}
                            />
                        </label>
                    </div>
                    <Button className="w-full px-3" icon={ArrowRightEndOnRectangleIcon}>
                        Enviar
                    </Button>
                </form>
            </Card>
        </>
    );
};
