import React, {Suspense} from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
// import Home from "./pages/Home";
// import ErrorPage404 from "./pages/ErrorPage404";
// import Wallet from "./pages/Wallet";
// import Transactions from "./pages/Transactions";
// import SendMeHu from "./pages/SendMeHu";
import Loading from "./components/UI/Loading";
// import About from "./pages/About";

const About = React.lazy(() => import('./pages/About'));
const SendMeHu = React.lazy(() => import('./pages/SendMeHu'));
const Wallet = React.lazy(() => import('./pages/Wallet'));
const Transactions = React.lazy(() => import('./pages/Transactions'));
const Home = React.lazy(() => import('./pages/Home'));
const ErrorPage404 = React.lazy(() => import('./pages/ErrorPage404'));

/**
 * Note: Hi There, To Understand the blockchain part code there are 4 paths you should look into first:
 * "src/bunzz.js", "src/context/contract-context.js", "src/context/trx-context.js", and
 * "src/components/Action"
 * 
 * Might also want to look at "src/utils", "src/pages" and "backend"
 * 
 * App - Handles Routing with react-router-dom to all pages
 */
const App = () => {

  return (
    <Suspense fallback={<div className={"centered"}>
      <Loading />
    </div>}>
    <Router>
      

      
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />}>
          {/* <Route path="new-user" element={<h1>New user</h1>} /> */}
        </Route>
        <Route path="/about" element={<Navigate replace to="/whats-hu" />} />
        <Route path="/whats-hu" element={<About />} />
        <Route path="/wallet" element={<Wallet />} />

        <Route path="/activity" element={<Navigate replace to="/transactions" />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route path="send-me-hu/share/:shareId/:name" element={<SendMeHu />} />

        <Route path="send-me-hu/share-fixed/:shareId/:name/:amount" element={<SendMeHu withAmount={true} />} />

        
        {/* <Route path="/chat-room/:chatId" element={<ChatRoom />} /> */}
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </Router>
    </Suspense>
  );
};

export default App;
