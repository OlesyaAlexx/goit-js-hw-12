import './css/styles.css';
import PixabayApi from './js/pixabay-api';
import { onRenderGallery } from './js/render-functions';
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

//Щголошуємо refs, та отримуємо доступ до елементів
const refs = {
  searchform: document.querySelector('.search-form'),
  galleryConteiner: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

//Створюємо новий екземпляр класу
const pixabayApi = new PixabayApi();

//Встановлюємо прослуховувач події на форму
refs.searchform.addEventListener('submit', onSearch);

//Функція виконує пошук зображень на основі введеного запиту
function onSearch(event) {
  event.preventDefault(); // щоб не відбувалось перезавантаження сторінка після відправлення фформи

  //Отримання та обробка запиту і очищення його від пробілів
  const query = event.currentTarget.elements.query.value.trim();
  if (!query) {
    return showToast('red', 'Please, fill the main field', 'topRight'); //Якщо запит порожній зявляється повідомлення про необхідність заповнити поле, і функція завершується.
  }

  //Функція для підготовки виконання пошуку
  showLoader();
  refs.galleryConteiner.innerHTML = ''; //Очищується контейнер галереї
  pixabayApi.query = query; // задається новий пошуковий запит

  //Викликається метод fetchPhoto для отримання фотографій з Pixabay API
  pixabayApi
    .fetchPhoto()
    .then(data => {
      //Перевіряємо кількість отриманих результатів
      if (data.hits.length === 0) {
        //Якщо результатів немає, зявляється повідомлення про відсутність збігів
        showToast(
          'red',
          'Sorry, there are no images matching your search query. Please try again!',
          'topRight'
        );
      } else {
        //Якщо результати є, викликається функція onRenderGallery для рендерингу отриманих фотографій у контейнер галереї.
        onRenderGallery(data.hits, refs.galleryConteiner);
      }
    })
    //Якщо запит не вдалий, в консоль виводиться повідомлення про помилку
    .catch(error => {
      console.error('Error:', error);
      showToast(
        'red',
        'An error occurred while fetching images. Please try again later.',
        'topRight'
      );
    })
    //У finally приховується індикатор завантаження і очищується форма пошуку.
    .finally(() => {
      hideLoader();
      refs.searchform.reset(); // Очищуємо поле вводу
    });

  //Викликається метод reset для скидання параметрів API
  pixabayApi.reset();
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
