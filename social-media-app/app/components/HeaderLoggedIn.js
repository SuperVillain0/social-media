import React, { useContext } from "react";
import { Link } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import { Tooltip } from "react-tooltip";

function HeaderLoggedIn() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const handleLogout = () => {
    appDispatch({ type: "logout" });
  };

  const handleSearchIcon = e => {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  };

  return (
    <div className="flex-row my-3 my-md-0">
      <a
        onClick={handleSearchIcon}
        data-tooltip-content="Search"
        data-tooltip-id="search"
        href="#"
        className="text-white mr-2 header-search-icon"
      >
        <i className="fas fa-search"></i>
      </a>
      <Tooltip place="bottom" id="search" className="custom-tooltip" />{" "}
      <span data-tooltip-content="Chat" data-tooltip-id="chat" className="mr-2 header-chat-icon text-white">
        <i className="fas fa-comment"></i>
        <span className="chat-count-badge text-white"> </span>
      </span>
      <Tooltip place="bottom" id="chat" className="custom-tooltip" />{" "}
      <Link data-tooltip-content="Profile" data-tooltip-id="profile" to={`profile/${appState.user.username}`} className="mr-2">
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <Tooltip place="bottom" id="profile" className="custom-tooltip" />{" "}
      <Link className="btn btn-sm btn-success mr-2" to="/create-post">
        Create Post
      </Link>{" "}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
