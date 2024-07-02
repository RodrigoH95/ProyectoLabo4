import { Loader } from "@/components/loader";
import { mappedErrors } from "@/utils/mapped-errors";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Text, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { toast } from "sonner";
import { useLocation, useParams } from "wouter";
import { getOneProduct, updateProduct } from "../../services/products";
import { createUpdateProductSchema } from "../../schemas/validation/product";

export const UpdateProduct = () => {
    const { id } = useParams();
    const [, setNavigate] = useLocation();

    const [errors, setErrors] = useState({});

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getOneProduct(id),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["updateProduct", id],
        mutationFn: (productData) => updateProduct(id, productData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Producto modificado correctamente");
            setTimeout(() => {
                setNavigate("/admin");
            }, 1000);
        },
        onError: () => {
            toast.error("Error modificando producto");
        },
    });

    if (isError) toast.error("Error obteniendo producto");

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
        <>
            {isLoading || isPending ? (
                <Loader />
            ) : (
                <Card className="w-full max-w-xl m-auto mt-10">
                    <Title>Modificar producto</Title>
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
                                    defaultValue={data?.nombre}
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
                                    defaultValue={data?.descripcion}
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
                                    defaultValue={data?.urlImg}
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
                                    defaultValue={data?.precio}
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
                                    defaultValue={data?.descuento * 100}
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
                                    defaultValue={data?.categoria}
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
                                    defaultValue={data?.puntaje}
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
                                    defaultValue={data?.stock}
                                />
                            </label>

                        </div>
                        <Button className="w-full px-3">Guardar</Button>
                        <Button
                            onClick={() => setNavigate("/admin")}
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
