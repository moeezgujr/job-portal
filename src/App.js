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
  const listItems = [
    {
      UTC: "1408648665",
      list: [
        {
          type: "Message",
          content: "A messgae description for testing notofication bar",
          count: 3,
          timestamp: "1PM"
        }
      ]
    },
    {
      UTC: "1598103780",
      list: [
        {
          type: "Login",
          content: "A messgae description for testing notofication bar",
          count: 1
        }
      ]
    },
    {
      UTC: "1595594400",
      list: [
        {
          type: "Login",
          content: "A messgae description for testing notofication bar",
          count: 4
        }
      ]
    },
    {
      UTC: "1595575200",
      list: [
        {
          type: "Critical",
          content: "A messgae description for testing notofication bar",
          count: 3
        }
      ]
    }
  ];
  return (
    <Router>
      <div>
        <ToastContainer></ToastContainer>
        <NotificationsBox listItems={notifications}/>
        <Switch>
          <Route exact path="/" component={DataTable} />
          <Route path="/wizard" component={MultiStepWizard} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
