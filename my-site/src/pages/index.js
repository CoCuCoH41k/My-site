"use client"

import page_loader from "./comics_page_loader.js"
import { Router, useRouter } from "next/router.js";
import { useEffect, useState } from "react";
import { First, Back, Next, Last } from "@/svg/Navigation_SVGs.jsx";
import { Boosty, Discord, DeviantArt, FullScreen, Settings, Share, Furaffinity, En, Ru } from "@/svg/Other_SVGs.jsx";
import Multi_Lang_Button from "./lang_button.js";

const PRELOAD_RANGE = 2; // Кол-во страниц перед и после текущей для предзагрузки

export default function Home() {
  
  const router = useRouter()

  const { routerPageId } = router.query

  const [currentPageId, setCurrentPageId] = useState(null)
  const [currentLang, setCurrentLang] = useState("En")
  const [langBTN, setLangBTN] = useState(En)

  const changeLang = (lang) => {
    
  }

  const setCPID = (pageId) => {
    setCurrentPageId(pageId)
    localStorage.setItem('_pageID', pageId)
  }

  const page_backend = page_loader(currentPageId, setCPID, PRELOAD_RANGE);
  const currentPage = page_backend.page_image
  const nextPage = page_backend.next_loaded
  const prevPage = page_backend.prev_loaded
  const lastAvailablePage = page_backend.lastAvailablePage

  const navHooks = page_backend.nav

  useEffect(() => {
    const navKeyHandler = (event) => {
      if (event.code === 'ArrowLeft' && event.shiftKey) navHooks.first()
      if (event.code === 'ArrowLeft' && !event.shiftKey) navHooks.prev()
      if (event.code === 'ArrowRight' && !event.shiftKey) navHooks.next()
      if (event.code === 'ArrowRight' && event.shiftKey) navHooks.last()
    };

    if (!routerPageId) {
      setCPID(localStorage.getItem('_pageID') ? parseInt(localStorage.getItem('_pageID')) : 1)
    } else {
      setCPID(parseInt(routerPageId, 10))
    }
    document.addEventListener('keydown', navKeyHandler);

    return () => document.removeEventListener('keydown', navKeyHandler);
  })

  

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 relative">
        {currentPage && (
            <div className="page absolute top-0 left-0 w-full h-full p-2">
              <img
                  src={currentPage.src}
                  alt="page"
                  className="object-contain max-w-full max-h-full m-auto"
              />
            </div>
        )}
      </div>
      <div class="navigation-bar" alt="hotbar">
        <div className="flex items-center space-x-3 px-1" alt="promo-navigation">
          <a href="https://discord.gg/SjwFG2k62H" target="_blank"><button class="navigation-buttons"><Discord/></button></a>
          <a href="https://boosty.to/cocucoh41k"  target="_blank"><button class="navigation-buttons"><Boosty /></button></a>
          <a href="https://www.deviantart.com/cocucoh41k" target="_blank"><button class="navigation-buttons"><DeviantArt /></button></a>
          <a href="https://youtu.be/dQw4w9WgXcQ?si=ExyiWc0Qto1f86cM" target="_blank"><button class="navigation-buttons"><Furaffinity /></button></a>
        </div>
        <div className="flex items-center space-x-3 " alt="pages-navigation">
          <button class="navigation-buttons" onClick={navHooks.first} disabled={1 === currentPageId}    ><First/></button>
          <button class="navigation-buttons" onClick={navHooks.prev}  disabled={!prevPage}><Back /></button>
          <div class="navigation-pages-display">{currentPageId}/{lastAvailablePage}</div>
          <button class="navigation-buttons" onClick={navHooks.next}  disabled={!nextPage}><Next /></button>
          <button class="navigation-buttons" onClick={navHooks.last}  disabled={lastAvailablePage === currentPageId}    ><Last /></button>
        </div>
        <div className="flex items-center space-x-3 px-1" alt="other-navigation">
          <Multi_Lang_Button/>
          <button class="navigation-buttons"><Share/></button>
          <button class="navigation-buttons"><FullScreen/></button>
          <button class="navigation-buttons"><Settings/></button>
        </div>
      </div>
    </div>
  );
}