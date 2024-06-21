import { useState } from "react";

const Pagination = ({pages, setPage}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setPage(page)
    };

    function createPagination(pages, page) {
        let str = [];
        let active;
        let pageCutLow = page - 1;
        let pageCutHigh = page + 1;

        if (page > 1) {
            str.push(
                <li className="page-item previous" key="prev">
                    <a onClick={() => handlePageChange(page - 1)}>Previous</a>
                </li>
            );
        }

        if (pages < 6) {
            for (let p = 1; p <= pages; p++) {
                active = page === p ? "active" : "";
                str.push(
                    <li className={`page-item ${active}`} key={p}>
                        <a onClick={() => handlePageChange(p)}>{p}</a>
                    </li>
                );
            }
        } else {
            if (page > 2) {
                str.push(
                    <li className="page-item" key="1">
                        <a onClick={() => handlePageChange(1)}>1</a>
                    </li>
                );
                if (page > 3) {
                    str.push(
                        <li className="out-of-range" key="start-ellipsis">
                            <a onClick={() => handlePageChange(page - 2)}>...</a>
                        </li>
                    );
                }
            }

            if (page === 1) {
                pageCutHigh += 2;
            } else if (page === 2) {
                pageCutHigh += 1;
            }

            if (page === pages) {
                pageCutLow -= 2;
            } else if (page === pages - 1) {
                pageCutLow -= 1;
            }

            for (let p = pageCutLow; p <= pageCutHigh; p++) {
                if (p === 0) {
                    p += 1;
                }
                if (p > pages) {
                    continue;
                }
                active = page === p ? "active" : "";
                str.push(
                    <li className={`page-item ${active}`} key={p}>
                        <a onClick={() => handlePageChange(p)}>{p}</a>
                    </li>
                );
            }

            if (page < pages - 1) {
                if (page < pages - 2) {
                    str.push(
                        <li className="out-of-range" key="end-ellipsis">
                            <a onClick={() => handlePageChange(page + 2)}>...</a>
                        </li>
                    );
                }
                str.push(
                    <li className="page-item" key={pages}>
                        <a onClick={() => handlePageChange(pages)}>{pages}</a>
                    </li>
                );
            }
        }

        if (page < pages) {
            str.push(
                <li className="page-item next" key="next">
                    <a onClick={() => handlePageChange(page + 1)}>Next</a>
                </li>
            );
        }

        return <ul>{str}</ul>;
      }
      

    return (
        <div id="pagination">
            {createPagination(pages, currentPage)}
        </div>
    )
}

export default Pagination