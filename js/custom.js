$(function () {
	"use strict";

	$( document ).ready(function() {
		$(function(){
			$("#header-navbar").load("./components/header.html", ()=>{
				if (parseInt(localStorage.getItem('login'))) {
					let  customerInfo = JSON.parse(localStorage.getItem('customer'));
					$('#customer-menu').html(`
						<a href="#" id="logout"><span class="user_icon"><i class="fa fa-user" aria-hidden="true"></i></span>${customerInfo.name}</a>
					`)
				}

				$('#logout').on('click', ()=> {
					localStorage.setItem('login', 0);
					localStorage.setItem('customer', JSON.stringify({}));

					$('#customer-menu').html(`
						<a href="#" data-toggle="modal" data-target="#loginModal"><span class="user_icon"><i class="fa fa-user" aria-hidden="true"></i></span>Login</a>
				`	)
				})
			});
		});

		if ($('#coffee-offer__items').length) {
			$.getJSON('./data/coffee-offer.json', function(response) {
				$.each( response, (index, offer) => {
					let template= `
					<div class="col-lg-3 col-md-6">
                    	<div class="coffee_img">
                    		<img src="${offer.image}" alt="${offer.title}">
                    	</div>
                        <h3 class="types_text">${offer.title}</h3>
                        <p class="looking_text">${offer.description}</p>
                        <div class="read_bt"><a href="${offer.url ? offer.url : '#'}">Read More</a></div>
                    </div>
				`;

					$('#coffee-offer__items').append(template);
				});
			})
				.done(function() {
					$('#coffee-offer__items').slick({
						dots: false,
						infinite: true,
						speed: 300,
						slidesToShow: 4,
						slidesToScroll: 1,
						prevArrow: `<a class="carousel-control-prev" href="#" role="button" data-slide="prev">
               							<i class="fa fa-arrow-left"></i>
               						</a>`,
						nextArrow: `<a class="carousel-control-next" href="#" role="button" data-slide="next">
										<i class="fa fa-arrow-right"></i>
									</a>`,
						appendArrows: "#main_slider",
						responsive: [

							{
								breakpoint: 1024,
								settings: {
									arrows: false,
									slidesToShow: 2,
									slidesToScroll: 2,
								}
							}
						]
					});
				});
		}

		if ($('#customer-reviews').length) {
			$.getJSON('./data/customer-reviews.json', function(response) {
				$.each( response, (index, review) => {
					let template= `
					<div class="client_taital_main">
					  <div class="client_left">
						 <div class="client_img">
						 	<img src="${review.avatar}" alt="${review.name}">
						 </div>
					  </div>
					  <div class="client_right">
						 <h3 class="moark_text">${review.name}</h3>
						 <p class="client_text">${review.response}</p>
					  </div>
				   </div>
				`;


					$('#customer-reviews').append(template);
				});
			});
		}

		if ($('#blog-posts').length) {
			$.getJSON('./data/blog-posts.json', function(response) {
				$.each( response, (index, post) => {
					let template= `
					<div class="col-md-6">
						<div class="blog_box">
							<div class="blog_img"><img src="${post.image}" alt="${post.title}"></div>
							<h4 class="date_text">${post.datePosted}</h4>
							<h4 class="prep_text">${post.title}</h4>
							<p class="lorem_text">${post.description}</p>
						</div>
						 <div class="read_bt"><a href="${post.url ? post.url : './blog.html'}">Read More</a></div>
					</div>
				`;


					$('#blog-posts').append(template);
				});
			});
		}

		$('#login').on('click', ()=> {
			$(".login-form").validate()
			if ($(".login-form").valid()) {
				$('#loginModal').modal('hide')
				// set the item in localStorage
				localStorage.setItem('login', 1);
				localStorage.setItem('customer', JSON.stringify(
					{
						name: $('#customer-name').val(),
					}
				));
			}
		})

	});

});