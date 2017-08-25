$('.main-carousel').flickity({
  // options
  cellAlign: 'left',
  contain: true
});
$(document).ready(function(){

   $('.carousel').flickity({
		  // // options
		  // cellAlign: 'left',
		  // contain: true
		  groupCells: true,
		  pageDots: false
		});

   $('.providers').flickity({
		  // // options
		  // cellAlign: 'left',
		  // contain: true
		  groupCells: true,
		  pageDots: false
		});

   $('.header-main .menu-icon').on( "click", function() {
		  $( '.main-menu' ).slideToggle();
		});

});

transformicons.add('.tcon');