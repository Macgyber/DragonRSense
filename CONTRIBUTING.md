# 📦 Git Repository Guide - DragonRSense

## ✅ QUÉ SE SUBE A GIT (Source Code)

### **Archivos Esenciales del Proyecto**
- ✅ `package.json` - Metadatos, dependencias y scripts
- ✅ `package-lock.json` - Versiones exactas de dependencias (importante para reproducibilidad)
- ✅ `tsconfig.json` - Configuración de TypeScript
- ✅ `README.md` - Documentación del proyecto
- ✅ `LICENSE` - Licencia del proyecto

### **Código Fuente (src/)**
- ✅ `src/**/*.ts` - Todo el código TypeScript
- ✅ `src/extension.ts` - Punto de entrada principal
- ✅ `src/core/**` - Lógica central
- ✅ `src/features/**` - Características de la extensión

### **Configuración de Desarrollo**
- ✅ `.vscode/launch.json` - Configuración de debugging
- ✅ `.vscode/tasks.json` - Tareas de compilación
- ✅ `.eslintrc.json` - Reglas de linting
- ✅ `.vscodeignore` - Archivos a excluir al empaquetar
- ✅ `.gitignore` - Archivos a ignorar en Git

### **Recursos**
- ✅ `snippets/**` - Snippets de código
- ✅ `icons/**` - Iconos (si los hay)
- ✅ `images/**` - Imágenes de documentación

---

## ❌ QUÉ NO SE SUBE A GIT (Generated/Dependencies)

### **Dependencias (se instalan con `npm install`)**
- ❌ `node_modules/` - Paquetes de npm (174 paquetes, ~50MB)
  - **Por qué:** Se regeneran con `npm install`
  - **Cómo obtenerlos:** `npm install`

### **Código Compilado (se genera con `npm run compile`)**
- ❌ `out/` - JavaScript compilado desde TypeScript
  - **Por qué:** Se regenera desde el código fuente TypeScript
  - **Cómo generarlo:** `npm run compile`

### **Archivos de Cache**
- ❌ `.eslintcache` - Cache de ESLint
- ❌ `*.tsbuildinfo` - Cache de TypeScript
- ❌ `.vscode-test/` - Archivos de pruebas de VS Code

### **Paquetes Distribuibles**
- ❌ `*.vsix` - Paquete de extensión compilado
  - **Por qué:** Se genera para distribución
  - **Cómo generarlo:** `vsce package`

### **Logs y Temporales**
- ❌ `*.log` - Archivos de log
- ❌ `.env` - Variables de entorno (pueden contener secretos)

---

## 🚀 CÓMO CLONAR Y CONFIGURAR EL PROYECTO

Para que otros desarrolladores puedan trabajar en el proyecto:

```bash
# 1. Clonar el repositorio
git clone <tu-repo-url>
cd DragonRSense

# 2. Instalar dependencias
npm install

# 3. Compilar el código
npm run compile

# 4. Abrir en VS Code
code .

# 5. Presionar F5 para debuggear
```

---

## 📊 ESTRUCTURA DE ARCHIVOS EN GIT

```
DragonRSense/
├── .vscode/              ✅ Configuración de VS Code
│   ├── launch.json       ✅ Debugging
│   └── tasks.json        ✅ Tareas
├── src/                  ✅ Código fuente TypeScript
│   ├── core/             ✅ Lógica central
│   ├── features/         ✅ Características
│   └── extension.ts      ✅ Punto de entrada
├── snippets/             ✅ Snippets de código
├── .eslintrc.json        ✅ Configuración ESLint
├── .gitignore            ✅ Archivos ignorados
├── .vscodeignore         ✅ Archivos excluidos del paquete
├── LICENSE               ✅ Licencia
├── package.json          ✅ Metadatos y dependencias
├── package-lock.json     ✅ Versiones exactas
├── README.md             ✅ Documentación
├── tsconfig.json         ✅ Configuración TypeScript
│
├── node_modules/         ❌ NO en Git (npm install)
├── out/                  ❌ NO en Git (npm run compile)
└── *.vsix                ❌ NO en Git (vsce package)
```

---

## 🔄 WORKFLOW DE DESARROLLO

### **Para contribuidores:**

1. **Fork y clone** el repositorio
2. **Instalar dependencias:** `npm install`
3. **Compilar:** `npm run compile` o `npm run watch`
4. **Desarrollar:** Hacer cambios en `src/`
5. **Probar:** Presionar F5 para debuggear
6. **Lint:** `npm run lint` para verificar calidad
7. **Commit:** Solo archivos en `src/`, configuración, y docs
8. **Push y Pull Request**

### **Comandos útiles:**

```bash
# Desarrollo continuo (auto-recompila)
npm run watch

# Verificar calidad del código
npm run lint

# Compilar para producción
npm run compile

# Empaquetar extensión
vsce package
```

---

## 💡 BUENAS PRÁCTICAS

1. **Nunca commitear:**
   - `node_modules/`
   - `out/`
   - `*.vsix`
   - Archivos de log
   - Configuraciones personales

2. **Siempre commitear:**
   - Código fuente (`src/`)
   - Configuración del proyecto
   - Documentación
   - Tests

3. **Antes de hacer commit:**
   ```bash
   npm run lint      # Verificar calidad
   npm run compile   # Asegurar que compila
   git status        # Revisar qué se va a subir
   ```

---

## 🎯 VALOR PARA COLABORADORES

Al mantener el repositorio limpio:

✅ **Clonación rápida** - Solo ~100KB de código fuente vs ~50MB con node_modules
✅ **Sin conflictos** - No hay conflictos en archivos generados
✅ **Reproducible** - Todos obtienen las mismas versiones con `npm install`
✅ **Fácil de revisar** - Solo cambios en código fuente, no en archivos compilados
✅ **Profesional** - Sigue las mejores prácticas de la industria

---

## 📝 CHECKLIST ANTES DE COMMIT

- [ ] ¿Compiló sin errores? (`npm run compile`)
- [ ] ¿Pasó el lint? (`npm run lint`)
- [ ] ¿Solo archivos de código fuente? (`git status`)
- [ ] ¿Documentación actualizada si es necesario?
- [ ] ¿Mensaje de commit descriptivo?

---

**Mantén el repositorio limpio y valioso para todos los colaboradores! 🚀**
