'use strict';

;( function( $, window, document, undefined )
{
	$( '.inputfile' ).each( function()
	{
		var $input	 = $( this ),
			$label	 = $input.next( 'label' ),
			labelVal = $label.html();

		$input.on( 'change', function( e )
		{
			var fileName = '';

			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else if( e.target.value )
				fileName = e.target.value.split( '\\' ).pop();

            // console.log(fileName);
			if( fileName )
				$label.find( 'span' ).html( fileName );
			else
				$label.html( labelVal );
		});

		// Firefox bug fix
		$input
		.on( 'focus', function(){ $input.addClass( 'has-focus' ); })
		.on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
	});
})( jQuery, window, document );

$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

function formSubmit() {
    // console.log( $( "#form" ).serialize() );
}
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

$(document).ready(function () {
    // $("#submit").сlick( function( event ) {
    //     // event.preventDefault();
    //     console.log( $( "#form" ).serialize() );
    //     console.log("Click");
    //   });

    $('#form-submit').addClass('disabled');
	
    var elements = $('.validation').length;
    var valid = 0;
	
	$('.validation').on('input', function() {
        // console.log(this.name);
        var isValid = false;
        switch (this.name) {
            case 'SenderEmail':
                isValid = isEmail(this.value);
                // console.log(isValid);
                break;
            case 'SenderName':
                isValid = this.value.length > 0;
                break;
            default:
                isValid = true;
                break;
        }
        if (isValid) {
            $(this).addClass('valid');
        } else {
            $(this).removeClass('valid');            
        }
        if($('.valid').length == elements) {
            $('#form-submit').removeClass('disabled');
            $('#form-message').addClass('hide');
        } else {
            $('#form-submit').addClass('disabled');
        }
    });

    $('#form-submit').click(function (e) {
        e.preventDefault(); 
        // console.log("clicl");
        if ($('.valid').length != elements) {
            $('#form-message').removeClass('hide');
        } else {
            $('#form-submit').prop('disabled', true);
            $('#form-submit').val("Подождите...");
            // var formData = new FormData(this);
            // var formData = new FormData(this);
            // console.log(formData);

            var form = $('form')[0]; // You need to use standard javascript object here
            var formData = new FormData(form);
            // var formData = new FormData();
            // formData.append('section', 'general');
            // formData.append('action', 'previewImg');
            // Attach file
            // formData.append('Attachment', $("#Attachment").prop('files')[0]);
            formData.append('image', $('input[type=file]')[0].files[0]); 
            $.ajax({
                url: "https://devandprod.ru/mail",
                data: formData,//$(this).serialize(),
                type: 'POST',
                contentType: false,
                processData: false,
              }).done(function(data) {
                $("#submit-success").addClass('show');
                yaCounter49127821.reachGoal('FORM_SUBMIT');
                // console.log(data);
              }).fail(function(data) {
                $("#submit-success").addClass('show');
                $("#success-info").addClass('remove');
                $("#error-info").removeClass('remove');
                // console.log('fail');
                // console.log(data);
              });
        }
    });

    if( !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        $('.js-tilt').tilt({
            perspective: 1500,
        });
    }
    $('#select-portfolio').click(function () {
        // console.log('toggle');
        $('#select-portfolio').toggleClass('active');
        $('#portfolio-self').toggleClass('remove');
        $('#portfolio-commerce').toggleClass('remove');
    });
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
    });
    var isTouched = false;
    $(window).scroll(function(){
        if (!isTouched && $('#Content').isOnScreen()) {
            isTouched = true;
            $("#SenderName").focus();
        } else {
        }
    });
});
