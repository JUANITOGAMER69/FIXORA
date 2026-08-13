# PROMPT PARA FIGMA AI – FIXORA (Frontend Completo Compatible con Backend Node.js + Express + MongoDB)

## Contexto

Diseña el **frontend completo** de una plataforma web llamada **Fixora**, un sistema que conecta clientes con técnicos especializados para solicitar servicios de reparación.

No quiero únicamente un diseño bonito; quiero un **frontend profesional, moderno, funcional, interactivo y completamente preparado para implementarse en React**, conectado posteriormente a un backend desarrollado con:

* Node.js
* Express.js
* MongoDB Atlas
* API REST
* JWT Authentication
* Axios
* React Router DOM
* React Hook Form
* TanStack Query
* Tailwind CSS

Todo el diseño debe estar pensado para consumir datos desde una API REST.

No quiero únicamente pantallas; quiero un **producto SaaS completo**, listo para convertirse en código.

---

# Objetivo

Crear un frontend completamente funcional y preparado para integrarse directamente con el backend existente.

El diseño debe ser:

* Moderno
* Escalable
* Profesional
* Responsive
* Accesible (WCAG)
* Fácil de convertir a React
* Optimizado para UX/UI

No utilizar información hardcodeada.

No utilizar datos de prueba.

No inventar usuarios.

No inventar comentarios.

No inventar estadísticas.

Todo debe utilizar placeholders preparados para consumir datos desde MongoDB mediante la API REST.

---

# Arquitectura de la Plataforma

La plataforma tendrá **dos experiencias completamente independientes**, compartiendo únicamente la identidad visual y el Design System.

## Flujo Cliente

Landing Principal

↓

Registro Cliente

↓

Inicio de Sesión Cliente

↓

Dashboard Cliente

---

## Flujo Técnico

Landing para Técnicos

↓

Registro Técnico

↓

Inicio de Sesión Técnico

↓

Dashboard Técnico

---

Los dos flujos deben compartir únicamente los componentes visuales (botones, inputs, tipografía, colores, iconografía, etc.).

No deben compartir pantallas de autenticación.

Cada flujo debe tener navegación propia.

---

# Acceso para Técnicos

En la Landing Principal debe existir un botón visible en el Navbar y otro en el Hero que diga:

## **¿Eres técnico?**

Al hacer clic debe dirigir a una Landing completamente distinta enfocada únicamente en técnicos.

La navegación debe ser:

```text
Landing Principal
│
├── Iniciar Sesión (Cliente)
├── Registrarse (Cliente)
└── ¿Eres Técnico?
        │
        ▼
Landing para Técnicos
│
├── Iniciar Sesión Técnico
└── Registrarme como Técnico
```

---

# LANDING PRINCIPAL (CLIENTES)

Esta Landing está enfocada a personas que necesitan contratar un técnico.

Debe transmitir:

* Confianza
* Tecnología
* Seguridad
* Rapidez
* Profesionalismo

Utilizar ilustraciones modernas.

No utilizar fotografías.

---

## Navbar

Logo Fixora

Inicio

Cómo funciona

Servicios

Beneficios

Contacto

Botón:

Iniciar Sesión

Botón:

Registrarse

Botón destacado:

¿Eres Técnico?

Sticky.

Responsive.

Menú hamburguesa.

---

## Hero

Título principal impactante.

Subtítulo.

Botón:

Buscar Técnico

Botón:

Crear Cuenta

Botón secundario:

¿Eres Técnico?

Ilustración moderna.

---

## Cómo funciona

3 pasos ilustrados.

1. Crea tu cuenta.

2. Busca un técnico.

3. Solicita un servicio.

---

## Beneficios

Tarjetas con iconografía.

* Técnicos verificados
* Respuesta rápida
* Calificaciones
* Seguridad
* Historial
* Seguimiento de solicitudes

---

## Categorías

Grid preparado para API.

* Electricista
* Plomero
* Carpintero
* Pintor
* Computadoras
* Celulares
* Electrodomésticos
* Aire acondicionado

---

## Opiniones

Diseñar únicamente el componente.

Preparado para consumir datos dinámicos.

No colocar testimonios reales.

---

## CTA

¿Necesitas ayuda?

Encuentra al mejor técnico en minutos.

Botón:

Buscar Técnico

---

## Footer

Contacto

