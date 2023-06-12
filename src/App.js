import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DataTable from './Views/DataTable/DataTable';
import MultiStepWizard from './Views/Multistepwizard/MultiStepWizard';
import NotificationsBox from './Views/NotificationBell/NotificationsBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
const App = () => {
  const notifications = useSelector((state) => state.notifications)
  return (
    <Router>
      <div>
        <ToastContainer></ToastContainer>
        <NotificationsBox listItems={notifications}/>
        <Switch>
        <Route exact path="/" component={DataTable} />
          <Route path="/wizard" component={MultiStepWizard} />
          <Route path="/edit_wizard" component={MultiStepWizard} />

        </Switch>
      </div>
    </Router>
  );
};

export default App;
