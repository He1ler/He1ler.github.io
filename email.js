/**
 * email.js - builds mailto links at runtime so the address is not sitting in the HTML for scrapers
 */
(function () {
    document.querySelectorAll('a.js-email').forEach(function (link) {
        var address = link.dataset.user + '@' + link.dataset.domain;
        link.href = 'mailto:' + address;
        if (link.hasAttribute('data-show-address')) {
            link.textContent = address;
        }
    });
})();
