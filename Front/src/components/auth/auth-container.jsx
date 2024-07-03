import { Button, Card, Flex, Tab, TabGroup, TabList, TabPanel, TabPanels, Title } from "@tremor/react"
import { Login } from "./login"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { CreateProduct } from "../products/create-product"
import { useLocation } from "wouter"
import { Registro } from "./registro"

export const AuthContainer = () => {
    const [, setLocation] = useLocation();

    return (
        <Card className="w-auto max-w-xl m-auto box-border">
            <Flex className="justify-between items-center">
                <Title>Ingreso</Title>
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
                    <Tab>Login</Tab>
                    <Tab>Registro</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login />
                    </TabPanel>
                    <TabPanel>
                        <Registro />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </Card>
    )
}