// ==UserScript==
// @name        PayPalAvatarUnfucker
// @author      NoahBK (https://github.com/NoahBK)  // Combined author and URL on one line
// @namespace   https://violentmonkey.github.io/get-it/
// @version     2.0
// @homepage    https://github.com/NoahBK
// @supportURL  https://github.com/NoahBK/PayPalAvatarUnfucker/issues
// @downloadURL https://github.com/NoahBK/PayPalAvatarUnfucker/raw/main/script.user.js
// @updateURL   https://github.com/NoahBK/PayPalAvatarUnfucker/raw/main/script.user.js
// @description Replaces SVG with an image and removes the background color from PayPal's icon
// @match       https://www.paypal.com/*
// @grant       none
// ==/UserScript==

(function() {
  'use strict';

  const replaceIconWithImage = () => {
    const iconDiv = document.evaluate('//*[@id="merchant-header-main-wrapper-internal"]/div/div[1]/div/div[2]/div[3]/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (iconDiv) {
      iconDiv.style.backgroundColor = 'transparent';
      iconDiv.style.border = 'none';
      iconDiv.style.padding = '0';
      iconDiv.style.borderRadius = '0';
      iconDiv.style.width = '40px';
      iconDiv.style.height = '40px';

      const svgIcon = iconDiv.querySelector('svg');
      if (svgIcon) {
        svgIcon.remove();
      }

      const img = document.createElement('img');
      img.src = 'https://i.imgur.com/27aIpC1.png';
      img.style.width = '24px';
      img.style.height = '24px';
      img.style.objectFit = 'contain';
      img.style.borderRadius = '50%';
      img.style.backgroundColor = 'transparent';
      img.style.boxShadow = 'none';
      img.style.display = 'block';
      img.style.margin = '0 auto';
      iconDiv.appendChild(img);

      const redCircleDiv = document.evaluate('//*[@id="merchant-header-main-wrapper-internal"]/div/div[1]/div/div[2]/div[3]/div/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (redCircleDiv) {
        redCircleDiv.style.display = 'none';
      }
    } else {
      setTimeout(replaceIconWithImage, 500);
    }
  };

  replaceIconWithImage();
})();
