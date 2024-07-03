import { mappedErrors } from "@/utils/mapped-errors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, TextInput, Text, Title } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { createProduct } from "../../services/products";
import { createUpdateProductSchema } from "../../schemas/validation/product";

export const CreateProduct = () => {
    const [errors, setErrors] = useState({});

    const [, setNavigate] = useLocation();

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ["product"],
        mutationFn: (productData) => createProduct(productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Producto añadido correctamente");
            setTimeout(() => {
                setNavigate("/admin");
            }, 1000);
        },
        onError: () => {
            toast.error("Error creando producto");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.descuento = parseFloat(data.descuento / 100);
        const { success, errors } = mappedErrors(createUpdateProductSchema, data);
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
            <Title>Añadir producto</Title>
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 mb-6">
                    <label>
                        <Text>Nombre:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="Nombre"
                            name="nombre"
                            placeholder="Introduce el nombre"
                            autoComplete="off"
                            error={Boolean(errors.nombre)}
                            errorMessage={errors.nombre}
                        />
                    </label>
                    <label>
                        <Text>Descripción:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="Descripción"
                            name="descripcion"
                            placeholder="Introduce la descripción"
                            autoComplete="off"
                            error={Boolean(errors.descripcion)}
                            errorMessage={errors.descripcion}
                        />
                    </label>
                    <label>
                        <Text>URL de la Imagen:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="URL de la Imagen"
                            name="urlImg"
                            placeholder="Introduce la URL de la imagen"
                            autoComplete="off"
                            error={Boolean(errors.urlImg)}
                            errorMessage={errors.urlImg}
                        />
                    </label>
                    <label>
                        <Text>Precio:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="Precio"
                            name="precio"
                            placeholder="Introduce el precio"
                            autoComplete="off"
                            error={Boolean(errors.precio)}
                            errorMessage={errors.precio}
                            type="number"
                        />
                    </label>
                    <label>
                        <Text>Descuento:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="Descuento"
                            name="descuento"
                            placeholder="Introduce el descuento"
                            autoComplete="off"
                            error={Boolean(errors.descuento)}
                            errorMessage={errors.descuento}
                            type="number"
                        />
                    </label>
                    <label>
                        <Text>Categoría:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="Categoría"
                            name="categoria"
                            placeholder="Introduce la categoría"
                            autoComplete="off"
                            error={Boolean(errors.categoria)}
                            errorMessage={errors.categoria}
                        />
                    </label>
                    <label>
                        <Text>Puntaje:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="Puntaje"
                            name="puntaje"
                            placeholder="Introduce el puntaje"
                            autoComplete="off"
                            error={Boolean(errors.puntaje)}
                            errorMessage={errors.puntaje}
                            type="number"
                        />
                    </label>
                    <label>
                        <Text>Stock:</Text>
                        <TextInput
                            className="w-full px-3"
                            label="Stock"
                            name="stock"
                            placeholder="Introduce el stock"
                            autoComplete="off"
                            error={Boolean(errors.stock)}
                            errorMessage={errors.stock}
                            type="number"
                        />
                    </label>
                </div>
                <Button className="w-full px-3">Guardar</Button>
            </form>
        </Card>
    );
};
