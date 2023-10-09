import React from "react";
import { Link } from "react-router-dom";
import Page from "./Page";

function NotFound() {
  return (
    <Page title="Not Found">
      <div className="text-center">
        <h2>Whoops, cannot find that page</h2>
        <p className="lead text-muted">
          You can always go back to the <Link to={`/`}>homepage</Link>
        </p>
      </div>
    </Page>
  );
}

export default NotFound;
