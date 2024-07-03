import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth"
import { getProductsByUser } from "../../services/products";
import { Button, Table, TableHead, TableHeaderCell, TableRow, TableBody, TableCell, Text, Title } from "@tremor/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { removeProductFromUser } from "../../services/users";
import { toast } from "sonner";

export const UserCart = () => {
    const { state } = useContext(AuthContext);
    const { user } = state;

    const getPrecioTotal = () => {
        return productos.reduce((acc, producto) => {
            return acc + (producto.descuento ? producto.precio * (1 - producto.descuento) : producto.precio);
        }, 0);
    }

    const {
        data: productos,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProductsByUser(user.id),
    });

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["products"],
        mutationFn: (id) => removeProductFromUser(user.id, id),
        onSuccess: () => {
            queryClient.invalidateQueries('products'); // Adjust this to match your query key
            toast.success("Producto removido correctamente");
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
        }
    }
    );

    const handleDelete = (id) => {
        mutate(id);
    }

    return (
        <>  
            <Title>Mi carrito:</Title>
            <Table className="mt-5">
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center">
                                Cargando...
                            </TableCell>
                        </TableRow>
                    ) : (
                        !productos?.length && (
                            <TableRow>
                                <TableCell colSpan="4" className="text-center">
                                    No hay productos
                                </TableCell>
                            </TableRow>
                        )
                    )}
                    {productos
                        ?.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="text-center">{product.nombre}</TableCell>
                                <TableCell className="text-center">{product.descripcion}</TableCell>
                                <TableCell className="text-center">${product.precio * (1 - product.descuento)}</TableCell>
                                <TableCell className="text-center">
                                    <Button onClick={() => handleDelete(product.id)}>Quitar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    <TableRow className="text-center">
                        <TableCell colSpan="6" className="text-center">
                            <Text>Total ${getPrecioTotal()}</Text>
                            <Button className="mt-5" onClick={() => toast.success("Gracias por su compra")}>Comprar</Button>    
                        </TableCell>
                        
                    </TableRow>
                </TableBody>
            </Table >
        </>
    )
}