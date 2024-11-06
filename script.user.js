// ==UserScript==
// @name         PayPalAvatarUnfucker
// @namespace    http://tampermonkey.net/
// @version      1.7
// @homepage     https://github.com/NoahBK
// @supportURL   https://github.com/NoahBK/PayPalAvatarUnfucker/issues
// @downloadURL  https://github.com/NoahBK/PayPalAvatarUnfucker/raw/main/script.user.js
// @updateURL    https://github.com/NoahBK/PayPalAvatarUnfucker/raw/main/script.user.js
// @description  Replaces SVG with an image and removes the background color from PayPal's icon
// @author       https://github.com/NoahBK
// @match        https://www.paypal.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const replaceIconWithImage = () => {
        // Select the div that contains the SVG and background color
        const iconDiv = document.querySelector('[data-testid="header_sub_msgIcon"]');

        if (iconDiv) {
            // Remove the background color
            iconDiv.style.backgroundColor = 'transparent';

            // Find the SVG inside the div and remove it
            const svgIcon = iconDiv.querySelector('svg');
            if (svgIcon) {
                svgIcon.remove();
            }

            // Add your image in place of the SVG
            const img = document.createElement('img');
            img.src = 'https://i.imgur.com/27aIpC1.png';  // Update with your own image link if you want
            img.style.width = '24px';  // Set width and height to match the original icon size
            img.style.height = '24px';
            iconDiv.appendChild(img);  // Add the image inside the div
        } else {
            // Retry if the div isn't found yet
            setTimeout(replaceIconWithImage, 500);
        }
    };

    replaceIconWithImage();
})();
