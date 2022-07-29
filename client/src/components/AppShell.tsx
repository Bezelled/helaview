import { AppShell, Paper } from '@mantine/core';
import Home from '../pages/Home';
import HelaHeader from './Header';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import HelaFooter from './Footer';

const footerLinks = [
  {
    "title": "Quick Links",
    "links": [
      {
        "label": "About Us",
        "link": "/aboutUs"
      },
      {
        "label": "Contact",
        "link": "/contactUs"
      }
    ]
  },
  {
    "title": "Company",
    "links": [
      {
        "label": "Help",
        "link": "#"
      },
      {
        "label": "Terms and Conditions",
        "link": "#"
      },
      {
        "label": "Privacy Policy",
        "link": "#"
      },
      {
        "label": "FAQs",
        "link": "#"
      }
    ]
  }
]

export default function HelaAppShell() {

  return (
    <AppShell
      footer={
        <HelaFooter
          data={footerLinks} />
      }
    >
      <Router>
      <HelaHeader
          mainLinks={[{ link: '/home', label: 'Home' },{ link: '/contactUs', label: 'Contact Us' }, { link: '/aboutUs', label: 'About Us' }]}
          userLinks={[]} />
        <Paper>
          <Home />
          {/* Your application here */}
          {/* <HelaFooter data={footerLinks} /> */}
        </Paper>
      </Router>
    </AppShell>
  );
}