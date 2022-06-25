import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import Collections from './pages/Collections';
import CollectionDetail from './pages/Collections/Detail';
import Launchpad from './pages/Launchpad/index';
import LaunchpadDetail from './pages/Launchpad/Detail';
import Apply from './pages/Apply';
import ProposalList from './pages/Collections/ProposalList';
import ProposalCreate from './pages/Collections/ProposalCreate';
import ProposalDetail from './pages/Collections/ProposalDetail';
import { ToastContainer } from 'react-toastify';
import ApplyAdmin from './pages/ApplyAdmin';
import Admin from './pages/Launchpad/Admin';

const App = () => {
  return (
    <BrowserRouter>
      <div className="text-white">
        <Header />
        <main>
          <div className="flex flex-col md:flex-row">
            <NavBar />
            <div
              id="main"
              className="main-content flex-1  mt-12 md:mt-2 pb-24 md:pb-5 p-4 text-white"
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="me" element={<Profile />} />
                <Route path="apply" element={<Apply />} />
                <Route path="admin/apply" element={<Admin />} />
                <Route
                  path="admin/apply/:collectionId"
                  element={<ApplyAdmin />}
                />
                <Route path="/launchpad" element={<Launchpad />} />
                <Route
                  path="/launchpad/:collectionId"
                  element={<LaunchpadDetail />}
                />
                <Route path="/collections" element={<Collections />} />
                <Route
                  path="/collections/:collectionId"
                  element={<CollectionDetail />}
                />
                <Route
                  path="/collections/:collectionId/proposals"
                  element={<ProposalList />}
                />
                <Route
                  path="/collections/:collectionId/proposals/create"
                  element={<ProposalCreate />}
                />
                <Route
                  path="/collections/:collectionId/proposals/:proposalId"
                  element={<ProposalDetail />}
                />
              </Routes>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
