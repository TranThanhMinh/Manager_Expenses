import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { BookState, FloodReports, Data } from '../model/types.d';
import { useState } from 'react';
import Service from '../common/Service';
import {
  district, token, chaWard, list_flood_reports,
  create_reports, get_flood_report_detail, create_reports_sos,
  up_image, street
} from '../common/Api'

//Defining our initialState's type
type initialStateType = {
  bookList: BookState[];
  flood_reports: FloodReports;

};

const bookList: BookState[] = [
  {
    id: '1',
    title: '1984',
    author: 'George Orwell',
  },
  {
    id: '2',
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J. K. Rowling',
  },
  {
    id: '3',
    title: 'The Lord of the Rings',
    author: 'J.R.R Tolkien',
  },
];

const flood_reports: FloodReports = {
  status: '',
  data: []
}

const initialState: initialStateType = {
  bookList, flood_reports
};




export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<BookState>) => {
      state.bookList.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<BookState>) => {
      const {
        payload: { title, id, author },
      } = action;

      state.bookList = state.bookList.map((book) =>
        book.id === id ? { ...book, author, title } : book,
      );
    },
    deleteBook: (state, action: PayloadAction<{ id: string }>) => {
      state.bookList = state.bookList.filter((book) => book.id !== action.payload.id);
    },
    GetFloodReports: (state, action: PayloadAction<any>) => {
      Service.getApi(list_flood_reports).then(data => {
        if (data.status == 'success') {
          state.flood_reports = data
        } else {

        }
      }).catch(message => console.log(message))
    }
  },
});

// export const getFloodReports = createSlice({
//   name: 'flood_reports',
//   initialState,
//   reducers: {
//     GetFloodReports: (state, action: PayloadAction<FloodReports>) => {
//       Service.getApi(list_flood_reports).then(data => {
//         if (action.payload.status == 'success') {
//           state.flood_reports = action.payload

//         } else {

//         }
//       }).catch(message => console.log(message))
//     }
//   },
// });

// To able to use reducers we need to export them.
export const { addNewBook, updateBook, deleteBook, GetFloodReports } = bookSlice.actions;


//Selector to access bookList state.
export const selectBookList = (state: RootState) => state.book.bookList;
//Selector to access bookList state.
export const floodReports = (state: RootState) => state.book.flood_reports;

export default bookSlice.reducer;