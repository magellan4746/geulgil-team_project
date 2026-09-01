const menuItems = Array.from(document.querySelectorAll('.gnb > li'));

function setMenuToggleIcon(toggle, open) {
    if (!toggle) return;
    const img = toggle.querySelector('img');
    if (!img) return;

    const openSrc = toggle.getAttribute('data-open-src');
    const closedSrc = toggle.getAttribute('data-closed-src');

    if (openSrc && closedSrc) {
        img.src = open ? openSrc : closedSrc;
    }

    toggle.setAttribute('aria-expanded', String(open));
}

// Toggle .open on click for items that have a .gnb2depth
menuItems.forEach(li => {
    const hasDepth = li.querySelector('.gnb2depth');
    const toggle = li.querySelector('.menu-toggle');
    if (!hasDepth || !toggle) return;

    setMenuToggleIcon(toggle, li.classList.contains('open'));

    toggle.addEventListener('click', function (e) {
        e.preventDefault();

        const isOpen = li.classList.contains('open');
        li.classList.toggle('menu-closed', isOpen);
        li.classList.toggle('open', !isOpen);  // 열려 있으면 닫기
        setMenuToggleIcon(toggle, !isOpen);   // 아이콘도 같이 전환
    });

});

// Click outside closes any open menus
document.addEventListener('click', function(e) {
    menuItems.forEach(li => {
        if (!li.contains(e.target)) {
            li.classList.remove('open', 'menu-closed');
            setMenuToggleIcon(li.querySelector('.menu-toggle'), false);
        }
    });
});

// Mobile / overlay menu behavior
(function(){
    const smartMenuBtn = document.querySelector('.smart-menu > a');
    const overlay = document.querySelector('.smart-overlay-menu');
    if(!overlay) return;

    // ensure closed by default (CSS controls visibility)
    overlay.classList.remove('is-open');

    // Helper: set img inside a .list-tab according to open state.
    function setTabIcon(tab, open){
        if(!tab) return;
        const img = tab.querySelector('img');
        if(!img) return;
        const openSrc = img.getAttribute('data-src-open');
        const closedSrc = img.getAttribute('data-src-closed');
        if(openSrc && closedSrc){
            img.src = open ? openSrc : closedSrc;
        } else {
            // fallback: toggle class so user can style via CSS
            if(open) img.classList.add('is-open');
            else img.classList.remove('is-open');
        }
    }

    function openOverlay(){
        overlay.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
    function closeOverlay(){
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
        // also collapse any open dropdowns
        overlay.querySelectorAll('.dropdown-list').forEach(d => {
            d.classList.remove('is-open');
            d.style.maxHeight = '0px';
            d.style.opacity = '0';
        });
        // reset all list-tab icons to closed
        overlay.querySelectorAll('.list-tab').forEach(tab => setTabIcon(tab, false));
    }

    if(smartMenuBtn){
        smartMenuBtn.addEventListener('click', function(e){
            e.preventDefault();
            openOverlay();
        });
    }

    // close button inside overlay (if present)
    const closeBtn = overlay.querySelector('.btn-close a');
    if(closeBtn){
        closeBtn.addEventListener('click', function(e){
            e.preventDefault();
            closeOverlay();
        });
    }

    // clicking on backdrop closes overlay
    overlay.addEventListener('click', function(e){
        if(e.target === overlay) closeOverlay();
    });

    // ESC key closes overlay
    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape' && overlay.classList.contains('is-open')) closeOverlay();
    });

    // dropdown toggles inside overlay + icon swap
    const listTabs = Array.from(overlay.querySelectorAll('.list-tab'));

    function setDropdownState(dropdown, open){
        if(!dropdown) return;
        dropdown.classList.toggle('is-open', open);
        dropdown.style.maxHeight = open ? `${dropdown.scrollHeight}px` : '0px';
        dropdown.style.opacity = open ? '1' : '0';
    }

    // initialize icons as closed
    listTabs.forEach(tab => setTabIcon(tab, false));

    listTabs.forEach(tab => {
        tab.addEventListener('click', function(e){
            e.preventDefault();
            const dropdown = tab.nextElementSibling;
            if(!dropdown) return;
            const isOpen = dropdown.classList.contains('is-open');

            // close others and reset their icons
            overlay.querySelectorAll('.dropdown-list').forEach(d => {
                const prev = d.previousElementSibling;
                const shouldOpen = d === dropdown && !isOpen;
                setDropdownState(d, shouldOpen);
                if(prev && prev.classList && prev.classList.contains('list-tab')){
                    setTabIcon(prev, shouldOpen);
                }
            });
        });
    });
})();

