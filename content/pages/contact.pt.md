+++
title = "Contato"
description = "Para entrar em contato conosco, por favor, use o formulário de contato nesta página."
path = "pt/contact"
template = "pages.html"
draft = false
+++

<p>Quer entrar em contato? Preencha o formulário abaixo para me enviar uma mensagem e eu entrarei em contato com você o mais rápido possível!</p>
<form name="contact" method="POST">
  <p>
    <label for="name">Nome</label>
    <input type="text" placeholder="Nome" id="name" required data-validation-required-message="Por favor, digite seu nome." />
  </p>
  <p>
    <label for="email">Endereço de Email</label>
    <input type="email" placeholder="nome@ejemplo.com" id="email" required data-validation-required-message="Por favor, digite seu endereço de email." />
  </p>
  <p>
    <label for="message">Mensagem</label>
    <textarea rows="5" placeholder="Mensagem" id="message" required data-validation-required-message="Por favor, digite uma mensagem."></textarea>
  </p>
  <div id="success"></div>
  <p>
    <button type="submit" id="sendMessageButton">Enviar</button>
  </p>
</form>
