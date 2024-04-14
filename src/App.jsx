import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer";
import Header from "./components/header";
import StudentsList from "./components/students/StudentsList";
import StudentsFormCreate from "./components/students/StudentsFormCreate";
import StudentsFormEdit from "./components/students/StudentsFormEdit";

import BooksList from "./components/books/BooksList";
import BooksFormCreate from "./components/books/BooksFormCreate";
import BooksFormEdit from "./components/books/BooksFormEdit";

import LoansList from "./components/loans/LoansList";
import LoansFormCreate from "./components/loans/LoansFormCreate";
import LoansFormEdit from "./components/loans/LoansFormEdit";


function App() {


  return (
    <>      
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/student" element={<StudentsList />} />
          <Route path="/student/:id" element={<StudentsFormEdit />} />
          <Route path="/create-student" element={<StudentsFormCreate />} />

          <Route path="/books" element={<BooksList />} />
          <Route path="/book/:id" element={<BooksFormEdit />} />
          <Route path="/create-book" element={<BooksFormCreate />} />

          <Route path="/loans" element={<LoansList />} />
          <Route path="/loan/:id" element={<LoansFormEdit />} />
          <Route path="/create-loan" element={<LoansFormCreate />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
