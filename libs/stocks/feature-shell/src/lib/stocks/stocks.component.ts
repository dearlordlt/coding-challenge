import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
  providers: [DatePipe]
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  today: string;

  quotes$ = this.priceQuery.priceQueries$;

  pickerDates = {
    minDateFrom: '',
    maxDateFrom: '',
    minDateTo: '',
    maxDateTo: '',
  }

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade, private datePipe: DatePipe) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.today = this.formatDate(new Date());
    this.pickerDates.maxDateFrom = this.today;
    this.pickerDates.maxDateTo = this.today;
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const symbol = this.stockPickerForm.value.symbol;
      this.priceQuery.fetchQuote(symbol, 'max');
    }
  }

  updateDates($event) {
    this.pickerDates.maxDateFrom = this.stockPickerForm.value.toDate;
    this.pickerDates.minDateTo = this.stockPickerForm.value.fromDate;
  }

  formatDate(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
