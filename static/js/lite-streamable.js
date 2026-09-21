(() => {
'use strict';
/* Abridge lite Streamable embed, modeled after the vendored lite-vimeo component. */
class LiteStreamableEmbed extends HTMLElement {
  iframeLoaded = false;
  domRefFrame;
  domRefPlayButton;

  constructor() {
    super();
    this.setupDom();
  }

  static get observedAttributes() { return ['videoid']; }

  connectedCallback() {
    this.setupComponent();
    this.addEventListener('pointerover', LiteStreamableEmbed.warmConnections, { once: true });
    this.addEventListener('click', () => this.addIframe());
  }

  get videoId() { return encodeURIComponent(this.getAttribute('videoid') || ''); }
  set videoId(id) { this.setAttribute('videoid', id); }
  get videoTitle() { return this.getAttribute('videotitle') || 'Streamable video'; }
  set videoTitle(title) { this.setAttribute('videotitle', title); }
  get videoPlay() { return this.getAttribute('videoplay') || 'Play'; }
  set videoPlay(name) { this.setAttribute('videoplay', name); }

  setupDom() {
    const shadowDom = this.attachShadow({ mode: 'open' });
    const css = `
      :host { contain: content; display: block; position: relative; width: 100%; padding-bottom: calc(100% / (16 / 9)); }
      #frame, iframe { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
      picture { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; }
      #frame { cursor: pointer; background: #000; }
      slot[name=image]::slotted(*) { display: block; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
      .ls-playbtn { width: 70px; height: 46px; background: #212121; z-index: 1; opacity: .8; border-radius: 10%; transition: all .2s cubic-bezier(0,0,.2,1); border: 0; cursor: pointer; }
      #frame:hover .ls-playbtn { background: #0f90fa; opacity: 1; }
      .ls-playbtn:before { content: ''; border-style: solid; border-width: 11px 0 11px 19px; border-color: transparent transparent transparent #fff; }
      .ls-playbtn, .ls-playbtn:before { position: absolute; top: 50%; left: 50%; transform: translate3d(-50%,-50%,0); }
      .ls-activated { cursor: unset; }
      .ls-activated .ls-playbtn, .ls-activated picture { display: none; }
      .ls-activated iframe { display: block; }
    `;
    if ('adoptedStyleSheets' in shadowDom && 'replaceSync' in CSSStyleSheet.prototype) {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(css);
      shadowDom.adoptedStyleSheets = [sheet];
    } else {
      const style = document.createElement('style');
      if (window.liteYouTubeNonce) style.nonce = window.liteYouTubeNonce;
      style.textContent = css;
      shadowDom.append(style);
    }
    const frame = document.createElement('div');
    frame.id = 'frame';

    const picture = document.createElement('picture');
    const imageSlot = document.createElement('slot');
    imageSlot.name = 'image';
    picture.append(imageSlot);

    const playButton = document.createElement('button');
    playButton.className = 'ls-playbtn';

    frame.append(picture, playButton);
    shadowDom.append(frame);
    this.domRefFrame = shadowDom.querySelector('#frame');
    this.domRefPlayButton = shadowDom.querySelector('.ls-playbtn');
  }

  setupComponent() {
    this.domRefPlayButton.setAttribute('aria-label', `${this.videoPlay}: ${this.videoTitle}`);
    this.setAttribute('title', `${this.videoPlay}: ${this.videoTitle}`);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'videoid' && oldVal !== newVal && this.domRefFrame) {
      this.setupComponent();
      const iframe = this.shadowRoot.querySelector('iframe');
      if (iframe) iframe.remove();
      this.domRefFrame.classList.remove('ls-activated');
      this.iframeLoaded = false;
    }
  }

  addIframe() {
    if (this.iframeLoaded || !this.videoId) return;
    const srcUrl = new URL(`https://streamable.com/e/${this.videoId}`);
    srcUrl.searchParams.set('autoplay', '1');
    const iframe = document.createElement('iframe');
    iframe.src = srcUrl.toString();
    iframe.title = this.videoTitle;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    this.domRefFrame.append(iframe);
    this.domRefFrame.classList.add('ls-activated');
    this.iframeLoaded = true;
  }

  static preconnected = false;
  static addPrefetch(kind, url) {
    const link = document.createElement('link');
    link.rel = kind;
    link.href = url;
    link.crossOrigin = 'true';
    document.head.append(link);
  }
  static warmConnections() {
    if (LiteStreamableEmbed.preconnected) return;
    LiteStreamableEmbed.addPrefetch('preconnect', 'https://streamable.com');
    LiteStreamableEmbed.preconnected = true;
  }
}
if (!customElements.get('lite-streamable')) customElements.define('lite-streamable', LiteStreamableEmbed);
})();
