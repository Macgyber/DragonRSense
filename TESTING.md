# 🧪 DragonRSense - Testing Guide

## 🎯 What Your Extension Does (v0.0.1)

Your extension has **3 main features** that help you understand DragonRuby code better.

---

## ⚙️ STEP 1: Enable Features (IMPORTANT!)

**All features are DISABLED by default.** You must enable them first.

### How to Enable:

1. Press `Ctrl + ,` (Windows/Linux) or `Cmd + ,` (Mac)
2. Search for "DragonRSense"
3. Enable these settings:

```
✅ DragonRSense: Enable Coordinates      (ON)
✅ DragonRSense: Enable Sizes            (ON)
✅ DragonRSense: Enable Sprite Hover     (ON)
⚠️ DragonRSense: Enable Decorations     (Optional - can be distracting)
```

---

## 🚀 STEP 2: Run the Extension

### Option A: Debug Mode (Recommended for Testing)

1. Open the DragonRSense project in VS Code
2. Press **F5**
3. A new VS Code window will open with "[Extension Development Host]" in the title
4. **Use THAT window** to test the extension

### Option B: Install Locally

```bash
# Package the extension
npm install -g @vscode/vsce
vsce package

# Install the .vsix file
code --install-extension dragonrsense-0.0.1.vsix
```

---

## 📝 STEP 3: Create Test File

In the **Extension Development Host** window, create a file called `test.rb`:

```ruby
def tick args
  # TEST 1: Coordinate Hovers
  # Hover your mouse over x, y, w, h below
  args.outputs.sprites << {
    x: 640,      # ← Hover here
    y: 360,      # ← Hover here
    w: 64,       # ← Hover here
    h: 64,       # ← Hover here
    path: "sprites/player.png"  # ← Hover here (if image exists)
  }
  
  # TEST 2: More coordinates
  player = {
    x: 100,
    y: 200,
    w: 32,
    h: 32
  }
  
  # TEST 3: Sprite paths
  # Create a sprites/ folder with a PNG image to test
  background = {
    path: "sprites/background.png"
  }
end
```

---

## ✅ STEP 4: Test Each Feature

### Feature 1: ✅ Coordinate Hovers

**What it does:** Shows helpful explanations when you hover over coordinates

**How to test:**
1. Hover your mouse over the letter `x` in the code
2. You should see a tooltip:
   ```
   x → Horizontal position (left → right) in DragonRuby
   ```

3. Hover over `y`:
   ```
   y → Vertical position (bottom → top) in DragonRuby
   ```

4. Hover over `w`:
   ```
   w → Width of the sprite or element
   ```

5. Hover over `h`:
   ```
   h → Height of the sprite or element
   ```

**If it doesn't work:**
- ✅ Check that "Enable Coordinates" is ON in settings
- ✅ Check that "Enable Sizes" is ON in settings
- ✅ Make sure the file has `.rb` extension
- ✅ Make sure the file contains `args.` somewhere
- ✅ Try reloading the window: `Ctrl+Shift+P` → "Reload Window"

---

### Feature 2: ✅ Sprite Preview with Dimensions

**What it does:** Shows image preview, dimensions, and file info when hovering over sprite paths

**How to test:**

1. **First, create a test image:**
   ```bash
   # Create sprites folder
   mkdir sprites
   
   # Copy any PNG or JPEG image to sprites/player.png
   # Or create a simple test image
   ```

2. **Hover over the sprite path** `"sprites/player.png"`

3. You should see:
   ```
   🎨 Sprite Preview
   
   [Image of the sprite]
   
   ---
   
   📐 Dimensions: 32 × 32 px
   📁 Path: sprites/player.png
   💾 Size: 2.4 KB
   ```

**If it doesn't work:**
- ✅ Check that "Enable Sprite Hover" is ON in settings
- ✅ Make sure the image file actually exists at that path
- ✅ Supported formats: PNG, JPEG, JPG
- ✅ The path must be in quotes: `"sprites/player.png"`

---

### Feature 3: ✅ Visual Decorations (Optional)

**What it does:** Shows icons next to coordinates to make them easier to spot

