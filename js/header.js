const menuItems = Array.from(document.querySelectorAll('.gnb > li'));

function setMenuIcon(toggle, isOpen) {
    if (!toggle) return;

    const img = toggle.querySelector('img');
    if (!img) return;

    const closedSrc = toggle.dataset.closedSrc || './img/icn_menu.svg';
    const openSrc = toggle.dataset.openSrc || './img/icn-close.svg';
    img.src = isOpen ? openSrc : closedSrc;
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? '전체 메뉴 닫기' : '전체 메뉴 열기');
}

// Toggle .open on click for items that have a .gnb2depth
menuItems.forEach(li => {
    const hasDepth = li.querySelector('.gnb2depth');
    const toggle = li.querySelector('.menu-toggle');
    if (!hasDepth || !toggle) return;

    setMenuIcon(toggle, false);

    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = li.classList.toggle('open');
        setMenuIcon(toggle, isOpen);
    });

    // Close when mouse leaves the li area
    li.addEventListener('mouseleave', function() {
        li.classList.remove('open');
        setMenuIcon(toggle, false);
    });
});

// Click outside closes any open menus
document.addEventListener('click', function(e) {
    menuItems.forEach(li => {
        const toggle = li.querySelector('.menu-toggle');
        if (!li.contains(e.target)) {
            li.classList.remove('open');
            setMenuIcon(toggle, false);
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
        overlay.querySelectorAll('.dropdown-list').forEach(d=> d.style.display = 'none');
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

    // initialize icons as closed
    listTabs.forEach(tab => setTabIcon(tab, false));

    listTabs.forEach(tab => {
        tab.addEventListener('click', function(e){
            e.preventDefault();
            const dropdown = tab.nextElementSibling;
            if(!dropdown) return;
            const isOpen = dropdown.style.display === 'block';
            // close others and reset their icons
            overlay.querySelectorAll('.dropdown-list').forEach(d=>{
                d.style.display = 'none';
                const prev = d.previousElementSibling;
                if(prev && prev.classList && prev.classList.contains('list-tab')){
                    setTabIcon(prev, false);
                }
            });
            // toggle this one
            const willOpen = !isOpen;
            dropdown.style.display = willOpen ? 'block' : 'none';
            setTabIcon(tab, willOpen);
        });
    });
})();

