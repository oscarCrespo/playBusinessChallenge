var s = skrollr.init();
(function($){
	

	// Listeners
	$('.proyectoImg').click(openDetails);
	$('.followBtn').click(followProyect);
	$('.proyectosMenu').on('click', '.btn', scrollToSection);

	var $body = $('html, body');

	function openDetails(e) {
		$('.proyecto').removeClass('active');
		$('#mainApp').addClass('secondaryPanelActive');
		$(this).parent().addClass('active');
	}

	function followProyect(e) {
		$(this).toggleClass('active');;
	}

	function scrollToSection(e) {
		var sectionId = $(this).attr('data-section');
		var targetSection = $("#"+sectionId);

		$body.animate({
          scrollTop: targetSection.offset().top - 55
        }, 500);
	}


})(jQuery)