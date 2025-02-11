import React from "react";
import { Link } from "react-router-dom";

function PaginationLinks({ count, next, previous, setPage }) {
  let nbr_links = Math.ceil(count / 3);
  const linksArray = [];
  let nbrLink = 1;
  while (nbr_links > 0) {
    linksArray.push(nbrLink);
    nbrLink++;
    nbr_links--;
  }
  console.log(linksArray);

  return (
    <div className="pagination--links">
      <div className="card-links--text">Pages:</div>
      <div className="card-links">
        {previous != null ? (
          <div className="card-link" onClick={() => setPage(previous)}>
            <Link to={`#${previous}`} onClick={() => setPage(previous)}>
              <i className="fa fa-angles-left"></i>
            </Link>
          </div>
        ) : (
          <div className="card-link no-link" onClick={() => setPage(previous)}>
            <Link to={`#${previous}`} onClick={() => setPage(previous)}>
              <i className="fa fa-angles-left no-link"></i>
            </Link>
          </div>
        )}

        {linksArray.map((pageNumber, i) => {
          return (
            <div
              className="card-link"
              key={i}
              onClick={() => setPage(pageNumber)}
            >
              <Link to={`#${pageNumber}`} onClick={() => setPage(pageNumber)}>
                {pageNumber}
              </Link>
            </div>
          );
        })}
        {next != null ? (
          <div className="card-link " onClick={() => setPage(next)}>
            <Link to={`#${next}`}>
              <i
                className="fa fa-angles-right"
                onClick={() => setPage(next)}
              ></i>
            </Link>
          </div>
        ) : (
          <div className="card-link no-link">
            <Link to={`#${next}`}>
              <i className="fa fa-angles-right no-link"></i>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginationLinks;
