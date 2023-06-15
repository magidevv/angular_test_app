import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  amount: number = 0; // Значення кількості одиниц для конвертації
  currency1: string = 'UAH'; // Перша валюта
  currency2: string = 'USD'; // Друга валюта
  conversionRates: any; // Об'єкт з курсами обміну валют
  convertedAmount: number = 0; // Конвертована сума

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchConversionRates(); // Отримати курси обміну при завантаженні компонента
  }

  fetchConversionRates() {
    this.http
      .get<any>('https://open.er-api.com/v6/latest/UAH') // Виконати GET-запит до зовнішнього API
      .subscribe((data) => {
        this.conversionRates = data; // Зберегти отримані курси обміну
        this.convertCurrency(); // Викликати функцію конвертації
      });
  }

  convertCurrency() {
    const rate = this.conversionRates[this.currency1][this.currency2]; // Отримати курс обміну між валютами
    this.convertedAmount = this.amount * rate; // Обчислити конвертовану суму
  }
}
