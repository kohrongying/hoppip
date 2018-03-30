$(document).ready(function(){
	let hoppips = [];

	const hops = $('.hoppip');
	hops.each(function(index, value){
		this.setAttribute('data-hopp', index);
		if (index==0) {
			hoppips.push({
				current: this,
				prev: hops[hops.length-1],
				next: hops[1]
			})
		} else if (index==hops.length-1) {
			hoppips.push({
				current: this,
				prev: hops[hops.length-2],
				next: hops[0]
			})
		} else {
			hoppips.push({
				current: this,
				prev: hops[index-1],
				next: hops[index+1]
			})
		}
	})
	console.log(hoppips);
	
	$('body').keydown(function(e){
		let slide_index = $('.active').attr("data-hopp");
		let current_slide = $(hoppips[slide_index].current);
		let next_slide = $(hoppips[slide_index].next);
		let prev_slide = $(hoppips[slide_index].prev);

		if (e.keyCode == 39) { //right

			next_slide.addClass('slideFromRight-active active').removeClass('inactive');
			current_slide.addClass('slideToLeft-active').removeClass('active');
			
			current_slide.bind('oanimationend animationend webkitAnimationEnd', function() { 
			    current_slide.removeClass('slideToLeft-active')
				if (current_slide.hasClass('active')==false){
					current_slide.addClass('inactive');
				} 
			});
			next_slide.bind('oanimationend animationend webkitAnimationEnd', function() { 
				next_slide.removeClass('slideFromRight-active');
			})
		} else if (e.keyCode == 37) { //left
			current_slide.addClass('slideToRight-active').removeClass('active slideFromRight-active');
			prev_slide.addClass('active slideFromLeft-active').removeClass('inactive slideToLeft-active');
			
			current_slide.bind('oanimationend animationend webkitAnimationEnd', function() { 
			    if (current_slide.hasClass('active')==false){
					current_slide.addClass('inactive');
				}
				current_slide.removeClass('slideToRight-active'); 
			});
			prev_slide.bind('oanimationend animationend webkitAnimationEnd', function() { 
				prev_slide.removeClass('slideFromLeft-active');
			})
		}
	})

	$('body').on('click', '#next', function(){
		let slide_index = $(this).closest('.active').attr("data-hopp");
		let current_slide = $(hoppips[slide_index].current);
		let next_slide = $(hoppips[slide_index].next);
		let prev_slide = $(hoppips[slide_index].prev);

		next_slide.addClass('slideFromRight-active active').removeClass('inactive');
		current_slide.addClass('slideToLeft-active').removeClass('active');
		
		setTimeout(function(){
			current_slide.removeClass('slideToLeft-active').addClass('inactive');
			next_slide.removeClass('slideFromRight-active');
		}, 2000);
	})

	$('body').on('click', '#prev', function(){
		let slide_index = $(this).closest('.active').attr("data-hopp");
		let current_slide = $(hoppips[slide_index].current);
		let next_slide = $(hoppips[slide_index].next);
		let prev_slide = $(hoppips[slide_index].prev);
		current_slide.addClass('slideToRight-active').removeClass('active slideFromRight-active');
		prev_slide.addClass('active slideFromLeft-active').removeClass('inactive slideToLeft-active');
		setTimeout(function(){
			current_slide.removeClass('slideToRight-active').addClass('inactive');
			prev_slide.removeClass('slideFromLeft-active');
		}, 2000);
	})

})