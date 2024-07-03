# Visión General

CompuTienda es una plataforma de comercio electrónico especializada en productos informáticos como monitores, sillas gamer, mouse y teclados. El sitio permite a los usuarios registrarse, agregar productos al carrito y realizar compras. Además, los administradores tienen privilegios para gestionar el inventario, creando, modificando o eliminando productos según sea necesario.

---

## Funcionalidades Principales

- Autenticación y Gestión de Usuarios
Los usuarios pueden registrarse, iniciar sesión y gestionar sus cuentas.
Los administradores tienen acceso a funciones adicionales para administrar usuarios y roles.

- Gestión de Productos:
     - Los administradores pueden crear nuevos productos, modificar los existentes y eliminar aquellos que ya no estén disponibles o sean obsoletos.
     - Cada producto incluye detalles como nombre, descripción, precio y categoría.

- Carrito de Compras
     - Los usuarios pueden agregar productos al carrito desde la página de producto y gestionar su selección antes de proceder al pago.

- Proceso de Compra
     - Los usuarios pueden revisar su carrito y ver el costo total de la compra.

- Interfaz de Usuario Intuitiva
     - La interfaz está diseñada para ser amigable y accesible, facilitando la navegación y la búsqueda de productos.

---

## Tecnologías y Herramientas Utilizadas: 
### Backend (ASP.NET)
 - ASP.NET: Utilizado como framework principal para el desarrollo del backend.
 - JWT (Json Web Token): Utilizado para la autenticación segura de usuarios, permitiendo la generación y validación de tokens.
 - Entity Framework: ORM utilizado para mapear objetos a la base de datos relacional, facilitando las operaciones de persistencia de datos.
 - Swagger: Utilizado para documentar y exponer la API RESTful de manera clara y estructurada.

### Frontend (ReactJS)

 - ReactJS: Framework de JavaScript utilizado para la construcción del frontend, ofreciendo una interfaz de usuario dinámica y eficiente.
 - Visual Studio Code: Editor de código ligero y potente utilizado para el desarrollo frontend, facilitando la escritura y depuración de código en ReactJS.
 - TailWind CSS: Framework de CSS utilizado para el diseño y estilización del frontend, permitiendo una personalización eficiente y consistente de la interfaz de usuario.
 - Zod: Utilizado para la validación de esquemas de datos en el frontend, asegurando la integridad y consistencia de los datos ingresados por los usuarios.
 - Wouter: Utilizado para la gestión de rutas en el frontend, facilitando la navegación dentro de la aplicación ReactJS de manera eficiente y estructurada.

---

## Patrones de diseños utilizados: 

 ### Backend (ASP.NET)
 
 - Patrón Repository: Implementado para separar la lógica de acceso a datos de la lógica de negocio, permitiendo un mejor mantenimiento y testeabilidad del código.
 - Dependency Injection (DI): Utilizado para gestionar las dependencias de manera eficiente y promover la modularidad del código, facilitando la implementación de pruebas unitarias y la extensibilidad del sistema.
 - Patrón DTO (Data Transfer Object): Empleado para definir objetos que se utilizan para transferir datos entre el frontend y el backend, asegurando un intercambio eficiente y estructurado de información.

### Frontend (ReactJS)
 - Hooks de React: Empleados para gestionar el estado y el ciclo de vida de los componentes funcionales, proporcionando una forma elegante y eficiente de compartir lógica entre componentes.
