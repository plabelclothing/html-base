document.addEventListener('DOMContentLoaded', () => {
  const selectBox = document.querySelector('.select-box');
  const selectCountryBox = document.querySelector('.select-country-box');
  const modalRegionBg = document.querySelector('.modal-background.region-bg');
  const modalSearchBg = document.querySelector('.modal-background.search-bg');
  const modalRegion = document.querySelector('.modal-region');
  const modalSearch = document.querySelector('.modal-search');
  const accordionTitles = document.querySelectorAll('.accordion .column__title');
  const accordionCountriesTitles = document.querySelectorAll('.modal-region .region__title');
  const accordionAccount = document.querySelectorAll('.account-page .account-menu');
  const languageTitle = document.querySelector('.language .column__title');
  const burgerBtn = document.querySelector('.burger__button');
  const headerCountry = document.querySelector('header .country');
  const modalRegionCloseBtn = document.querySelector('.modal-region__header .close-btn');
  const footerCountry = document.querySelector('footer .country');
  const openSearchModalBtn = document.querySelector('.open-search-modal-btn');

  if (modalSearchBg && modalSearch) {
    modalSearchBg.style.top = `${document.querySelector('header .container').getBoundingClientRect().height + 80}px`;
  }

  const closeModalRegion = () => {
    modalRegion.classList.remove('visible');
    modalRegionBg.classList.remove('visible');

    accordionCountriesTitles.forEach((item) => item.setAttribute('aria-expanded', 'false'));
  };

  const closeModalSearch = () => {
    modalSearch.classList.remove('visible');
    modalSearchBg.classList.remove('visible');
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
  };

  if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
      const { body } = document;
      if (body.classList.contains('open-burger')) {
        closeBurger();
      } else {
        body.classList.add('open-burger');
        body.style.overflow = 'hidden';
      }
    });
  }

  document.querySelectorAll('.burger__menu a').forEach((elem) => elem.addEventListener('click', () => {
    if (document.body.classList.contains('open-burger')) {
      closeBurger();
    }
  }));

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

  accordionCountriesTitles.forEach((item) => item.addEventListener('click', (e) => toggleAccordion(e, accordionCountriesTitles)));

  accordionAccount.forEach((item) => item.addEventListener('click', (e) => toggleAccordion(e, accordionAccount)));

  if (headerCountry) {
    headerCountry.addEventListener('click', () => {
      modalRegion.classList.add('visible');
      modalRegionBg.classList.add('visible');

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
      modalRegionBg.classList.add('visible');
      document.body.style.overflow = 'hidden';
    });
  }

  document.addEventListener('click', (e) => {
    if (modalRegion && modalRegion.classList.contains('visible') && e.target.closest('.modal-background.region-bg')) {
      closeModalRegion();
      window.scrollTo(0, 0);
      document.body.style.overflow = 'auto';
    }
    if (modalSearch && modalSearch.classList.contains('visible') && e.target.closest('.modal-background.search-bg')) {
      closeModalSearch();
    }
  });

  if (openSearchModalBtn) {
    openSearchModalBtn.addEventListener('click', () => {
      if (modalSearch.classList.contains('visible')) {
        closeModalSearch();
      } else {
        modalSearch.classList.add('visible');
        modalSearchBg.classList.add('visible');
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
    modalFilterBg.classList.remove('visible');
  };

  const openModalFilter = () => {
    modalFilter.classList.add('visible');
    modalFilterBg.classList.add('visible');
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
    if (modalFilter && modalFilter.classList.contains('visible') && e.target.closest('.modal-background.filter-bg')) {
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
  if (authorizationInputs.length) {
    authorizationInputs.forEach((elem) => {
      elem.addEventListener('focus', onFocusFunc);
      elem.addEventListener('blur', onBlurFunc);
    });
  }

  // order
  const orderInputs = [...document.querySelectorAll('.order-form__input input')];
  if (orderInputs.length) {
    orderInputs.forEach((elem) => {
      elem.addEventListener('focus', onFocusFunc);
      elem.addEventListener('blur', onBlurFunc);
    });
  }
});
