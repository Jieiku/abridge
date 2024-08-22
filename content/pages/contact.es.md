+++
title = "Contacto"
description = "Para ponerse en contacto con nosotros, utilice el formulario de contacto de esta página."
path = "es/contact"
template = "pages.html"
draft = false
+++

<p>¿Querés ponerte en contacto? ¡Rellená el siguiente formulario para enviarme un mensaje y me pondré en contacto contigo lo antes posible!</p>
<form name="contact" method="POST">
  <p>
    <label for="name">Nombre</label>
    <input type="text" placeholder="Nombre" id="name" required data-validation-required-message="Por favor ingrese su nombre." />
  </p>
  <p>
    <label for="email">Dirección de Email</label>
    <input type="email" placeholder="nombre@ejemplo.com" id="email" required data-validation-required-message="Por favor ingrese su dirección de email." />
  </p>
  <p>
    <label for="message">Mensaje</label>
    <textarea rows="5" placeholder="Mensaje" id="message" required data-validation-required-message="Por favor ingrese un mensaje."></textarea>
  </p>
  <div id="success"></div>
  <p>
    <button type="submit" id="sendMessageButton">Enviar</button>
  </p>
</form>
