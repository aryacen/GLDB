import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Forums from "./pages/Forums";
import Friends from "./pages/Friends";
import WishList from "./pages/Wishlist";
import Find from "./pages/Find";
import ProfilePage from "./pages/ProfilePage"
import ForgotPassword from "./pages/ForgotPassword";
import ResetCodePage from "./pages/ResetCodePage";
import FResetPassword from "./pages/FResetPassword";
import SearchPage from "./pages/SearchPage";
import SignIn from "./pages/SignIn";
import NewPostForm from "./components/NewPostForum";
import PostDetails from "./components/PostDetails";
import Comments from "./components/Comments";
import Payment from "./pages/Payment";
import MovieDetails from "./pages/MovieDetails";
import NewReviewForm from "./components/NewReviewForm";
import WatchTogetherPage from "./pages/WatchTogetherRequestPage";
import EditPassword from "./pages/EditPassword";
import Browse from "./pages/Browse";
import BrowseGenre from "./pages/BrowseGenre";
import UserCalendarPage from "./pages/UserCalendarPage";
import UserReviews from "./pages/UserReviews";
import BannedUsers from "./pages/BannedUsers";
import WatchRequestsListPage from "./pages/WatchRequestsListPage"
console.log("App is running");

const App = () => {
  const callAPI = () => {
    fetch("http://localhost:9000/").then((res) => res.text());
  };

  const { dark } = useContext(AuthContext);
  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
      console.log('IT is dark');
    } else {
      document.body.classList.remove('dark');
      console.log('removed dark mode');
    }
  }, [dark]);

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/wishlist/:id" element={<WishList />} />
          <Route path="/find" element={<Find />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpassword/code" element={<ResetCodePage />} />
          <Route path="/forgotpassword/reset" element={<FResetPassword />} />
          <Route path="/new-post" element={<NewPostForm />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/comments/:postId" element={<Comments />} />
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
          <Route path="/search/:prompt" element={<SearchPage />}></Route>
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/movie/details/:movieId" element={<MovieDetails />}></Route>
          <Route path="/watchtogether/:id" element={<WatchTogetherPage />}></Route>
          <Route path="/review/leaveReview" element={<NewReviewForm />}></Route>
          <Route path="/review/userReviews/:id" element={<UserReviews />}></Route>
          <Route path="/editpassword/:id" element={<EditPassword />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/:genreId" element={<BrowseGenre />} />
          <Route path="/calendar/:id" element={<UserCalendarPage />} />
          <Route path="/bannedusers/:id" element={<BannedUsers />}></Route>
          <Route path="/watchreqlist" element={<WatchRequestsListPage />}></Route>
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
