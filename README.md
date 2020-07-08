# WCST React Application (Background)

The Veteran Widget Product Office (VWPO) is responsible for managing various digital
products that help Department of Veterans Affairs (VA) business lines deliver on their
missions. This app specifically allows Verterans to submit their claim form (Form T4NG) via pdf upload through a self-service public web-application: the Widget Claims Submission Tool (WCST). The form is submitted directly to the Verterans Benefits Adminstration's (VBA) claims intake process via the Benefits Intake Application Programming INterface (API).

## Getting Started

First clone the repo via ssh:

```
git clone git@github.com:atlas-brownie/WCST-UI.git
```

OR https:

```
git clone https://github.com/atlas-brownie/WCST-UI.git
```

Next, go into the root of the project install the package.json modules:

```
npm install
```

Now start the app:

```
npm start
```

At this point you should have a browser open to http://localhost:3000, with the developer portal loaded. If you make changes to the
code, your browser should auto-reload the page.

To learn how to make meaningful changes to the portal, please review the [Development Guide](docs/development.md).

Before submitting a pull request, please review the [Testing Guide](docs/testing.md).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
