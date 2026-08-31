const menuItems = Array.from(document.querySelectorAll('.gnb > li'));

// Toggle .open on click for items that have a .gnb2depth
menuItems.forEach(li => {
    const hasDepth = li.querySelector('.gnb2depth');
    const toggle = li.querySelector('a');
    if (!hasDepth || !toggle) return;

    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        // Toggle open state
        li.classList.toggle('open');
    });

    // Close when mouse leaves the li area
    li.addEventListener('mouseleave', function() {
        li.classList.remove('open');
    });
});

// Click outside closes any open menus
document.addEventListener('click', function(e) {
    menuItems.forEach(li => {
        if (!li.contains(e.target)) li.classList.remove('open');
    });
});



