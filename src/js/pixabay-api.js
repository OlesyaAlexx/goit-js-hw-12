/* const API key = 43954842-86e0551d49d52b31999082e7b; */
import axios from 'axios';

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PER_PAGE = 15;
  }

  //Метод класу який здійснює асинхронний запит до API Pixabay для отримання фотографій
  async fetchPhoto() {
    console.log(this);

    //Фурмуємо параметри запиту
    const axiosOp = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '43954842-86e0551d49d52b31999082e7b',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        q: this.searchQuery,
        page: this.page,
        per_page: this.PER_PAGE,
      },
    };
    try {
      const response = await axios(axiosOp); //Виконується запит до API за допомогою axios(axiosOp)
      const data = response.data; // Отримуємо дані з відповіді
      this.incrementPage();
      return data;
    } catch (error) {
      throw new Error('Error fetching data from Pixabay API:', error); //Якщо під час виконання запиту виникає помилка, вона ловиться і кидається нова помилка з повідомленням про проблему.
    }
  }

  // Метод класу збільшує сторінку на 1
  incrementPage() {
    this.page += 1;
  }

  //Метод класу що скидає сторінку до 1
  resetPage() {
    this.page = 1;
  }

  //Метод класу Геттер query дозволяє отримати значення властивості searchQuery
  get query() {
    return this.searchQuery;
  }

  //Метод класу Сетер query який дозволяє перезаписати значення властивості searchQuery
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  //Метод класу який очищає вміст властивості searchQuery
  reset() {
    this.searchQuery = '';
  }
}
