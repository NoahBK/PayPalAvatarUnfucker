// ==UserScript==
// @name         PayPalAvatarUnfucker
// @namespace    https://violentmonkey.github.io/get-it/
// @version      1.9
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
        // Target the div containing the PayPal icon using the provided XPath
        const iconDiv = document.evaluate('//*[@id="merchant-header-main-wrapper-internal"]/div/div[1]/div/div[2]/div[3]/div/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (iconDiv) {
            // Remove the background color, border, and padding that created the circle
            iconDiv.style.backgroundColor = 'transparent';
            iconDiv.style.border = 'none';
            iconDiv.style.padding = '0';
            iconDiv.style.borderRadius = '0'; // Remove any rounding on corners

            // Find the SVG inside the div and remove it
            const svgIcon = iconDiv.querySelector('svg');
            if (svgIcon) {
                svgIcon.remove();
            }

            // Add your image in place of the SVG
            const img = document.createElement('img');
            img.src = 'https://i.imgur.com/27aIpC1.png'; // Replace with your own image link
            img.style.width = '40px';  // Set a fixed size to avoid stretching
            img.style.height = '40px'; // Set height equal to width for consistency
            img.style.objectFit = 'contain'; // Ensure the image is fully contained without stretching
            img.style.borderRadius = '50%'; // Make the image circular
            img.style.backgroundColor = 'transparent'; // Ensure no background color around the image
            img.style.boxShadow = 'none'; // Remove any shadow around the image
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';

            // Insert the image inside the div
            iconDiv.appendChild(img);

            // Remove the red circle element (if it still exists)
            const redCircleDiv = document.evaluate('//*[@id="merchant-header-main-wrapper-internal"]/div/div[1]/div/div[2]/div[3]/div/div/div[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (redCircleDiv) {
                redCircleDiv.style.display = 'none'; // Hide the red circle completely
            }
        } else {
            // Retry if the div isn't found yet
            setTimeout(replaceIconWithImage, 500);
        }
    };

    replaceIconWithImage();
})();
