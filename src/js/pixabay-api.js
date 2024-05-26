/* const API key = 43954842-86e0551d49d52b31999082e7b; */

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
  }

  //Метод класу який здійснює асинхронний запит до API Pixabay для отримання фотографій
  async fetchPhoto() {
    console.log(this);

    //Фурмуємо параметри запиту
    const params = new URLSearchParams({
      key: '43954842-86e0551d49d52b31999082e7b',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      q: this.searchQuery,
    });
    //Створюється URL для запиту
    const url = `https://pixabay.com/api/?${params.toString()}`;

    try {
      const response = await fetch(url); //Виконується запит до API за допомогою fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok'); //Якщо відповідь не успішна виводиться помилка
      }
      const data = await response.json(); // //Якщо відповідь успішна, повертається результат у форматі JSON
      return data;
    } catch (error) {
      throw new Error('Error fetching data from Pixabay API:', error); //Якщо під час виконання запиту виникає помилка, вона ловиться і кидається нова помилка з повідомленням про проблему.
    }
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
