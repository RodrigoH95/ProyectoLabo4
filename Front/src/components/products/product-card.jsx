export const ProductCard = ({ product, handleClick }) => {
    const { id, nombre, precio, descuento, urlImg } = product;

    return (
        <div onClick={() => handleClick(id)} className="relative w-56 h-80 bg-white shadow-lg rounded-lg p-4 cursor-pointer">
            <img src={urlImg} alt={nombre} className="w-full h-48 object-cover object-center" />
            <div className="mt-4">
                <h2 className="text-gray-900 title-font text-lg font-medium text-center">{nombre}</h2>
                <div className="absolute left-0 bottom-2 w-full px-2 flex justify-between items-center">
                    {descuento ? (
                        <p className="text-gray-500 text-sm"><span className="line-through">${precio} </span>${precio * (1 - descuento)}</p>
                    ) : (
                        <p className="text-gray-500 text-sm">${precio}</p>
                    )}
                    <p className="text-gray-500 text-sm">{descuento > 0 ? `${descuento * 100} % OFF` : ""}</p>
                </div>
            </div>
        </div>
    );
}