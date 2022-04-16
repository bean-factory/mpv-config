 // ==UserScript==
// @name         Show YouTube comments
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show only YouTube comments
// @author       Mridul
// @match        https://www.youtube.com/*
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    function injectStyles(styles) {
        const head = document.querySelector('head');
        const style = document.createElement('style');
        style.innerText = styles;
        head.appendChild(style);
    }

    async function getComments() {
      return new Promise((resolve) => {
            const interval = setInterval(() => {
                const comments = document.querySelector('ytd-watch-flexy');
                if (comments) {
                    resolve(comments);
		    document.getElementsByTagName('video')[0].pause()
                    clearInterval(interval);
                }
            }, 100);
        });
    }

    function template(html) {
      const el = document.createElement('div');
      el.innerHTML = html;
      return el;
    }

    window.hideComments = () => {
      document.documentElement.classList.add('comments-hidden');
    };


    async function init() {
        injectStyles(`
          .comments-hidden ytd-watch-flexy[flexy] #secondary.ytd-watch-flexy {
              display: none;
          }
          
          .comments-hidden ytd-comments {
              display: block;
          }
          
          .comments-hidden ytd-video-primary-info-renderer {
              display: none;
          }
          
          .comments-hidden ytd-video-secondary-info-renderer {
              display: none;
          }
          
          .comments-hidden #player.ytd-watch-flexy {
              display: none;
          }
          
          .comments-hidden ytd-item-section-renderer.ytd-watch-next-secondary-results-renderer {
              display: none;
          }
          
          .comments-hidden #chips.yt-chip-cloud-renderer {
              display: none;
          }
          
        `);

        window.hideComments();

        const controls = template(`

        `);
        const comments = await getComments();
        comments.before(controls);
    }

    init();
})();
