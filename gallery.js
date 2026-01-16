// gallery.js — calcula grid-row span para cada .grid-item y crea efecto masonry
(function(){
  const grid = document.querySelector('.image-grid');
  if(!grid) return;

  function getRowHeight(){
    return parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')) || 8;
  }

  function getRowGap(){
    const gap = window.getComputedStyle(grid).getPropertyValue('gap');
    return parseInt(gap) || 0;
  }

  function resizeInstance(item){
    const img = item.querySelector('img');
    if(!img) return;
    const rowHeight = getRowHeight();
    const rowGap = getRowGap();
    const height = img.getBoundingClientRect().height;
    const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + span;
    item.style.visibility = 'visible';
  }

  function resizeAll(){
    const items = grid.querySelectorAll('.grid-item');
    items.forEach(resizeInstance);
  }

  // esperar a que las imágenes carguen
  const imgs = grid.querySelectorAll('img');
  imgs.forEach(img => {
    if(img.complete){
      resizeInstance(img.parentElement);
    } else {
      img.addEventListener('load', ()=> resizeInstance(img.parentElement));
    }
  });

  // recalcular al cambiar tamaño de ventana
  let resizeTimer;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeAll, 120);
  });

  // small initial delay to ensure layout computed
  window.addEventListener('load', ()=> setTimeout(resizeAll, 50));
})();
