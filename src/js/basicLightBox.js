import * as basicLightbox from 'basiclightbox';

export default function appendModalImage(modalImage) {
  const instance = basicLightbox.create(`
      <img src=${modalImage} width="800" height="600">
  `);
  instance.show();
}
