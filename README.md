# 🐉 DragonRSense

**Where code stops being numbers and becomes meaning.**

A Visual Studio Code extension designed exclusively for [DragonRuby Game Toolkit](https://dragonruby.org), making game code more visual, understandable, and interactive.

---

## ✨ Features

### 🎯 Coordinate Intelligence

Hover over `x`, `y`, `w`, `h` to see helpful explanations:

- **x** → Horizontal position (left → right)
- **y** → Vertical position (bottom → top)  
- **w** → Width of the sprite or element
- **h** → Height of the sprite or element

### 🖼️ Sprite Preview

Hover over sprite paths to see:
- Image preview
- Dimensions (e.g., 32 × 32 px)
- File size
- Relative path

### 🎨 Visual Decorations *(Optional)*

Show helpful icons next to coordinates in your code:
- 🎯 Position indicators (x, y)
- 📐 Size indicators (w, h)

---

## 🚀 Quick Start

### Installation

1. Download the `.vsix` file
2. In VS Code: `Ctrl+Shift+X` → `...` → `Install from VSIX...`
3. Select `dragonrsense-0.0.1.vsix`
4. Reload VS Code

### Configuration

Open Settings (`Ctrl+,`) and search for "DragonRSense":

- ✅ **Coordinates** - Show hover info for X and Y
- ✅ **Sizes** - Show hover info for W and H  
- ✅ **Sprite Preview** - Show sprite preview on hover
- ⚠️ **Decorations** - Show visual icons (optional)

---

## 📖 Usage

### Example Code

```ruby
def tick args
  args.outputs.sprites << {
    x: 640,      # Hover to see: "Horizontal position"
    y: 360,      # Hover to see: "Vertical position"
    w: 64,       # Hover to see: "Width"
    h: 64,       # Hover to see: "Height"
    path: "sprites/player.png"  # Hover to see sprite preview
  }
end
```

### Commands

- `DragonRSense: Hello World` - Verify extension is active

---

## ⚙️ Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `dragonrsense.coordinates` | `true` | Show hover info for X and Y coordinates |
| `dragonrsense.sizes` | `true` | Show hover info for W and H (width/height) |
| `dragonrsense.spritePreview` | `true` | Show sprite preview on hover |
| `dragonrsense.decorations` | `false` | Show visual icons next to coordinates |

---

## 🎯 Philosophy

DragonRSense is a **non-invasive editor intelligence layer**:

- ✅ The editor enriches understanding
- ✅ Never modifies your code
- ✅ All features are optional
- ✅ Your code remains valid DragonRuby code

> The editor becomes a quiet assistant, not a ruler.

---

## 🛠️ Development

### Requirements

- Node.js 20.x or higher
- VS Code 1.80.0 or higher

### Build

```bash
npm install
npm run compile
```

### Debug

Press `F5` to open Extension Development Host

### Package

```bash
npm install -g @vscode/vsce
vsce package
```

---

## 📋 Roadmap

- [x] Coordinate & Size Awareness
- [x] Sprite Preview with Dimensions
- [ ] Navigation (Cmd/Ctrl + Click)
- [ ] Require Intelligence
- [ ] Color Intelligence
- [ ] API Autocomplete

---

## 🤝 Contributing

Contributions are welcome!

---

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 🔗 Links

- [DragonRuby Game Toolkit](https://dragonruby.org)
- [GitHub Repository](https://github.com/Macgyber/DragonRSense)
- [Report Issues](https://github.com/Macgyber/DragonRSense/issues)

---

**Made with ❤️ for the DragonRuby community**