**How to test:**

1. **Enable decorations** in settings:
   - Settings → DragonRSense → Enable Decorations → ON

2. **Look at your code**, you should see:
   ```ruby
   🎯 x: 640,    # Position icon
   🎯 y: 360,    # Position icon
   📐 w: 64,     # Size icon
   📐 h: 64,     # Size icon
   ```

**If it doesn't work:**
- ✅ Check that "Enable Decorations" is ON
- ✅ Reload the window: `Ctrl+Shift+P` → "Reload Window"
- ✅ Make sure the file contains `args.`

**Note:** This feature can be distracting, so it's optional.

---

### Feature 4: ✅ Hello Command

**What it does:** Confirms the extension is active

**How to test:**

1. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type: "DragonRSense: Hello World"
3. Press Enter
4. You should see a message:
   ```
   🐉 DragonRSense is active! Where code stops being numbers and becomes meaning.
   ```

**If it doesn't work:**
- ✅ Make sure you're in the Extension Development Host window
- ✅ Try reloading: `Ctrl+Shift+P` → "Developer: Reload Window"

---

## 🐛 TROUBLESHOOTING

### "I don't see any hovers"

**Checklist:**
1. ✅ Are you in the Extension Development Host window? (opened with F5)
2. ✅ Is the file extension `.rb`?
3. ✅ Does the file contain `args.` somewhere?
4. ✅ Are the settings enabled?
   - Enable Coordinates: ON
   - Enable Sizes: ON
5. ✅ Try reloading: `Ctrl+Shift+P` → "Reload Window"

---

### "Sprite preview doesn't show"

**Checklist:**
1. ✅ Is "Enable Sprite Hover" ON in settings?
2. ✅ Does the image file actually exist?
3. ✅ Is the path correct relative to workspace root?
4. ✅ Is the path in quotes? `"sprites/player.png"`
5. ✅ Is it PNG or JPEG format?

---

### "Decorations don't appear"

**Checklist:**
1. ✅ Is "Enable Decorations" ON in settings?
2. ✅ Does the file contain `args.`?
3. ✅ Try reloading the window
4. ✅ Check if you're in a DragonRuby file (`.rb`)

---

### "Extension doesn't activate at all"

**Checklist:**
1. ✅ Did you press F5 to open Extension Development Host?
2. ✅ Check the Debug Console for errors:
   - View → Debug Console
   - Look for "DragonRSense activated 🐉"
3. ✅ Try recompiling:
   ```bash
   npm run compile
   ```
4. ✅ Check for TypeScript errors:
   ```bash
   npm run lint
   ```

---

## 📊 Quick Test Checklist

Use this to verify everything works:

- [ ] Extension activates (see "DragonRSense activated 🐉" in Debug Console)
- [ ] Hello command works (`Ctrl+Shift+P` → "DragonRSense: Hello World")
- [ ] Hover over `x` shows explanation
- [ ] Hover over `y` shows explanation
- [ ] Hover over `w` shows explanation
- [ ] Hover over `h` shows explanation
- [ ] Hover over sprite path shows image (if file exists)
- [ ] Sprite hover shows dimensions
- [ ] Decorations appear (if enabled)

---

## 🎯 Expected Behavior Summary

| Feature | When | What You See |
|---------|------|--------------|
| **Coordinate Hover** | Hover over `x`, `y`, `w`, `h` | Tooltip with explanation |
| **Sprite Preview** | Hover over `"sprites/file.png"` | Image + dimensions + size |
| **Decorations** | Open DragonRuby file | 🎯 and 📐 icons |
| **Hello Command** | Run command | Success message |

---

## 🚀 Next Steps

Once you verify everything works:

1. ✅ Test with your actual DragonRuby project
2. ✅ Try different sprite paths
3. ✅ Experiment with the settings
4. ✅ Report any issues you find

---

## 📝 Notes

- The extension only activates for Ruby files (`.rb`)
- The extension only works in files that contain `args.`
- All features are optional and can be toggled in settings
- The extension is non-invasive - it never modifies your code

---

*Happy coding! 🐉*
