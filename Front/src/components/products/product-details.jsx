import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "wouter"
import { getOneProduct } from "../../services/products";
import { Loader } from "../loader";
import { Button, Card, Flex, Text, Title } from "@tremor/react";
import { toast } from "sonner";
import { addProductToUser } from "../../services/users";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const ProductDetails = () => {
    const { id } = useParams();

    const [location, setLocation] = useLocation();

    const {
        state: { user, isAuthenticated },
    } = useContext(AuthContext);

    const handleAgregarAlCarrito = async () => {
        if (!isAuthenticated) {
            const currentPath = encodeURIComponent(location);
            toast.warning("Debes iniciar sesión para agregar productos al carrito");
            setLocation(`/signin/${currentPath}`);
            return;
        }
        try {
            const response = await addProductToUser(user.id, parseInt(id), 1);

            // If the response is successful, show a success toast
            if (response) {
                toast.success("Producto agregado al carrito");
            }
        } catch (error) {
            // If there's an error, show an error toast
            toast.error("Error al agregar el producto al carrito");
            console.error(error);
        }
    }

    const handleCompra = async () => {
        await handleAgregarAlCarrito();
        if (!isAuthenticated) return;
        setLocation("/cart");
    }

    const { data: producto, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getOneProduct(id),
    });

    if (isError) toast.error("Error obteniendo detalles del producto");

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <Card className="w-10/12 m-auto mt-10">
                    <Button
                        onClick={() => setLocation("/")}
                        icon={ArrowLeftIcon}
                        variant="light"
                    >
                        Volver
                    </Button>
                    <Title className="text-3xl">{producto.nombre}</Title>
                    <Flex className="justify-around items-center flex-wrap gap-2">
                        <div className="max-w-xs">
                            <img className="rounded w-full h-auto object-cover object-center" src={producto.urlImg} alt={producto.nombre} />
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Text className="text-2xl">{producto.descripcion}</Text>
                            <div className="w-full px-2 flex justify-between gap-3 items-center">
                                {producto.descuento ? (
                                    <p className="text-gray-500 text-xl"><span className="line-through">${producto.precio} </span>${producto.precio * (1 - producto.descuento)}</p>
                                ) : (
                                    <p className="text-gray-500 text-xl">${producto.precio}</p>
                                )}
                                <p className="text-gray-500 text-xl">{producto.descuento > 0 ? `${producto.descuento * 100} % OFF` : ""}</p>
                            </div>
                            <Text>Quedan: {producto.stock}</Text>
                            <div className="flex justify-center flex-col items-center gap-3 my-3 flex-wrap">
                                <Button onClick={() => handleCompra()} className="bg-gray-300 hover:bg-gray-400 w-52">Comprar ahora</Button>
                                <Button onClick={() => handleAgregarAlCarrito()} className="bg-gray-300 hover:bg-gray-400 w-52">Agregar al carrito</Button>
                            </div>
                        </div>
                    </Flex>

                </Card>
            )}
        </>
    );
}