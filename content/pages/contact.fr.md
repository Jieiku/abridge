+++
title = "Contact"
description = "Pour nous joindre, veuillez utiliser le formulaire de contact sur cette page."
path = "fr/contact"
template = "pages.html"
draft = false
+++

<p>Vous voulez entrer en contact ? Remplissez le formulaire ci-dessous pour m'envoyer un message et je vous répondrai dans les plus brefs délais !</p>
<form name="contact" method="POST">
  <p>
    <label for="name">Nom</label>
    <input type="text" placeholder="Nom" id="name" required data-validation-required-message="S'il vous plaît entrez votre nom." />
  </p>
  <p>
    <label for="email">Adresse e-mail</label>
    <input type="email" placeholder="nom@example.com" id="email" required data-validation-required-message="Veuillez saisir votre adresse e-mail." />
  </p>
  <p>
    <label for="message">Message</label>
    <textarea rows="5" placeholder="Message" id="message" required data-validation-required-message="Veuillez entrer un message."></textarea>
  </p>
  <div id="success"></div>
  <p>
    <button type="submit" id="sendMessageButton">Envoyer</button>
  </p>
</form>
