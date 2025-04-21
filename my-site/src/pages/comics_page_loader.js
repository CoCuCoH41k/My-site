import React, { useEffect, useState } from 'react';

const pagesPathURL = (id) => {
    return `https://tkuniverse.space/en/pages/${id}.png`
}

const cpl = (pageId, onPageChange, PRELOAD_RANGE, LAST_AVALIABLE) => {
    const [currentPage, setCurrentPage] = useState(null);
    const [pages, setPages] = useState({});
    const loadPage = (id) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = pagesPathURL(id);
            img.onload = () => resolve(img);
        });
    };

    useEffect(() => {
        loadPage(pageId).then((img) => {
            setCurrentPage(img);
            setPages((prevPages) => ({ ...prevPages, [pageId]: img }));
        });

        const preloadPages = (start, end) => {
            for (let i = start; i <= end; i++) {
                if (i !== pageId && !pages[i]) {
                    loadPage(i).then((img) => {
                        setPages((prevPages) => ({ ...prevPages, [i]: img }));
                    });
                }
            }
        };

        preloadPages(pageId + 1, pageId + PRELOAD_RANGE);
        preloadPages(pageId - PRELOAD_RANGE, pageId - 1);
        
    }, [pageId]);

    const handleNextPage = () => {
        if (pages[pageId + 1]) {
            onPageChange(pageId + 1);
        }
    };

    const handlePrevPage = () => {
        if (pages[pageId - 1] && pageId > 1) {
            onPageChange(pageId - 1);
        }
    };

    const handleFirstPage = () => {
        if (pages[1]) {
            onPageChange(1)
        } else {
            loadPage(1).finally(onPageChange(1))
        }
    }

    const handleLastPage = () => {
        if (pages[LAST_AVALIABLE]) {
            onPageChange(LAST_AVALIABLE)
        } else {
            loadPage(LAST_AVALIABLE).finally(onPageChange(LAST_AVALIABLE))
        }
    }

    const handleSetPage = (routerPageId, lastPageId) => {
        if (0 >= routerPageId && routerPageId > LAST_AVALIABLE) return;

        if (pages[routerPageId]) {
            onPageChange(routerPageId)
        } else {
            loadPage(routerPageId).finally(onPageChange(routerPageId))
        }
    }

    return ({
        page_image: currentPage,
        prev_loaded: pages[pageId - 1],
        next_loaded: pages[pageId + 1],

        nav: {
            first: handleFirstPage,
            prev: handlePrevPage,
            next: handleNextPage,
            last: handleLastPage,
            setPage: handleSetPage,
        }
    });
};

export default cpl;