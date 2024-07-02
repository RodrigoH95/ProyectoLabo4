import {
    Button,
    Card,
    Flex,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    Title,
} from "@tremor/react";

import {
    ArrowLeftIcon,
    InboxStackIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useLocation } from "wouter";
import { ProductListAdmin } from "./product-list-admin";
import { CreateProduct } from "./create-product";

export const ProductContainer = () => {
    const [, setLocation] = useLocation();

    return (
        <Card className="w-9/12 m-auto box-border">
            <Flex className="justify-between items-center">
                <Title>Administración de productos</Title>
                <Button
                    onClick={() => setLocation("/")}
                    icon={ArrowLeftIcon}
                    variant="light"
                >
                    Volver
                </Button>
            </Flex>
            <TabGroup>
                <TabList className="mt-8">
                    <Tab icon={InboxStackIcon}>Lista de productos</Tab>
                    <Tab icon={PlusCircleIcon}>Añadir producto</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ProductListAdmin />
                    </TabPanel>
                    <TabPanel>
                        <CreateProduct />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </Card>
    );
};