Redes Sociales

Aviso de privacidad

Términos y condiciones

---

# LOGIN CLIENTE

Preparado para consumir:

POST /api/auth/login

Campos:

Correo

Contraseña

Mostrar contraseña

Recordarme

¿Olvidaste tu contraseña?

Botón:

Iniciar Sesión

Preparar estados:

Loading

Error

Credenciales incorrectas

Token recibido

Redirección automática

---

# REGISTRO CLIENTE

Preparado para:

POST /api/auth/register

Campos:

Nombre

Apellido paterno

Apellido materno

Correo

Teléfono

Contraseña

Confirmar contraseña

Aceptar términos

Botón:

Registrarme

Validaciones visuales.

Errores por campo.

Indicador de contraseña segura.

---

# DASHBOARD CLIENTE

Sidebar responsive.

Inicio

Buscar Técnicos

Mis Solicitudes

Perfil

Configuración

Cerrar Sesión

---

# BUSCAR TÉCNICOS

Marketplace moderno.

Buscador.

Filtros.

Especialidad

Calificación

Ubicación

Disponibilidad

Tarjetas preparadas para recibir:

Foto

Nombre

Especialidad

Experiencia

Calificación

Botón:

Ver Perfil

Botón:

Solicitar Servicio

No colocar datos de ejemplo.

---

# PERFIL DEL TÉCNICO

Preparado para consumir:

GET /api/tecnicos/:id

Mostrar:

Foto

Nombre

Especialidad

Descripción

Experiencia

Servicios

Disponibilidad

Calificación

Comentarios

Botón:

Solicitar Servicio

---

# SOLICITAR SERVICIO

Preparado para:

POST /api/solicitudes

Formulario:

Especialidad

Descripción

Fecha

Hora

Dirección

Botón:

Enviar Solicitud

Preparar estados:

Loading

Éxito

Error

---

# MIS SOLICITUDES

Tabla responsive.

Preparada para:

GET /api/solicitudes

Estados:

Pendiente

Aceptada

En proceso

Finalizada

Cancelada

Botón:

Ver detalle

Botón:

Cancelar

---

# PERFIL CLIENTE

Preparado para:

GET /api/usuarios/perfil

PUT /api/usuarios/perfil

Campos:

Nombre

Correo

Teléfono

Foto

Cambiar contraseña

Guardar cambios

---

# LANDING PARA TÉCNICOS

Esta Landing debe ser completamente diferente.

Debe convencer a profesionales para unirse a Fixora.

Transmitir:

* Más clientes
* Más ingresos
* Profesionalismo
* Organización
* Crecimiento laboral
* Confianza

No reutilizar el diseño del cliente.

---

## Navbar

Logo Fixora

Inicio

Beneficios

Cómo funciona

Preguntas frecuentes

Contacto

Botón:

Iniciar Sesión

Botón:

Registrarme como Técnico

---

## Hero

Título:

## Haz crecer tu trabajo con Fixora

Subtítulo:

Conecta con cientos de clientes, administra tus trabajos y organiza tu agenda desde un solo lugar.

Botón principal:

Registrarme como Técnico

Botón secundario:

Iniciar Sesión

Ilustración moderna relacionada con técnicos trabajando.

---

## Beneficios

Tarjetas.

* Consigue más clientes
* Administra tus trabajos
* Calendario inteligente
* Incrementa tus ingresos
* Calificaciones de clientes
* Gestiona tu disponibilidad

---

## Cómo funciona

1. Regístrate.

2. Completa tu perfil.

3. Recibe solicitudes.

4. Acepta trabajos.

5. Finaliza servicios.

---

## Estadísticas

Preparadas para API.

No colocar números reales.

Placeholders.

* Técnicos registrados
* Servicios completados
* Clientes satisfechos
* Calificación promedio

---

## Preguntas Frecuentes

Acordeones preparados para contenido dinámico.

---

## CTA

Empieza hoy mismo a conseguir más clientes.

Botón:

Crear Cuenta

---

## Footer

Contacto

Redes Sociales

Políticas

Términos

---

# REGISTRO TÉCNICO

Preparado para:

POST /api/tecnicos/register

Campos:

Nombre

Apellido paterno

Apellido materno

Correo

Teléfono

Especialidad

Años de experiencia

Descripción profesional

Estado

Ciudad

