$(function() {
	// управление видимостью navbar
	$('#hamburger').click(function(){
		var navbar = $('aside nav');
		$(this).toggleClass('open');

		if(navbar.is(':visible')){
			navbar.slideUp(300);
		}
		else{
			navbar.slideDown(300);
		}
		
	})


	var errors = $('#bank_details input');
	var submitBtn = document.querySelector('form #send_data');


	// Валидация для элементов формы
	$('.card_number input').change(function(){
		validate(this, /^\d{4}$/)
	});

	$('.back input').change(function(){
		validate(this, /^\d{3}$/)
	});

	$('#card_owner').change(function(){
		validate(this, /^[a-zA-Z\s]+$/)
	})

	$('#bank_details').on("submit", function(event){
		if(errors.length > 0){
			$.each(errors, function(index, elem){
				elem.className = 'invalid';
			})
			event.preventDefault();
			submitBtn.className = 'disabled'
		}
	})

// показать скрыть tooltip
	$('.tip_btn').click(function(event){
		event.stopPropagation();
		$('.tip_msg').show();
	})
	$('body:not(".tip_btn")').click(function(event){
		$('.tip_msg').hide();
	})

	// Как только в инпуте набирается 4 символа, то фокус переходит на следующий инпут
	$('.card_number input').on('input', function () {
		$item = $(this);
		$index = $item.index();
		$value = $item.val();
		if($value.length > 3){
			if($index < 3){
				$(this).next().focus();
			}
			else{
				$item.blur()
			}
		}
		

	});

	function validate(elem, pattern){
		var res = pattern.test(elem.value);

		if (!res) {
			elem.className = "invalid";
			submitBtn.className = 'disabled'
			if(errors.index(elem) === -1){
				errors.push(elem)
			}		
		} 
		else{
			errors = errors.filter(function(index, element){
				return elem !== element
			})
			elem.className = 'valid';
			if(errors.length == 0){
				submitBtn.className = 'valid'
			}
		}
		
	}
});


