namespace ProyectoLabo4.Models.Productos.Dto
{
    public class ProductosDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public string UrlImg { get; set; } = null!;
        public decimal Precio { get; set; }
        public decimal Descuento { get; set; }
    }
}
