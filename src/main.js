import './css/styles.css';
import PixabayApi from './js/pixabay-api';
import { onRenderGallery } from './js/render-functions';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

//Оголошуємо refs, та отримуємо доступ до елементів
const refs = {
  searchform: document.querySelector('.search-form'),
  galleryConteiner: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

//Створюємо змінну для відображення загальної кількості завантажених фотографій, для початку присвоюємо їй значення 0
let totalHits = 0;
//Створюємо новий екземпляр класу
const pixabayApi = new PixabayApi();

//Встановлюємо прослуховувач події на форму та кнопку
refs.searchform.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

//Створюємо функцію яка виконує пошук зображень на основі введеного запиту
function onSearch(event) {
  event.preventDefault(); // щоб не відбувалось перезавантаження сторінка після відправлення форми

  //Отримання та обробка запиту і очищення його від пробілів
  const query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    return showToast('red', 'Please, fill the main field', 'topRight'); //Якщо запит порожній зявляється повідомлення про необхідність заповнити поле, і функція завершується.
  }

  //Викликаємо функцію для показу індикатора завантаження
  showLoader();
  refs.galleryConteiner.innerHTML = ''; //Очищується контейнер галереї
  pixabayApi.query = query; // задається новий пошуковий запит
  pixabayApi.resetPage(); //викликаємо метод класу до скидає сторінку до 1

  totalHits = 0;
  refs.searchform.reset(); // Очищуємо поле вводу
  onDownloadPhoto(); //Викликаємо асинхронну функцію для завантаженя фото з API Pixabay
}

//Функція для завантаження додаткових зображень з API Pixabay, коли натискається кнопка "Load More"
function onLoadMore() {
  showLoader();
  pixabayApi.incrementPage(); //// Збільшуємо номер сторінки на 1
  onDownloadPhoto(); // Викликаємо функцію для завантаження нових зображень
}

//Створюємо асинхронну функцію для завантаження фотографій з API Pixabay, обробки результатів та оновлення інтерфейсу користувача відповідно до отриманих даних.
async function onDownloadPhoto() {
  showLoader();
  refs.loadMoreBtn.classList.add('is-hidden');

  try {
    const result = await pixabayApi.fetchPhoto(); //Виконується асинхронний запит до API Pixabay для отримання фотографій.
    const { hits, total } = result; //Отримані результати розбиваються на hits (масив фотографій) та total (загальна кількість знайдених фотографій).
    totalHits += hits.length; //totalHits оновлюється для відстеження загальної кількості завантажених фотографій.

    //Якщо фотографії не знайдені, показується повідомлення про відсутність результатів
    if (!hits.length) {
      showToast(
        'red',
        'Sorry, there are no images matching your search query. Please try again.',
        'topRight'
      );
      refs.loadMoreBtn.classList.add('is-hidden'); //Додаємо клас is-hidden до кнопки "Load More" щоб зробити її невидимою
      return;
    }

    onRenderGallery(hits, refs.galleryConteiner); //Викликаємо функцію яка здійснює відображення отриманих фотографій у галереї.

    //Якщо загальна кількість завантажених фотографій менша за загальну кількість знайдених, появляється повідомлення про успішний пошук, і кнопка "Завантажити більше" знову стає видимою.
    if (totalHits < total) {
      showToast('green', `Hooray! We found ${total} images !!!`, 'topRight');
      refs.loadMoreBtn.classList.remove('is-hidden'); //Видаємо клас is-hidden для кнопки Load More щоб зробити її видимою
    }

    //Якщо завантажено всі знайдені фотографії, показується повідомлення про досягнення кінця результатів.
    if (totalHits >= total) {
      showToast(
        'red',
        "We're sorry, but you've reached the end of search results.",
        'topRight'
      );
    }
    scrollPage(); //Викликаємо функцію для плавної прокрутки сторінки
  } catch (error) {
    console.error('Error:', error);
    showToast(
      'red',
      'An error occurred while fetching images. Please try again later.',
      'topRight'
    );
  } finally {
    hideLoader();
    /*  refs.searchform.reset(); // Очищуємо поле вводу */
  }
}

// Функція для плавного прокручування сторінки на дві висоти картки галереї
function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery .photo-card')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// Функція для виведення повідомлення
function showToast(color, message) {
  iziToast.show({
    color: color,
    message: message,
    position: 'topRight',
  });
}
// Функція для  показу індикатора завантаження Loader
function showLoader() {
  refs.loader.style.display = 'block';
}

// Функція для приховування індикатора завантаження Loader
function hideLoader() {
  refs.loader.style.display = 'none';
}
