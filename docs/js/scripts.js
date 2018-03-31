$(document).ready(function(){
	let hoppips = [];
	let numHops = 0;

	const HOPS = $('.hoppip');
	HOPS.each(function(index, value){
		this.setAttribute('data-hopp', index);
		if (index==0) {
			hoppips.push({
				current: this,
				prev: HOPS[HOPS.length-1],
				next: HOPS[1]
			})
		} else if (index==HOPS.length-1) {
			hoppips.push({
				current: this,
				prev: HOPS[HOPS.length-2],
				next: HOPS[0]
			})
		} else {
			hoppips.push({
				current: this,
				prev: HOPS[index-1],
				next: HOPS[index+1]
			})
		}
	})

	const TRANSITIONS = [
		  ['slideToLeft-active', 'slideFromRight-active'],
		  ['slideToTop-active', 'slideFromBottom-active'],
		  ['slideToRight-active', 'slideFromLeft-active'],
		  ['slideToBottom-active', 'slideFromTop-active'],
		  ['fadeIntoBlack-active', 'slideFromLeft-active'],
		  ['fadeIntoBlack-active', 'slideFromTop-active'],
		  ['slideToLeft-active', 'scaleUp-active'],
		  ['slideToTop-active', 'scaleUp-active'],
		  ['scaleDown-active', 'scaleUp-active'],
		  ['scaleDown-active', 'slideFromBottom-active'],
		  ['scaleDown-active', 'slideFromRight-active']
	];

	const applyTransition = () => {
		
		let next_class = TRANSITIONS[numHops][1];
		let current_class = TRANSITIONS[numHops][0];

		let slide_index = $('.active').attr('data-hopp');
		let current_slide = $(hoppips[slide_index].current);
		let next_slide = $(hoppips[slide_index].next);
		let prev_slide = $(hoppips[slide_index].prev);

		next_slide.addClass(`${next_class} active`).removeClass('inactive');
		current_slide.addClass(current_class).removeClass('active');
		
		current_slide.bind('oanimationend animationend webkitAnimationEnd', function() { 
		    current_slide.removeClass(current_class)
			if (current_slide.hasClass('active')==false){
				current_slide.addClass('inactive');
			} 
		});
		next_slide.bind('oanimationend animationend webkitAnimationEnd', function() { 
			next_slide.removeClass(next_class);
		})

		numHops += 1;
		if (numHops==TRANSITIONS.length){
			numHops = 0;
		}
		
	}
	
	$('body').keydown(function(e){
		if (e.keyCode == 13) { applyTransition() } 
	})

	$('body').on('click', '#next', applyTransition);

})