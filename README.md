# Fullstack AI Tagging

API y aplicación Fullstack para análisis y etiquetado de imágenes usando IA.

---

## 🧠 Descripción general

Este proyecto expone una API REST construida con **Node.js + Fastify** para procesar imágenes enviadas vía **multipart/form-data** y devolver etiquetas inferidas con su nivel de confianza.

El frontend permite:

- Subir una imagen
- Ejecutar el análisis
- Visualizar los resultados de forma clara

La arquitectura está preparada para:

- Integrar modelos reales de IA (Vision APIs, ML models)
- Escalar validaciones, contratos y tests
- Separar responsabilidades (routes, services, schemas)

---

## 🛠️ Tecnologías utilizadas

### Backend
- Node.js 20+
- Fastify
- TypeScript
- Zod (validaciones)
- Fastify Multipart
- Vitest + Supertest (tests de integración)
- npm workspaces

### Frontend
- React
- Vite
- TypeScript
- Fetch API
- CSS modular

---

## 📁 Estructura del proyecto

fullstack-ai-tagging/
│
├── apps/
│ ├── api/ # Backend Fastify
│ │ ├── src/
│ │ │ ├── routes/ # Endpoints (health, analyze)
│ │ │ ├── services/ # Lógica de negocio (tagging)
│ │ │ ├── schemas/ # Validaciones Zod
│ │ │ ├── plugins/ # Plugins Fastify
│ │ │ ├── app.ts
│ │ │ └── server.ts
│ │ └── test/ # Tests de integración
│ │
│ └── web/ # Frontend React + Vite
│ ├── src/
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ └── assets/
│ └── vite.config.ts
│
├── package.json # Configuración workspaces
├── package-lock.json
├── .nvmrc # Versión de Node recomendada
└── README.md


---

## 🚀 Instalación y ejecución

### 1️⃣ Requisitos

- Node.js 20+
- npm 10+

Se recomienda usar **nvm**:

```bash
nvm install 20
nvm use 20

2️⃣ Clonar el repositorio
git clone https://github.com/leyla-goyeneche/fullstack-ai-tagging.git
cd fullstack-ai-tagging

3️⃣ Instalar dependencias
npm install

▶️ Ejecución en desarrollo
Backend (API)
npm run dev:api


API disponible en:
👉 http://localhost:3000

Frontend (Web)
npm run dev:web


Frontend disponible en:
👉 http://localhost:5173

📡 Endpoints disponibles
Health Check

GET /health

{
  "status": "ok"
}

Analizar imagen

POST /api/analyze

Headers

Content-Type: multipart/form-data


Body

image: archivo PNG / JPEG / WEBP


Response

{
  "tags": [
    {
      "label": "Unknown",
      "confidence": 0.5
    }
  ],
  "meta": {
    "filename": "foto.png",
    "size": 2955,
    "mime": "image/png"
  }
}

❌ Errores posibles
Código	Descripción
400	Archivo no enviado
415	Tipo de archivo no soportado
🧪 Tests
Backend (tests de integración)
npm run test:api


Incluye:

Health check

Validación sin archivo

Validación de mimetype

Flujo exitoso con imagen válida

🧩 Decisiones técnicas destacadas

Fastify por performance y tipado

Zod para contratos claros y seguros

Separación de capas (routes / services)

Tests reales de API (sin mocks innecesarios)

Monorepo con workspaces para escalar frontend/backend

👩‍💻 Autora

Leyla Goyeneche
Fullstack Developer | Backend-focused
Node.js · Java · Arquitectura · Testing · APIs

📄 Licencia

MIT