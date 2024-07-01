import {
    Badge,
    Card,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Title,
} from "@tremor/react";

import { AuthContext } from "@/context/auth";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";
import { deleteProduct, getProducts } from "../../services/products";
import { ROLES } from "@/constants";

export const ProductListAdmin = () => {
    const [, setLocation] = useLocation();

    const {
        state: { user },
    } = useContext(AuthContext);
    const { roles } = user;

    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts(),
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ["product"],
        mutationFn: (id) => deleteProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Producto eliminado correctamente");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleDelete = (id) => {
        mutate(id);
    };

    if (isError) toast.error("Error obteniendo productos");

    return (
        <Card className="w-full m-auto">
            <Title>
                Productos
                <Badge className="ml-2">{products?.length}</Badge>
            </Title>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-center">Id</TableHeaderCell>
                        <TableHeaderCell className="text-center">Nombre</TableHeaderCell>
                        <TableHeaderCell className="text-center">Descripcion</TableHeaderCell>
                        <TableHeaderCell className="text-center">Precio</TableHeaderCell>
                        <TableHeaderCell className="text-center">Descuento</TableHeaderCell>
                        <TableHeaderCell className="text-center">Stock</TableHeaderCell>

                        {roles.includes(ROLES.ADMIN || ROLES.MOD) && (
                            <TableHeaderCell className="text-center">Actions</TableHeaderCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center">
                                Cargando...
                            </TableCell>
                        </TableRow>
                    ) : (
                        !products?.length && (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center">
                                    No hay productos
                                </TableCell>
                            </TableRow>
                        )
                    )}
                    {products
                        ?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="text-center">{product.id}</TableCell>
                                <TableCell className="text-center">{product.nombre}</TableCell>
                                <TableCell className="text-center">{product.descripcion}</TableCell>
                                <TableCell className="text-center">${product.precio}</TableCell>
                                <TableCell className="text-center">{product.descuento * 100} %</TableCell>
                                <TableCell className="text-center">{product.stock}</TableCell>
                                {(roles.includes(ROLES.ADMIN) || roles.includes(ROLES.MOD)) && (
                                    <TableCell className="text-center">
                                        <button
                                            className="mr-1 hover:cursor-pointer hover:opacity-75"
                                            onClick={() => setLocation(`admin/product/${product.id}`)}
                                        >
                                            <Icon
                                                icon={PencilSquareIcon}
                                                color="blue"
                                                title="Update"
                                                tooltip={`Modificar ${product.nombre}`}
                                            />
                                        </button>
                                        {roles.includes(ROLES.ADMIN) && (
                                            <button className="hover:cursor-pointer hover:opacity-75"
                                                onClick={() => handleDelete(product.id)}>
                                                <Icon
                                                    icon={TrashIcon}
                                                    color="red"
                                                    title="Delete"
                                                    tooltip={`Eliminar ${product.nombre}`}
                                                />
                                            </button>
                                        )}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </Card>
    );
};
