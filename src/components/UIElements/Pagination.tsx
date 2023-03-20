import ReactPaginate from "react-paginate";
import { useState } from "react";

import { convertSecondsToMinutes } from "../../utils/helper-functions";
import classes from "./Pagination.module.css";
import { ScoreType } from "../../pages/ScorePage";

type ItemListProps = {
  scoreData: ScoreType[];
};

function ItemList({ scoreData }: ItemListProps) {
  return (
    <ul>
      {scoreData &&
        scoreData.map((data: ScoreType, index: number) => {
          return (
            <li key={index}>
              <div className={classes.score_entry}>
                <p>
                  {index + 1}. {data.name}
                </p>
                <p>{convertSecondsToMinutes(data.time)}</p>
              </div>
            </li>
          );
        })}
    </ul>
  );
}

type PaginationProps = {
  itemsPerPage: number;
  items: ScoreType[];
};

function Pagination({ itemsPerPage, items }: PaginationProps) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  function handlePageClick(event: any): void {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  }

  return (
    <div className={classes.score_content}>
      <ItemList scoreData={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="VOR >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        pageCount={pageCount}
        previousLabel="< ZURÜCK"
        className={classes.pagination_container}
        activeClassName={classes.active_page}
      />
    </div>
  );
}

export default Pagination;
