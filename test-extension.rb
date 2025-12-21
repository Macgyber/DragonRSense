def tick args
  # ========================================
  # PRUEBA 1: Hovers de Coordenadas
  # ========================================
   Pasa el mouse sobre x, y, w, h para ver las explicaciones
  
  args.outputs.sprites << {
    x: 640,      # ← Pasa el mouse aquí
    y: 360,      # ← Pasa el mouse aquí
    w: 64,       # ← Pasa el mouse aquí
    h: 64,       # ← Pasa el mouse aquí
    path: "sprites/player.png"  # ← Pasa el mouse aquí (si existe la imagen)
  }
  
  # ========================================
  # PRUEBA 2: Más Coordenadas
  # ========================================
  
  player = {
    x: 100,
    y: 200,
    w: 32,
    h: 32
  }
  
  enemy = {
    x: 500,
    y: 400,
    w: 48,
    h: 48
  }
  
  # ========================================
  # PRUEBA 3: Comando Hello
  # ========================================
  # Presiona Ctrl+Shift+P y escribe:
  # "DragonRSense: Hello World"
  
  # ========================================
  # PRUEBA 4: Decoraciones (Opcional)
  # ========================================
  # Ve a Settings → DragonRSense → Enable Decorations
  # Verás iconos 🎯 y 📐 antes de las coordenadas
end