Contraseña

Confirmar contraseña

Aceptar términos

Botón:

Registrarme

Preparar:

Validaciones

Loading

Errores

Éxito

Indicador de contraseña

---

# LOGIN TÉCNICO

Preparado para:

POST /api/tecnicos/login

Campos:

Correo

Contraseña

Mostrar contraseña

Recordarme

¿Olvidaste tu contraseña?

Botón:

Iniciar Sesión

Preparar:

Loading

Error

Credenciales incorrectas

JWT recibido

Redirección automática

---

# DASHBOARD TÉCNICO

Diseñado para productividad.

Sidebar.

Inicio

Calendario

Solicitudes

Trabajos

Historial

Perfil

Configuración

Cerrar Sesión

---

## Calendario

Vista semanal.

Vista mensual.

Trabajos programados.

Disponibilidad.

Preparado para consumir eventos desde la API.

---

## Trabajos

Pendientes

Aceptados

En proceso

Finalizados

Cancelados

Ver detalle

---

## Perfil Técnico

Preparado para editar.

Especialidades

Experiencia

Descripción

Foto

Disponibilidad

Certificaciones

Guardar cambios

---

# DESIGN SYSTEM

Crear un sistema completo.

Colores.

Tipografía.

Grid.

Espaciado.

Sombras.

Bordes.

Botones.

Inputs.

Textarea.

Select.

Checkbox.

Radio.

Cards.

Badges.

Tabs.

Tables.

Modales.

Drawer.

Navbar.

Sidebar.

Footer.

Breadcrumb.

Toast.

Alertas.

Skeleton Loading.

Estados vacíos.

Estados de error.

Estados de carga.

Estados de éxito.

Componentes reutilizables.

Crear variantes para todos los componentes.

Utilizar Auto Layout en absolutamente todos los elementos.

Nombrar correctamente todos los componentes.

---

# RESPONSIVE

Diseñar versiones para:

Desktop

Laptop

Tablet

Mobile

Todo debe adaptarse correctamente sin perder funcionalidad.

---

# UX/UI

Aplicar principios de:

* WCAG
* Responsive Design
* UX Writing
* Jerarquía Visual
* Consistencia
* Microinteracciones
* Animaciones suaves
* Feedback inmediato
* Navegación intuitiva
* Estados Hover
* Estados Focus
* Estados Disabled
* Estados Loading
* Estados Error
* Estados Success

---

# PREPARADO PARA REACT

Diseñar pensando en componentes React.

Separar correctamente:

Layouts

Pages

Components

UI Components

Forms

Modals

Tables

Cards

Sidebars

Headers

Footers

Todo debe poder implementarse fácilmente usando:

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Hook Form
* TanStack Query

---

# COMPATIBILIDAD CON EL BACKEND

Todo el frontend debe estar diseñado para integrarse directamente con un backend desarrollado en:

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* API REST

Todos los formularios deben corresponder a endpoints REST.

No utilizar datos estáticos.

No utilizar información hardcodeada.

Todos los componentes deben estar preparados para consumir información dinámica desde la API.

Preparar:

* Estados de carga
* Validaciones del servidor
* Mensajes de éxito
* Mensajes de error
* Listas vacías
* Sin resultados
* Errores 401
* Errores 403
* Errores 404
* Errores 500

El resultado debe verse como una aplicación **SaaS profesional de nivel empresarial**, completamente funcional, interactiva, escalable y lista para convertirse en un proyecto real sin necesidad de rediseñar ninguna pantalla.

# PROTOTIPO INTERACTIVO

No generar únicamente pantallas estáticas.

Generar un prototipo navegable en Figma con:

* Navegación entre todas las vistas.
* Transiciones entre pantallas.
* Estados hover.
* Estados focus.
* Estados pressed.
* Animaciones suaves.
* Apertura y cierre de menús.
* Modales.
* Drawer lateral.
* Menú hamburguesa responsive.
* Sidebar colapsable.
* Formularios con estados de error y éxito.
* Skeleton Loading.
* Empty States.
* Confirmaciones.
* Flujo completo de Cliente.
* Flujo completo de Técnico.

El resultado debe parecer una aplicación real lista para desarrollo, manteniendo una arquitectura clara, un Design System consistente y una experiencia de usuario profesional que facilite su implementación directa en React y su integración con el backend existente.
