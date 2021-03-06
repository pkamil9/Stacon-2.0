// IntersectionObserver for NavBar
const navBar = document.querySelector('.navbar');
const sectionOne = document.querySelector('#start');

const heightBeforeScroll = '100px';
const heightAfterScroll = '60px';

const sectionOneOptions = {
	rootMargin: '-150px 0px 0px 0px',
};
const threshold = { threshold: 0.4 };

const sectionOneObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			navBar.style.height = heightAfterScroll;
		} else {
			navBar.style.height = heightBeforeScroll;
		}
	});
}, sectionOneOptions);
sectionOneObserver.observe(sectionOne);

// IntersectionObserver for Info Banner
const infoBannerItems = document.querySelectorAll('.info__banner-item');
const animationInfoBanner = 'info__banner-item--animation';

const infoBannerItemsObserver = new IntersectionObserver(
	(entries, infoBannerItemsObserver) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(animationInfoBanner);
				infoBannerItemsObserver.unobserve(entry.target);
			}
		});
	},
	threshold
);
infoBannerItems.forEach((item) => {
	infoBannerItemsObserver.observe(item);
});

// IntersectionObserver for Gallery
const galleryMain = document.querySelector('.gallery__main');
const galleryImgs = document.querySelector('.gallery__imgs');

const animationGalleryMain = 'gallery__main--animation';
const animationGalleryImgs = 'gallery__imgs--animation';

const galleryMainObserver = new IntersectionObserver(
	(entries, galleryMainObserver) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(animationGalleryMain);
				galleryMainObserver.unobserve(entry.target);
			}
		});
	},
	threshold
);
galleryMainObserver.observe(galleryMain);

const galleryImgsObserver = new IntersectionObserver(
	(entries, galleryImgsObserver) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(animationGalleryImgs);
				galleryImgsObserver.unobserve(entry.target);
			}
		});
	},
	threshold
);
galleryImgsObserver.observe(galleryImgs);

// IntersectionObserver for Contact
const contactAddres = document.querySelector('.contact__addres');
const contactForm = document.querySelector('.contact__form');

const animationContactAddres = 'contact__addres--animation';
const animationContactForm = 'contact__form--animation';

const contactAddresObserver = new IntersectionObserver(
	(entries, contactAddresObserver) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(animationContactAddres);
				contactAddresObserver.unobserve(entry.target);
			}
		});
	},
	threshold
);
const contactFormObserver = new IntersectionObserver(
	(entries, contactFormObserver) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add(animationContactForm);
				contactFormObserver.unobserve(entry.target);
			}
		});
	},
	threshold
);
contactAddresObserver.observe(contactAddres);
contactFormObserver.observe(contactForm);

// Nav hamburger

const hamburger = document.querySelector('.navbar__hamburger');
const sideNav = document.querySelector('.sideNav');
const sideNavLinks = document.querySelectorAll('.sideNav__list-items');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('navbar__hamburger--active');
	sideNav.classList.toggle('sideNav--hide');
});

sideNavLinks.forEach((item) => {
	item.addEventListener('click', () => {
		sideNav.classList.add('sideNav--hide');
		hamburger.classList.toggle('navbar__hamburger--active');
	});
});
// Gallery

const mainImg = document.querySelector('#mainIMG');
const imgs = document.querySelectorAll('.gallery__imgs img');

imgs[0].style.opacity = 0.4;

imgs.forEach((img) =>
	img.addEventListener('click', (e) => {
		imgs.forEach((img) => {
			img.style.opacity = 1;
		});

		mainImg.style.opacity = 0;
		setTimeout(() => (mainImg.src = img.dataset.largeImg), 500);
		mainImg.addEventListener('load', () => {
			mainImg.style.opacity = 1;
		});

		e.target.style.opacity = 0.4;
	})
);

galleryMain.addEventListener('contextmenu', (event) => event.preventDefault());

// Form

const form = document.querySelector('.contact__form-form');
const name = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector('#message');

const errorMsg = document.querySelector('.errorMsg');
const successMsg = document.querySelector('.successMsg');

form.addEventListener('submit', (e) => {
	let messages = [];
	if (name.value.length <= 5) {
		messages.push('Nazwa firmy za krótka');
	}
	if (email.value.length <= 7) {
		messages.push('Adres email za krótki');
	}
	if (message.value.length < 10) {
		messages.push('Wiadomość za krótka');
	}

	if (messages.length > 0) {
		e.preventDefault();
		errorMsg.innerText = messages.join(', ');
		errorMsg.style.display = 'block';
		errorMsg.classList.add('fade-in');
		setTimeout(() => errorMsg.classList.remove('fade-in'), 500);
	} else {
		e.preventDefault();
		errorMsg.style.display = 'none';

		let template_params = {
			reply_to: email.value,
			from_name: name.value,
			to_name: 'Stacon',
			message_html: message.value,
		};

		let service_id = 'default_service';
		let template_id = 'template_';

		emailjs.send(service_id, template_id, template_params).then(
			function (response) {
				console.log('SUCCESS!', response.status, response.text);
				successMsg.style.display = 'block';
				form.reset();
				setTimeout(() => (successMsg.style.display = 'none'), 3000);
			},
			function (error) {
				console.error('FAILED...', error);
				errorMsg.style.display = 'block';
				errorMsg.text = 'Wystąpił błąd podczas wysyłania wiadomości.';
			}
		);
	}
});

// Footer

document.getElementById('year').innerHTML = new Date().getFullYear();
