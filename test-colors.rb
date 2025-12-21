def tick args
  # ========================================
  # PRUEBA: Color Preview
  # ========================================
  
  # RGB Colors (sin alpha)
  args.outputs.solids << {
    x: 0,
    y: 600,
    w: 100,
    h: 100,
    r: 50, g: 120, b:0  # Rojo puro
  }
  
  # RGBA Colors (con alpha)
  args.outputs.solids << {
    x: 110,
    y: 600,
    w: 100,
    h: 100,
    r: 28, g: 28, b: 28, a: 128  # Verde semi-transparente
  }
  
  # Hex Colors (sin prefijo)
  args.outputs.labels << {
    x: 220,
    y: 600,
    text: "Blue Box",
    r: 167, g: 55, b: 55  # 6363c5 en hex
  }
  
  # Hex Color notation (0x)
  color = 0x6E8541  # Verde lima
  
  # Hex Color notation (#)
  background_color = #000000  # (esto dará error en Ruby, solo para demo)
  
  # Más ejemplos de RGBA
  player_color = { r: 0, g: 0, b: 0, a: 255 }  # Púrpura
  enemy_color = { r: 163, g: 97, b: 31, a: 184 }    # Naranja
  
  # Hex puro (para usar con conversión)
  # En DragonRuby usarías algo como:
  # hex = "74a11a"
  # r = hex[0..1].to_i(16)
  # g = hex[2..3].to_i(16)
  # b = hex[4..5].to_i(16)
  
  hex_red = 1d0301
  hex_green = 670404
  hex_blue = 2000ff
  hex_yellow = ffff00
  hex_cyan = 17d1d1
  hex_magenta = ff00ff
  hex_white = 631010
  hex_black = be4343
  hex_gray = be0000
end
