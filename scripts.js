$(document).ready(function(){
	$('#index-next').click(function(){
		$(this).parent().addClass('slideToLeft-active').removeClass('active');
		$('.blue').removeClass('inactive').addClass('slideFromRight-active active');
		setTimeout(function(){
			$('.beige').removeClass('slideToLeft-active');
			$('.blue').removeClass('slideFromRight-active');
		}, 2000);
	});	

	$('#one-next').click(function(){
		$(this).parent().addClass('slideToLeft-active').removeClass('active');
		$('.green').removeClass('inactive').addClass('slideFromRight-active active');
	});

	$('#one-prev').click(function(){
		$(this).parent().removeClass('active slideFromRight-active').addClass('slideToRight-active');
		$('.beige').removeClass('slideToLeft-active').addClass('active slideFromLeft-active');
	})

	$('#two-next').click(function(){
		$(this).parent().addClass('slideToLeft-active').removeClass('active');
		$('.red').removeClass('inactive').addClass('slideFromRight-active active');
	});

})