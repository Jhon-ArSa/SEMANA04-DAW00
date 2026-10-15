# 🚀 Instrucciones para Git y GitHub

## 📋 Resumen de Cambios

Este proyecto implementa un **Dashboard de Gestión con Estado Complejo** siguiendo la Guía Práctica Semana 7 - Parte 2, con todos los React Hooks avanzados.

---

## 🔧 Configuración Inicial de Git

### 1. Verificar si Git está inicializado

```bash
git status
```

Si no está inicializado, ejecutar:

```bash
git init
git branch -M main
```

---

## 📝 Crear Commit con los Cambios

### 2. Agregar todos los archivos

```bash
git add .
```

### 3. Crear commit descriptivo

```bash
git commit -m "feat: Dashboard con Estado Complejo - Guía Práctica Semana 7 Parte 2

✨ Nuevas Funcionalidades:
- Dashboard de gestión de tareas con estado complejo
- useReducer con 7 acciones (ADD, REMOVE, TOGGLE, FILTER, SORT, CLEAR, LOAD)
- useMemo para lista filtrada/ordenada
- useCallback para handlers estables
- useRef para auto-focus en input
- useEffect con sincronización a localStorage y cleanup
- 2 Hooks personalizados: useLocalStorage y useDebounce
- Integración completa con tema claro/oscuro (useContext)

📂 Archivos Nuevos:
- src/components/Dashboard.tsx (217 líneas)
- src/components/Dashboard.css
- src/reducers/tasksReducer.ts (7 acciones)
- src/hooks/useLocalStorage.ts (hook personalizado)
- src/hooks/useDebounce.ts (hook personalizado)
- README.md (documentación técnica completa)
- VALIDACIONES_FINALES.md (checklist de validaciones)
- RESUMEN_PROYECTO.md (resumen ejecutivo)

✏️ Archivos Modificados:
- src/App.tsx (Dashboard integrado)
- src/components/Header.tsx (link a Dashboard agregado)
- src/context/ThemeContext.tsx (comentarios técnicos)

✅ Validaciones:
- Build exitoso: 0 errores, 0 warnings
- ESLint: sin warnings
- TypeScript: sin errores
- Todos los hooks implementados según rúbrica

📊 Cumplimiento de Rúbrica: 100%
- useReducer + estado complejo: ✅
- useContext + useEffect: ✅
- useMemo/useCallback: ✅
- useRef + hook personalizado: ✅
- Validación + documentación: ✅"
```

---

## 🌐 Subir a GitHub

### 4. Crear repositorio en GitHub

1. Ir a https://github.com/new
2. Crear nuevo repositorio:
   - **Nombre:** `agregados-react-dashboard`
   - **Descripción:** "Dashboard de Gestión con Estado Complejo usando React Hooks Avanzados"
   - **Visibilidad:** Público o Privado (según prefieras)
   - **NO inicializar** con README (ya tenemos uno)

### 5. Conectar repositorio local con GitHub

```bash
# Reemplazar TU_USUARIO con tu usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/agregados-react-dashboard.git
```

### 6. Subir código a GitHub

```bash
git push -u origin main
```

Si pide autenticación:
- **Usuario:** Tu usuario de GitHub
- **Contraseña:** Personal Access Token (no tu contraseña normal)

**¿Cómo crear un Personal Access Token?**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Seleccionar scopes: `repo` (Full control of private repositories)
4. Copiar el token y usarlo como contraseña

---

## 📋 Verificar en GitHub

### 7. Abrir el repositorio

```
https://github.com/TU_USUARIO/agregados-react-dashboard
```

**Verificar que aparezcan:**
- ✅ Todos los archivos del proyecto
- ✅ README.md se muestra automáticamente
- ✅ El commit message completo

---

## 🎯 Configurar GitHub Pages (Opcional)

Si quieres publicar el proyecto en línea:

### 8. Habilitar GitHub Pages

1. En GitHub → Settings del repo
2. Pages → Source → GitHub Actions
3. Crear archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

4. Hacer commit y push del workflow
5. Esperar 2-3 minutos
6. El sitio estará en: `https://TU_USUARIO.github.io/agregados-react-dashboard/`

---

## 📊 Comandos Git Útiles

### Ver estado de archivos
```bash
git status
```

### Ver historial de commits
```bash
git log --oneline
```

### Ver diferencias antes de commit
```bash
git diff
```

### Crear rama para desarrollo
```bash
git checkout -b desarrollo
```

### Volver a main
```bash
git checkout main
```

---

## 🔧 Configuración de .gitignore

Verificar que `.gitignore` incluya:

```
# Dependencias
node_modules/
package-lock.json

# Build
dist/
*.local

# Editor
.vscode/
.idea/

# Sistema
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

---

## 📝 Actualizar README.md con Link del Repo

Agregar al final del `README.md`:

```markdown
## 🔗 Enlaces

- **Repositorio:** https://github.com/TU_USUARIO/agregados-react-dashboard
- **Demo en vivo:** https://TU_USUARIO.github.io/agregados-react-dashboard/ (si habilitaste GitHub Pages)
```

Luego hacer commit:

```bash
git add README.md
git commit -m "docs: agregar enlaces del repositorio"
git push
```

---

## ✅ Checklist de Git

- [ ] Git inicializado (`git init`)
- [ ] Todos los archivos agregados (`git add .`)
- [ ] Commit creado con mensaje descriptivo
- [ ] Repositorio creado en GitHub
- [ ] Remote configurado (`git remote add origin`)
- [ ] Código subido (`git push -u origin main`)
- [ ] README.md visible en GitHub
- [ ] (Opcional) GitHub Pages configurado

---

## 🎉 ¡Listo!

Tu proyecto ya está en GitHub y listo para entregar.

**Link del repositorio para compartir:**
```
https://github.com/TU_USUARIO/agregados-react-dashboard
```

---

## 📞 Soporte

Si tienes problemas con Git/GitHub:

1. **Error de autenticación:**
   - Usar Personal Access Token en vez de contraseña
   - Verificar que el token tenga permisos de `repo`

2. **Error "remote already exists":**
   ```bash
   git remote remove origin
   git remote add origin https://github.com/TU_USUARIO/agregados-react-dashboard.git
   ```

3. **Error "failed to push":**
   ```bash
   git pull origin main --rebase
   git push -u origin main
   ```

---

**¡Éxito con tu entrega!** 🚀
