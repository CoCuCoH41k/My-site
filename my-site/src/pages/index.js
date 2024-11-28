"use client"

import page_loader from "./comics_page_loader.js"
import { useEffect, useState } from "react";
import { First, Back, Next, Last } from "@/svg/Navigation_SVGs.jsx";
import { Boosty, Discord, FullScreen, Settings } from "@/svg/Other_SVGs.jsx";

const PRELOAD_RANGE = 2; // Кол-во страниц перед и после текущей для предзагрузки

const LAST_AVALIABLE = 1239;

export default function Home() {

  const [currentPageId, setCurrentPageId] = useState(null)

  const setCPID = (pageId) => {
    setCurrentPageId(pageId)
    localStorage.setItem('_pageID', pageId)
  }

  const page_backend = page_loader(currentPageId, setCPID, PRELOAD_RANGE, LAST_AVALIABLE);
  const currentPage = page_backend.page_image
  const nextPage = page_backend.next_loaded
  const prevPage = page_backend.prev_loaded

  const navHooks = page_backend.nav

  useEffect(() => {
    const navKeyHandler = (event) => {
      if (event.code === 'ArrowLeft' && event.shiftKey) {
        navHooks.first()
      }

      if (event.code === 'ArrowLeft' && !event.shiftKey) {
        navHooks.prev()
      }

      if (event.code === 'ArrowRight' && !event.shiftKey) {
        navHooks.next()
      }

      if (event.code === 'ArrowRight' && event.shiftKey) {
        navHooks.last()
      }
    };

    setCPID(localStorage.getItem('_pageID') ? parseInt(localStorage.getItem('_pageID')) : 1)

    document.addEventListener('keydown', navKeyHandler);

    return () => {
      document.removeEventListener('keydown', navKeyHandler);
    };
  })



  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 relative">
        {currentPage && <img src={currentPage.src} alt="page" className="absolute top-0 left-0 w-full h-full object-contain p-2"/>}
      </div>
      <div class="navigation-bar" alt="hotbar">
        <div className="flex items-center space-x-3 px-1" alt="promo-navigation">
          <button class="navigation-buttons"><Discord/></button>
          <button class="navigation-buttons"><Boosty /></button>
        </div>
        <div className="flex items-center space-x-3" alt="pages-navigation">
          <button class="navigation-buttons" onClick={navHooks.first} disabled={1 === currentPageId}    ><First/></button>
          <button class="navigation-buttons" onClick={navHooks.prev}  disabled={!prevPage}><Back /></button>
          <div class="navigation-pages-display">{currentPageId}/{LAST_AVALIABLE}</div>
          <button class="navigation-buttons" onClick={navHooks.next}  disabled={!nextPage}><Next /></button>
          <button class="navigation-buttons" onClick={navHooks.last}  disabled={LAST_AVALIABLE === currentPageId}    ><Last /></button>
        </div>
        <div className="flex items-center space-x-3 px-1" alt="other-navigation">
          <button class="navigation-buttons"><FullScreen/></button>
          <button class="navigation-buttons"><Settings/></button>
        </div>
      </div>
    </div>
  );
}
