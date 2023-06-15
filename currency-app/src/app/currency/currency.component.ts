import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent implements OnInit {
  usdExchangeRate!: string; // Змінна для збереження курсу долара до гривні
  eurExchangeRate!: string; // Змінна для збереження курсу євро до гривні

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getExchangeRates(); // Виклик функції отримання курсів валют
  }

  getExchangeRates() {
    const url = 'https://open.er-api.com/v6/latest/UAH';

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.usdExchangeRate = (1 / data.rates.USD).toFixed(2); // Зберігаємо курс долара до гривні
        this.eurExchangeRate = (1 / data.rates.EUR).toFixed(2); // Зберігаємо курс євро до гривні
      })
      .catch((error) => {
        console.log('Помилка при отриманні курсу валют:', error);
      });
  }
}
