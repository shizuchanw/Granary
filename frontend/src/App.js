import "./App.css";
import "./bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import ArticlePage from "./pages/ArticlePage";
import SearchResultPage from "./pages/SearchResultPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import AuthorPage from "./pages/AuthorPage";
import ArticleForm from "./pages/dashboard/ArticleForm";
import MyArticlesPage from "./pages/dashboard/MyArticles";
import LikedArticlePage from "./pages/dashboard/LikedArticlePage";
import { ArticleProvider } from "./contexts/ArticleContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/tag/:tagType/:tag" element={<SearchResultPage />} />
          <Route
            path="/article/:id"
            element={
              <ArticleProvider>
                <ArticlePage />
              </ArticleProvider>
            }
          />
          <Route path="/author/:authorID" element={<AuthorPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/my-articles" element={<MyArticlesPage />} />
          <Route
            path="/dashboard/liked"
            element={<LikedArticlePage liked={true} />}
          />
          <Route
            path="/dashboard/bookmarked"
            element={<LikedArticlePage liked={false} />}
          />
          <Route path="/dashboard/new" element={<ArticleForm />} />
          <Route path="/dashboard/edit/:articleID" element={<ArticleForm />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
