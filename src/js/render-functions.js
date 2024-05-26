// Імпортуємо SimpleLightbox
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

//Створюємо новий екземпляр бібліотеки
let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

//Створюємо фннкцію для розмітки карток галереї
export function onRenderGallery(elements, galleryContainer) {
  if (!galleryContainer) {
    console.error('Gallery container is undefined'); // Перевіряємо чи обєкт передано, якщо ні, то виводиться помилка
    return;
  }

  //Формуємо розмітку для елементів галереї
  const markup = elements
    .map(
      //використовуємо метод map для перетворення кожного елементу з масиву elements у HTML-розмітку
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a href="${largeImageURL}">
      <img class="photo-img" src="${webformatURL}" alt="${tags}" />
    </a>
    <ul class="info-list">
      <li class="info-item">
        <b>Likes</b>
        ${likes}
      </li>
      <li class="info-item">
        <b>Views</b>
        ${views}
      </li>
      <li class="info-item">
        <b>Comments</b>
        ${comments}
      </li>
      <li class="info-item">
        <b>Downloads</b>
        ${downloads}
      </li>
    </ul>
    </div>`;
      }
    )
    .join(''); // Метод join з'єднує всі отримані рядки в один великий рядок HTML.
  galleryContainer.insertAdjacentHTML('beforeend', markup); //Додаємо розмітку в кінець контейнера галереї, використовуючи метод insertAdjacentHTML.
  lightbox.refresh(); //Оновлюємо галерею
  console.log(galleryContainer);
}
