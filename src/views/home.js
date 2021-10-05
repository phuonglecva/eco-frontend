import React from 'react';

import AppHero from '../components/home/hero';
import AppAbout from '../components/home/about';
import AppFeature from '../components/home/feature';
import AppWorks from '../components/home/works';
import AppFaq from '../components/home/faq';
import AppPricing from '../components/home/pricing';
import AppContact from '../components/home/contact';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function AppHome(props) {
  return (
    <div className="main">
      <AppHero setToken={props.setToken} />
      <AppAbout/>
      <AppFeature/>
      <AppFaq/>
      <AppContact/>
    </div>
  );
}

export default AppHome;