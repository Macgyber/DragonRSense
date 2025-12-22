require "dragonruby"

def tick args
  # ========================================
  # PRUEBA 1: Sprite Hover - IMAGEN EXISTE
  # ========================================
  # Pasa el mouse sobre el path para ver:
  # - Preview de la imagen
  # - Dimensiones
  
  args.outputs.sprites << {
    x: 640,
    y: 360,
    w: 64,
    h: 64,
    path: "sprites/player.png"  # ← Pasa el mouse AQUÍ (Debería decir "Abrir sprite")
  }
  
  # ========================================
  # PRUEBA 2: Sprite Hover - IMAGEN NO EXISTE
  # ========================================
  # Pasa el mouse sobre el path para ver:
  # - Tooltip de error
  
  args.outputs.sprites << {
    x: 100,
    y: 100,
    w: 32,
    h: 32,
    path: "sprites/no-existe.png"  # ← Pasa el mouse AQUÍ (Debería decir "No encontrado")
  }
  
  # ========================================
  # PRUEBA 3: Coordinate Hovers (x, y, w, h)
  # ========================================
  
  player = {
    x: 100,    # ← Horizontal position
    y: 200,    # ← Vertical position
    w: 32,     # ← Width
    h: 32      # ← Height
  }
  
  # ========================================
  # PRUEBA 4: Resource Discovery / Navigation
  # ========================================
  
  # Prueba con el icono que también está en la carpeta
  icon_path: "sprites/icon.png"
  
  # ========================================
  # PRUEBA 5: Snippets
  # ========================================
  # Escribe: dr-sprite-centered
end