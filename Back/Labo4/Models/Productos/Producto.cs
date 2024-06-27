using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ProyectoLabo4.Models.Users;

namespace ProyectoLabo4.Models.Productos
{
    public class Producto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [MaxLength(255)]
        public string Nombre { get; set; } = null!;
        [Required]
        [MaxLength(512)]
        public string Descripcion { get; set; } = null!;
        [Required]
        [MaxLength(255)]
        public string UrlImg { get; set; } = null!;
        [Required]
        public decimal Precio { get; set; }
        public decimal Descuento { get; set; } = 0;
        [Required]
        public string Categoria { get; set; } = null!;

        public decimal Puntaje { get; set; }
        [Required]
        public int Stock { get; set; }
        public List<ProductoUsuario> ProductoUsuarios { get; set; } = new List<ProductoUsuario>();
    }

    public class ProductoUsuario
    {
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public int ProductoId { get; set; }
        public Producto Producto { get; set; } = null!;

        public int Cantidad { get; set; }
    }
}
