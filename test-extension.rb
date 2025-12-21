def tick args
  # ========================================
  # PRUEBA 1: Sprite Hover - IMAGEN EXISTE
  # ========================================
  # Pasa el mouse sobre el path para ver:
  # - Preview de la imagen
  # - Dimensiones (64 × 64 px)
  # - Tamaño del archivo
  
  args.outputs.sprites << {
    x: 640,
    y: 360,
    w: 64,
    h: 64,
    path: "sprites/player.svg"  # ← Pasa el mouse AQUÍ (imagen existe)
  }
  
  # ========================================
  # PRUEBA 2: Sprite Hover - IMAGEN NO EXISTE
  # ========================================
  # Pasa el mouse sobre el path para ver:
  # - Mensaje de error
  # - Path del archivo faltante
  
  args.outputs.sprites << {
    x: 100,
    y: 100,
    w: 32,
    h: 32,
    path: "sprites/no-existe.png"  # ← Pasa el mouse AQUÍ (imagen NO existe)
  }
  
  # ========================================
  # PRUEBA 3: Coordinate Hovers (x, y, w, h)
  # ========================================
  # Pasa el mouse sobre x, y, w, h para ver explicaciones
  
  player = {
    x: 100,    # ← Horizontal position
    y: 200,    # ← Vertical position
    w: 32,     # ← Width
    h: 32      # ← Height
  }
  
  # ========================================
  # PRUEBA 4: Resource Discovery
  # ========================================
  path: "sprites/sprites/player.png"
  # Deberías ver autocompletado con player.png
  
  # ========================================
  # PRUEBA 5: Snippets
  # ========================================
  # Escribe: dr-sprite-centered
  # Tab para navegar por los campos
end
{
  x: 0,
  y: 0,
  w: 64,
  h: 64,
  path: "sprites/  "
}