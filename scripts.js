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
			current_slide.addClass('slideToLeft-active').removeClass('active');
			next_slide.removeClass('inactive').addClass('slideFromRight-active active');
			setTimeout(function(){
				current_slide.removeClass('slideToLeft-active').addClass('inactive');
				next_slide.removeClass('slideFromRight-active');
			}, 2000);
		} else if (e.keyCode == 37) { //left
			current_slide.addClass('slideToRight-active').removeClass('active slideFromRight-active');
			prev_slide.addClass('active slideFromLeft-active').removeClass('inactive slideToLeft-active');
			setTimeout(function(){
				current_slide.removeClass('slideToRight-active').addClass('inactive');
				prev_slide.removeClass('slideFromLeft-active');
			}, 2000);
		}
	})

	$('body').on('click', '#next', function(){
		let slide_index = $(this).closest('.active').attr("data-hopp");
		let current_slide = $(hoppips[slide_index].current);
		let next_slide = $(hoppips[slide_index].next);
		let prev_slide = $(hoppips[slide_index].prev);

		current_slide.addClass('slideToLeft-active').removeClass('active');
		next_slide.removeClass('inactive').addClass('slideFromRight-active active');
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