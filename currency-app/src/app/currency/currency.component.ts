import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency',
  template: `
    <h1>Exchange Rate:</h1>
    <p>USD to UAH: {{ usdExchangeRate }}</p>
    <p>EUR to UAH: {{ eurExchangeRate }}</p>
  `,
})
export class CurrencyComponent implements OnInit {
  usdExchangeRate: number; // Змінна для збереження курсу долара до гривні
  eurExchangeRate: number; // Змінна для збереження курсу євро до гривні

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getExchangeRates(); // Виклик функції отримання курсів валют
  }

  getExchangeRates() {
    const url = '';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.usdExchangeRate = data.rates.USD; // Зберігаємо курс долара до гривні
        this.eurExchangeRate = data.rates.EUR; // Зберігаємо курс євро до гривні
      })
      .catch((error) => {
        console.log('Помилка при отриманні курсу валют:', error);
      });
  }
}
