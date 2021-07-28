import { useEffect } from "react";
import URI from 'urijs';
import {
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import './App.css';

function isRouterHref(href) {
  const uri = new URI(href);
  return uri.is('relative') || uri.hostname() === URI(window.location.href).hostname();
}


function App() {
  const history = useHistory();

  const handleLinkClicks = (event) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.defaultPrevented ||
      event.button !== 0
    ) {
      return;
    }
  
    const target = event.target;
    if (target == null) {
      return;
    }

    const closestLink = target.closest('a[href]');
    if (closestLink == null) {
      return;
    }

    // This is where we had a sudden change in behaviour
    const linkTarget = closestLink.getAttribute('target');
    if (linkTarget != null && linkTarget !== '_self') {
      return;
    }
  
    const href = closestLink.getAttribute('href');
    console.log('HREF', href)
    if (!isRouterHref(href)) {
      return;
    }
  
    event.preventDefault();
    history.push(href);
  }

  useEffect(() => {
    document?.body.addEventListener('click', handleLinkClicks);

    return () => {
      document?.body.removeEventListener('click', handleLinkClicks)
    }
  });

  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/page1">Page 1</a>
          </li>
          <li>
            <Link to="/page2">Page 2</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/page1">
          <Page1 />
        </Route>
        <Route path="/page2">
          <Page2 />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      </div>
  );
}

function Home() {
  useEffect(() => {
    window.test = "It Works!";
  }, []);

  return (
    <div>
      Home
    </div>
  )
}

function Page1() {
  return (
    <div>
      Page1 - {window.test}
    </div>
  )
}

function Page2() {
  return (
    <div>
      Page2 - {window.test}
    </div>
  );
}

export default App;
