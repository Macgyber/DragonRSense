# 🚀 Cómo Publicar DragonRSense

Esta guía describe los pasos para publicar la extensión en el Visual Studio Code Marketplace.

## 📋 Requisitos Previos

1.  **Cuenta de Microsoft/Azure DevOps:** Necesitas una cuenta para acceder al portal de publicación.
2.  **Organización y Token (PAT):**
    *   Ve a [Azure DevOps](https://dev.azure.com/) y crea una organización.
    *   Genera un **Personal Access Token (PAT)** con permisos de:
        *   Organization: `All accessible organizations`
        *   Scopes: `Marketplace` (Acquire & Manage)
3.  **Crear Publisher:**
    *   Ve al [Marketplace Management Portal](https://marketplace.visualstudio.com/manage).
    *   Crea un nuevo "Publisher" con el ID: `MagyGames` (debe coincidir con el `publisher` en `package.json`).

## 📦 Paso 1: Empaquetar (Ya realizado)

Hemos generado el paquete `.vsix` localmente.

```bash
npx vsce package
```

Esto crea el archivo: `dragonrsense-0.0.1.vsix`.

## 🚀 Paso 2: Publicar

### Opción A: Desde la Web (Recomendado para la primera vez)
1.  Ve a https://marketplace.visualstudio.com/manage
2.  Selecciona tu publisher (`MagyGames`).
3.  Haz clic en **"New Extension"**.
4.  Selecciona **"Visual Studio Code"**.
5.  Arrastra y suelta el archivo `dragonrsense-0.0.1.vsix`.

### Opción B: Desde la Terminal
Si ya configuraste tu publisher en la terminal:

```bash
npx vsce login MagyGames
# (Pega tu Token PAT cuando te lo pida)

npx vsce publish
```

## 🔄 Actualizar Versión

Para futuras versiones:

1.  Actualiza la versión en `package.json` (ej. `0.0.2`):
    ```bash
    npm version patch
    ```
2.  Publica de nuevo:
    ```bash
    npx vsce publish
    ```
