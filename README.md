# Cantú Asesores (sitio estático)

Sitio multi-página listo para GitHub Pages.

## 1) Personaliza lo básico (2 minutos)

Abre `assets/app.js` y cambia:

- `advisorName`
- `city`
- `email`
- `whatsappNumber` (formato recomendado: 5218112345678)
- `bookingUrl` (Calendly o Google Appointment Schedule)

## 2) Publicar en GitHub Pages

1. Crea un repo (por ejemplo `cantu-asesores`).
2. Sube todos estos archivos a la raíz del repo.
3. En GitHub: Settings -> Pages -> Deploy from branch -> selecciona `main` y `/root`.

## 3) Dominio propio (opcional)

En GitHub Pages agrega tu dominio en Settings -> Pages, y crea el archivo `CNAME` (GitHub te guía).

---

> Nota: El ticker de índices usa el widget Ticker Tape de TradingView. Puedes editar los símbolos en `assets/app.js` dentro de `loadTicker()`.
