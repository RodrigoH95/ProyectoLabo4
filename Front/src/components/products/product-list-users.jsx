import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { Card, Flex, Text } from "@tremor/react";
import { toast } from "sonner";
import { getProducts, getProductsOnDiscount } from "../../services/products";
import { useLocation } from "wouter";

export const ProductListUsers = () => {

    const [, setLocation] = useLocation();

    // Query to fetch all products
    const {
        data: products,
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    // Query to fetch products on discount
    const {
        data: productsOnDiscount,
        isLoading: isLoadingDiscountedProducts,
        isError: isErrorDiscountedProducts,
    } = useQuery({
        queryKey: ["productsOnDiscount"],
        queryFn: getProductsOnDiscount,
    });

    if (isErrorProducts || isErrorDiscountedProducts) {
        toast.error("Error obteniendo productos")
    }

    const handleClick = (id) => {
        setLocation(`/product/${id}`);
    };

    return (
        <>
        {isLoadingDiscountedProducts ? (<Text message="Cargando..." />)
                : (
                    !products?.length && (
                        <Text message="No hay productos en ofertas" />
                    )
                )}
            <Card className="w-10/12 m-auto box-border my-8">
                <Text className="text-2xl text-center mb-4">Mejores ofertas</Text>
                <Flex className="justify-around items-center flex-wrap gap-2">
                    {productsOnDiscount?.map((product) => {
                        return (
                            <ProductCard handleClick={handleClick} key={product.id} product={product} />
                        )
                    }
                    )}
                </Flex>
            </Card>
            {isLoadingProducts ? (<Text message="Cargando..." />)
                : (
                    !products?.length && (
                        <Text message="No hay productos" />
                    )
                )}
            <Card className="w-10/12 m-auto box-border">
                <Text className="text-2xl text-center mb-4">Nuestros productos</Text>
                <Flex className="justify-around items-center flex-wrap gap-2">
                    {products?.map((product) => {
                        return (
                            <ProductCard handleClick={handleClick} key={product.id} product={product} />
                        )
                    }
                    )}
                </Flex>
            </Card>
        </>
    );
}