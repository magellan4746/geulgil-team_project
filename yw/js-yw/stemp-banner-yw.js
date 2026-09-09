document.addEventListener('DOMContentLoaded', () => {
  const originalMap = {
    pc: './img-yw/stemp-button-pc.svg',
    pad: './img-yw/stemp-button-pad.svg',
    mo: './img-yw/stemp-button-mo.svg'
  };

  const grayMap = {
    pc: './img-yw/stemp-button-gray-pc.svg',
    pad: './img-yw/stemp-button-gray-pad.svg',
    mo: './img-yw/stemp-button-gray-mo.svg'
  };

  const getBreakpoint = (button) => {
    const banner = button.closest('.st-banner');

    if (!banner) return 'pc';
    if (banner.classList.contains('pad')) return 'pad';
    if (banner.classList.contains('mo')) return 'mo';
    return 'pc';
  };

  const updateAllButtons = (isGray) => {
    document.querySelectorAll('.st-banner-btn img').forEach((button) => {
      const breakpoint = getBreakpoint(button);
      const src = isGray ? grayMap[breakpoint] : originalMap[breakpoint];

      if (src) {
        button.setAttribute('src', src);
        button.dataset.state = isGray ? 'gray' : 'original';
      }
    });
  };

  document.querySelectorAll('.st-banner-btn img').forEach((button) => {
    const breakpoint = getBreakpoint(button);
    button.setAttribute('src', originalMap[breakpoint]);
    button.dataset.state = 'original';

    button.addEventListener('click', () => {
      const nextState = button.dataset.state !== 'gray';
      updateAllButtons(nextState);
    });
  });

  window.addEventListener('resize', () => {
    const isGray = document.querySelector('.st-banner-btn img')?.dataset.state === 'gray';
    updateAllButtons(isGray);
  });
});
