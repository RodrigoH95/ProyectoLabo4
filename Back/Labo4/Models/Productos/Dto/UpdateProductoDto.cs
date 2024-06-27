namespace ProyectoLabo4.Models.Productos.Dto
{
    public class UpdateProductoDto
    {
        public string? Nombre { get; set; } = null!;
        public string? Descripcion { get; set; } = null!;
        public string? UrlImg { get; set; } = null!;
        public decimal? Precio { get; set; }
        public decimal? Descuento { get; set; } = 0;
        public string? Categoria { get; set; } = null!;
        public decimal? Puntaje { get; set; }
        public int? Stock { get; set; }
    }
}
