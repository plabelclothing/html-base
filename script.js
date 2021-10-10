document.addEventListener('DOMContentLoaded', () => {
  const selectBox = document.querySelector('.select-box');
  const selectCountryBox = document.querySelector('.select-country-box');
  const modalRegionBg = document.querySelector('.modal-background.region-bg');
  const modalSearchBg = document.querySelector('.modal-background.search-bg');
  const modalBurgerBg = document.querySelector('.modal-background.burger-bg');
  const modalRegion = document.querySelector('.modal-region');
  const modalSearch = document.querySelector('.modal-search');
  const modalBurger = document.querySelector('.burger-modal');
  const modalProduct = document.querySelector('.modal-product');
  const accordionTitles = document.querySelectorAll('.accordion .column__title');
  const accordionCountriesTitles = document.querySelectorAll('.region__title');
  const accordionBurgerItems = document.querySelectorAll('.burger_item_dual');
  const languageTitle = document.querySelector('.language .column__title');
  const burgerBtn = document.querySelector('.burger__button');
  const headerCountry = document.querySelector('header .country');
  const modalRegionCloseBtn = document.querySelector('.modal-region__header .close-btn');
  const footerCountry = document.querySelector('footer .country');
  const openSearchModalBtn = document.querySelector('.open-search-modal-btn');
  const modalProductBtn = document.querySelector('.open-mp-btn');
  const closeModalProductBtn = document.querySelector('.modal-product .close-btn');
  const regionBurgerSection = document.querySelector('.burger_region .burger_item_dual');
  const languageBurgerSection = document.querySelector('.language .burger_item_dual');
  const logoIcon = document.querySelector('.container__nav-bar .logo img');
  const cartIcon = document.querySelector('.nav_icon.cart img');

  if (modalSearchBg && modalSearch) {
    modalSearchBg.style.top = `${document.querySelector('header .container').getBoundingClientRect().height}px`;
  }

  const openModalProduct = () => {
    modalProduct.classList.add('visible');
    document.body.style.overflow = 'hidden';
    modalProduct.addEventListener('transitioned', () => { modalProduct.style.overflow = 'auto'; });
  };

  const closeModalProduct = () => {
    modalProduct.classList.remove('visible');
    document.body.style.overflow = 'auto';
    modalProduct.style.overflow = 'hidden';
  };

  if (closeModalProductBtn) closeModalProductBtn.addEventListener('click', () => closeModalProduct());

  if (modalProductBtn) {
    modalProductBtn.addEventListener('click', () => (modalProduct.classList.contains('visible') ? closeModalProduct : openModalProduct)());
  }

  document.querySelectorAll('.modal-product li.product-menu_item').forEach((elem) => elem.addEventListener('click', () => {
    closeModalProduct();
  }));

  const closeModalRegion = () => {
    modalRegion.classList.remove('visible');
    modalRegionBg.classList.remove('mbg-opacity');
    modalRegionBg.addEventListener('transitionend', () => {
      modalRegionBg.classList.remove('mbg-display');
    });
    accordionCountriesTitles.forEach((item) => item.setAttribute('aria-expanded', 'false'));
  };

  const closeModalSearch = () => {
    modalSearch.classList.remove('visible');
    modalSearchBg.classList.remove('mbg-opacity');
    modalSearchBg.addEventListener('transitionend', () => {
      modalSearchBg.classList.remove('mbg-display');
    });
  };

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.select-box') && selectBox) selectBox.classList.remove('visible');
    if (!e.target.closest('.select-country-box') && selectCountryBox) selectCountryBox.classList.remove('visible');
  });

  if (selectBox) {
    selectBox.addEventListener('click', (e) => {
      if (!e.target.classList.contains('select-box__input')) selectBox.classList.toggle('visible');
    });
  }

  if (selectCountryBox) {
    selectCountryBox.addEventListener('click', (e) => {
      if (!e.target.classList.contains('select-country-box__input')) selectCountryBox.classList.toggle('visible');
    });
  }

  const closeBurger = () => {
    document.body.classList.remove('open-burger');
    document.body.style.overflow = 'auto';
    logoIcon.setAttribute('src', 'assets/images/logo.svg');
    cartIcon.setAttribute('src', 'assets/images/icons-cart.svg');
    setTimeout(() => modalBurgerBg.classList.remove('mbg-display'), 400);
  };

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const { body } = document;
      if (body.classList.contains('open-burger')) {
        closeBurger();
      } else {
        body.classList.add('open-burger');
        body.style.overflow = 'hidden';
        modalBurgerBg.classList.add('mbg-display');
        logoIcon.setAttribute('src', 'assets/images/logo-white.svg');
        cartIcon.setAttribute('src', 'assets/images/icons-cart-white.svg');
      }
    });
  }

  if (modalBurgerBg && modalBurger) {
    document.querySelectorAll('.burger_item a')
      .forEach((elem) => elem.addEventListener('click', () => {
        if (document.body.classList.contains('open-burger')) {
          closeBurger();
        }
      }));

    document.querySelectorAll('.burger_subitem.item-with-link')
      .forEach((elem) => elem.addEventListener('click', () => {
        if (document.body.classList.contains('open-burger')) {
          closeBurger();
        }
      }));

    modalBurger.addEventListener('click', (e) => {
      if (e.target.closest('.region .burger_sub-subitem') && e.target.closest('.burger_sub-subitem')) {
        regionBurgerSection.setAttribute('aria-expanded', 'false');
      } else if (e.target.closest('.language .burger_subitem')) {
        languageBurgerSection.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function toggleAccordion(e, arr) {
    const target = e.currentTarget;

    arr.forEach((item) => {
      if (item !== target) {
        item.setAttribute('aria-expanded', 'false');
      }
    });

    if (target.getAttribute('aria-expanded') === 'true') {
      target.setAttribute('aria-expanded', 'false');
    } else {
      target.setAttribute('aria-expanded', 'true');
    }
  }

  accordionTitles.forEach((item) => item.addEventListener('click', (e) => toggleAccordion(e, accordionTitles)));

  accordionBurgerItems.forEach((item) => item.addEventListener('click', (e) => toggleAccordion(e, accordionBurgerItems)));

  accordionCountriesTitles.forEach((item) => item.addEventListener('click', (e) => toggleAccordion(e, accordionCountriesTitles)));

  if (headerCountry) {
    headerCountry.addEventListener('click', () => {
      modalRegion.classList.add('visible');
      modalRegionBg.classList.add('mbg-display');
      modalRegionBg.classList.add('mbg-opacity');

      document.addEventListener('scroll', () => {
        if (modalRegion.classList.contains('visible')) {
          const elemBottom = document.querySelector('.modal-region').getBoundingClientRect().height - 163;
          if (elemBottom <= window.pageYOffset) closeModalRegion();
        }
      });
    });
  }

  if (modalRegionCloseBtn) {
    modalRegionCloseBtn.addEventListener('click', () => {
      closeModalRegion();
      document.body.style.overflow = 'auto';
    });
  }

  document.querySelectorAll('.modal-region .region li').forEach((elem) => elem.addEventListener('click', () => {
    closeModalRegion();
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
  }));

  document.addEventListener('scroll', () => {
    if (modalSearch.classList.contains('visible')) {
      const elemBottom = document.querySelector('.modal-search').getBoundingClientRect().height - 150;
      if (elemBottom <= window.pageYOffset) closeModalSearch();
    }
  });

  if (footerCountry) {
    footerCountry.addEventListener('click', () => {
      modalRegion.classList.add('visible');
      modalRegionBg.classList.add('mbg-display');
      modalRegionBg.classList.add('mbg-opacity');
      document.body.style.overflow = 'hidden';
    });
  }

  document.addEventListener('click', (e) => {
    if (modalRegion && modalRegion.classList.contains('visible') && e.target.closest('.modal-background.region-bg')) {
      closeModalRegion();
      window.scrollTo(0, 0);
      document.body.style.overflow = 'auto';
    }
    if (modalSearch && modalSearch.classList.contains('visible') && !(e.target.closest('.modal-search label')) && !(e.target.closest('.open-search-modal-btn'))) {
      closeModalSearch();
    }
    if (modalProduct && modalProduct.classList.contains('visible') && !(e.target.closest('.modal-product')) && !(e.target.closest('.open-mp-btn'))) {
      closeModalProduct();
    }
  });

  if (openSearchModalBtn) {
    openSearchModalBtn.addEventListener('click', () => {
      if (modalSearch.classList.contains('visible')) {
        closeModalSearch();
      } else {
        modalSearch.classList.add('visible');
        modalSearchBg.classList.add('mbg-display');
        modalSearchBg.classList.add('mbg-opacity');
      }
    });
  }

  document.querySelectorAll('footer .language label').forEach((elem) => elem.addEventListener('click', () => {
    languageTitle.setAttribute('aria-expanded', 'false');
  }));

  // product page

  const modalFilter = document.querySelector('.modal-filter');
  const modalFilterBg = document.querySelector('.modal-background.filter-bg');
  const accordionFilterTitles = document.querySelectorAll('.modal-filter__main-item .title');
  // const filterContainer = document.querySelector('.filter .container');

  // if (modalFilterBg && filterContainer) {
  //   modalFilterBg.style.top = `${filterContainer.getBoundingClientRect().bottom + 50}px`;
  // }

  const closeModalFilter = () => {
    modalFilter.classList.remove('visible');
    setTimeout(() => {
      modalFilter.style.display = 'none';
    }, 400);
    modalFilterBg.classList.remove('mbg-display');
    modalFilterBg.classList.remove('mbg-opacity');
  };

  const openModalFilter = () => {
    modalFilterBg.style.top = `${document.querySelector('.filter .tb-border .container').getBoundingClientRect().bottom}px`;
    modalFilter.style.display = 'block';
    modalFilter.classList.add('visible');
    modalFilterBg.classList.add('mbg-display');
    modalFilterBg.classList.add('mbg-opacity');
  };

  if (document.querySelector('.hide-filter-btn')) {
    document.querySelector('.hide-filter-btn').addEventListener('click', () => {
      closeModalFilter();
    });
  }

  if (document.querySelector('.filter-btn')) {
    document.querySelector('.filter-btn').addEventListener('click', () => {
      (modalFilter.classList.contains('visible') ? closeModalFilter : openModalFilter)();
    });
  }

  document.addEventListener('click', (e) => {
    if (modalFilter && modalFilter.classList.contains('visible') && !(e.target.closest('.modal-filter')) && !(e.target.closest('.filter-btn'))) {
      closeModalFilter();
    }
  });

  function toggleFilterAccordion(e) {
    const target = e.currentTarget;

    accordionFilterTitles.forEach((item) => {
      if (item !== target) {
        item.setAttribute('aria-expanded', 'false');
      }
    });

    if (target.getAttribute('aria-expanded') === 'true') {
      target.setAttribute('aria-expanded', 'false');
    } else {
      target.setAttribute('aria-expanded', 'true');
    }
  }

  accordionFilterTitles.forEach((item) => item.addEventListener('click', toggleFilterAccordion));

  // authorization
  const onFocusFunc = (e) => e.target.classList.add('up');
  const onBlurFunc = (e) => {
    const { target } = e;
    if (!target.value) target.classList.remove('up');
  };

  const authorizationInputs = [...document.querySelectorAll('.form-fields__input input')];

  function addEventsForInputs(arr) {
    if (arr.length) {
      arr.forEach((elem) => {
        elem.addEventListener('focus', onFocusFunc);
        elem.addEventListener('blur', onBlurFunc);
      });
    }
  }

  addEventsForInputs(authorizationInputs);

  // order
  const orderInputs = [...document.querySelectorAll('.order-form__input input')];
  addEventsForInputs(orderInputs);

  // account
  const accountInputs = [...document.querySelectorAll('.account-info__input input')];
  addEventsForInputs(accountInputs);

  // support
  const supportInputs = [...document.querySelectorAll('.support-form__input input')];
  addEventsForInputs(supportInputs);
});

// add to cart button
const addToCartBtn = document.querySelector('.container__product-block .black-btn');
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    e.currentTarget.classList.remove('done');
    setTimeout(() => btn.classList.add('done'), 0);
  });
}
