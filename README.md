   La API que desarrollamos está pensada para servir como una plataforma de venta de artículos diversos, donde cada usuario puede publicar sus propios productos y comprar los que desea.
   Las personas pueden navegar por la página sin la necesidad de un usuario, e incluso pueden agregar los objetos de su interés a un carrito que llevará la cuenta de los objetos que está interesado en comprar, el precio individual y el total de lo que desea comprar. Para poder realizar la comprar tendrá que registrarse como usuario, esto no vaciaria el carro de compras, de esta forma una vez registrado podrá comprar previamente seleccionado
   Los usuarios podrán registrarse en cualquier momento, esto viene con el beneficio de poder comprar en la tienda, comentar los productos y publicar los propios para la venta. A la hora de publicar el producto tendrá que subir una imagen, escribir la especificación del producto, poner información de contacto y el precio


Tecnologías y Herramientas Utilizadas: 

Visual Studio 
Visual Studio Code
C#
HTML
WT (Json web token)
ASP.NET para el desarrollo del backend
Tiene autenticación con JWT (Json web token) y autorización con roles de usuario
Usamos ORM como Entity Framework para interactuar con la base de datos
Swagger para documentar la API


Patrones de diseños utilizados: 

 -Repository: es un patrón de diseño para ubicar el acceso a datos en la capa externa de la aplicación y así mantener el dominio agnóstico a sus fuentes de datos
 -Inyección: Este consiste en insertar dependencias a otras clases en el constructor de una clase.
