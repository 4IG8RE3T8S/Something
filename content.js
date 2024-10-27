function hideAds() {
    const ads = document.querySelectorAll('.ad-container, .video-ads, .ytp-ad-overlay');
    ads.forEach(ad => {
        ad.style.position = 'absolute'; 
        ad.style.width = '1px'; 
        ad.style.height = '1px'; 
        ad.style.overflow = 'hidden'; 
        ad.style.visibility = 'hidden'; 
    });
}

function hideAdsWithRandomDelay() {
    const delay = Math.random() * 2000 + 500; 
    setTimeout(hideAds, delay);
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            hideAdsWithRandomDelay(); 
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true, attributes: true });

document.addEventListener('DOMContentLoaded', hideAds);

function hideAdsUsingShadowDOM() {
    const shadowHost = document.createElement('div');
    document.body.appendChild(shadowHost);
    const shadowRoot = shadowHost.attachShadow({ mode: 'closed' });
    
    const style = document.createElement('style');
    style.textContent = `
        .ad-container, .video-ads, .ytp-ad-overlay {
            display: none !important;
        }
    `;
    shadowRoot.appendChild(style);
}

hideAdsUsingShadowDOM();