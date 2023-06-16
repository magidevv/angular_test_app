import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css'],
})
export class CurrencyConverterComponent implements OnInit {
  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'UAH';
  currency2: string = 'USD';
  conversionRates: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getConversionRates();
  }

  // Отримання курсів конвертації при ініціалізації компонента
  getConversionRates() {
    const url = 'https://open.er-api.com/v6/latest/UAH';
    this.http.get(url).subscribe(
      (data: any) => {
        this.conversionRates = data.rates;
        this.convertCurrencies1(); // Перерахунок значення amount2
        this.convertCurrencies2(); // Перерахунок значення amount1
      },
      (error: any) => {
        console.log('Failed to fetch conversion rates:', error);
      }
    );
  }

  // Перерахунок значення amount2 на основі amount1
  convertCurrencies1() {
    const rate1 = this.conversionRates[this.currency1];
    const rate2 = this.conversionRates[this.currency2];

    if (rate1 && rate2) {
      this.amount2 = Number(((this.amount1 / rate1) * rate2).toFixed(2));
    } else {
      console.log('Invalid conversion rates');
    }
  }

  // Перерахунок значення amount1 на основі amount2
  convertCurrencies2() {
    const rate1 = this.conversionRates[this.currency1];
    const rate2 = this.conversionRates[this.currency2];

    if (rate1 && rate2) {
      this.amount1 = Number(((this.amount2 / rate2) * rate1).toFixed(2));
    } else {
      console.log('Invalid conversion rates');
    }
  }

  // Обмін валют
  swapCurrencies() {
    const tempCurrency = this.currency1;
    this.currency1 = this.currency2;
    this.currency2 = tempCurrency;
    this.convertCurrencies1(); // Перерахунок значення amount2
    this.convertCurrencies2(); // Перерахунок значення amount1
  }
}
