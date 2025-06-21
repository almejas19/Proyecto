# Entregable 1 - Avance del Proyecto: Evaluador de Expresiones con Roles y Permisos

## Fecha de entrega: 18 de Junio 2025
## 🎯 Objetivo

Desarrollar la estructura base de la solución, con la base de datos diseñada, lógica de roles y permisos funcional, y un evaluador inicial de expresiones aritméticas. El sistema debe permitir iniciar sesión como usuario, y mostrar un menú de opciones en consola según sus permisos.

---

## Contenido del Entregable

### 1. 🔐 Roles y Permisos

| Rol      | Permisos otorgados               | Límite de operaciones por día |
|----------|----------------------------------|-------------------------------|
| Admin    | Evaluar_Aritmetica, Evaluar_Booleana | Ilimitado                |
| Estándar | Uno o ambos (según configuración)    | 10 operaciones           |
| Invitado | Uno o ambos (según configuración)    | 5 operaciones            |

---

### 2. ⚙️ Lógica de Login y Menú con `prompt-sync`

#### Requisitos:

- Al ejecutar el programa, debe pedir usuario y contraseña.
- Luego de validar credenciales, debe consultar los **permisos asignados al usuario** (a través de roles).
- Según los permisos, se debe mostrar un menú:

```plaintext
Bienvenido, berny.cardona!

Menú de opciones disponibles:
1. Evaluar expresión aritmética
2. Evaluar expresión booleana
0. Salir

Seleccione una opción:
```

Si el usuario solo tiene permiso `Evaluar_Aritmetica`, debe ver:

```plaintext
Menú de opciones disponibles:
1. Evaluar expresión aritmética
0. Salir
```

---

### 5. 📄 Documentación a entregar

Entregar un documento `README.md` o PDF que contenga:

- Diagrama ER que tienen a la fecha
- Scripts SQL de creación de tablas
- Capturas de pantalla del login y menú
- Descripción de cómo se manejan roles y permisos
- Explicación del flujo general del programa

---

## 📌 Notas Finales

- Usar Node.js, pero el menú debe funcionar en consola.
- Se valorará el código limpio, claro y comentado.
