import { AppShell } from '@mantine/core';
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
          mainLinks={[{ link: '/home', label: 'Home' },{ link: '/contactUs', label: 'Contact Us' }, { link: '/aboutUs', label: 'About Us' }, {link: '/login', label: 'Login'}, {link: '/register', label: 'Tourist Register'}]}
          userLinks={[]} />
      </Router>
    </AppShell>
  );
}