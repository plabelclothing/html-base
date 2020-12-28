document.addEventListener("DOMContentLoaded", () => {
    const selectBox = document.querySelector('.select-box');
    const selectCountryBox = document.querySelector('.select-country-box');
    const modalRegionBg = document.querySelector('.modal-background.region-bg');
    const modalSearchBg = document.querySelector('.modal-background.search-bg');
    const modalRegion = document.querySelector('.modal-region');
    const modalSearch = document.querySelector('.modal-search');
    const accordionTitles = document.querySelectorAll('.accordion .column__title');
    const accordionCountriesTitles = document.querySelectorAll('.modal-region .region__title');
    const languageTitle = document.querySelector('.language .column__title');

    if (modalSearchBg && modalSearch) {
        modalSearchBg.style.top = `${document.querySelector('header .container').getBoundingClientRect().height + 80}px`;
    }

    const closeModalRegion = () => {
        modalRegion.classList.remove('visible');
        modalRegionBg.classList.remove('visible');
        
        for (i = 0; i < accordionCountriesTitles.length; i++) {
            accordionCountriesTitles[i].setAttribute('aria-expanded', 'false');
        }
    }

    const closeModalSearch = () => {
        modalSearch.classList.remove('visible');
        modalSearchBg.classList.remove('visible');
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.select-box')) selectBox.classList.remove('visible');
        if (!e.target.closest('.select-country-box') && selectCountryBox) selectCountryBox.classList.remove('visible');
    })

    selectBox.addEventListener('click', (e) => {
        if (!e.target.classList.contains('select-box__input')) selectBox.classList.toggle('visible');
    })

    selectCountryBox && selectCountryBox.addEventListener('click', (e) => {
        if (!e.target.classList.contains('select-country-box__input')) selectCountryBox.classList.toggle('visible');
    })

    document.querySelector('.burger__button').addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('open-burger')) {
            body.classList.remove('open-burger');
            document.body.style.overflow = 'auto';
        } else {
            body.classList.add('open-burger');
            document.body.style.overflow = 'hidden';
        }
    })

    function toggleAccordion(e) {
        const target = e.currentTarget;

        for (i = 0; i < accordionTitles.length; i++) {
            if(accordionTitles[i] !== target) {
                accordionTitles[i].setAttribute('aria-expanded', 'false');
            }
        }

        if (target.getAttribute('aria-expanded') == 'true') {
            target.setAttribute('aria-expanded', 'false');
        } else {
            target.setAttribute('aria-expanded', 'true');
        }
    }

    accordionTitles.forEach(item => item.addEventListener('click', toggleAccordion));

    function toggleCountriesAccordion(e) {
        const target = e.currentTarget;
        
        for (i = 0; i < accordionCountriesTitles.length; i++) {
            if (accordionCountriesTitles[i] !== target) {
                accordionCountriesTitles[i].setAttribute('aria-expanded', 'false');
            }
        }

        if (target.getAttribute('aria-expanded') == 'true') {
            target.setAttribute('aria-expanded', 'false');
        } else {
            target.setAttribute('aria-expanded', 'true');
        }
    }

    accordionCountriesTitles.forEach(item => item.addEventListener('click', toggleCountriesAccordion));

    document.querySelector('header .country').addEventListener('click', () => {
        modalRegion.classList.add('visible');
        modalRegionBg.classList.add('visible');

        document.addEventListener('scroll', () => {
            if (modalRegion.classList.contains('visible')) {
                const elemBottom = document.querySelector('.modal-region').getBoundingClientRect().height - 163;
                if (elemBottom <= window.pageYOffset) closeModalRegion();
            }
        });
    })

    document.querySelector('.modal-region__header .close-btn').addEventListener('click', () => {
        closeModalRegion();
        document.body.style.overflow = 'auto';
    })

    document.querySelectorAll('.modal-region .region li').forEach(elem => elem.addEventListener('click', () => {
        closeModalRegion();
        document.body.style.overflow = 'auto';
    }))

    document.addEventListener('scroll', () => {
        if (modalSearch.classList.contains('visible')) {
            const elemBottom = document.querySelector('.modal-search').getBoundingClientRect().height;
            if (elemBottom <= window.pageYOffset) closeModalSearch();
        }
    })

    document.querySelector('footer .country').addEventListener('click', () => {
        modalRegion.classList.add('visible');
        modalRegionBg.classList.add('visible');
        document.body.style.overflow = 'hidden';
    })

    document.addEventListener('click', (e) => {
        if (modalRegion.classList.contains('visible') && e.target.closest('.modal-background.region-bg')) {
            closeModalRegion();
            document.body.style.overflow = 'auto';
        };
        if (modalSearch.classList.contains('visible') && e.target.closest('.modal-background.search-bg')) {
            closeModalSearch();
        };
    })

    document.querySelector('.open-search-modal-btn').addEventListener('click', () => {
        if (modalSearch.classList.contains('visible')) {
            closeModalSearch()
        } else {
            modalSearch.classList.add('visible')
            modalSearchBg.classList.add('visible');
        }
    })

    document.querySelectorAll('footer .language label').forEach(elem => elem.addEventListener('click', () => {
        languageTitle.setAttribute('aria-expanded', 'false');
    }))

    // product page 

    const modalFilter = document.querySelector('.modal-filter');
    const modalFilterBg = document.querySelector('.modal-background.filter-bg');
    const accordionFilterTitles = document.querySelectorAll('.modal-filter__main-item .title');
    const filterContainer = document.querySelector('.filter .container');

    if (modalFilterBg && filterContainer) {
        modalFilterBg.style.top = `${filterContainer.getBoundingClientRect().bottom + 50}px`;
    };

    const closeModalFilter = () => {
        modalFilter.classList.remove('visible');
        modalFilterBg.classList.remove('visible');
    }

    const openModalFilter = () => {
        modalFilter.classList.add('visible');
        modalFilterBg.classList.add('visible');
    }

    document.querySelector('.hide-filter-btn') && document.querySelector('.hide-filter-btn').addEventListener('click', () => {
        closeModalFilter();
    })

    document.querySelector('.filter-btn') && document.querySelector('.filter-btn').addEventListener('click', () => {
        modalFilter.classList.contains('visible') ? closeModalFilter() : openModalFilter();
    })

    document.addEventListener('click', (e) => {
        if (modalFilter && modalFilter.classList.contains('visible') && e.target.closest('.modal-background.filter-bg')) {
            closeModalFilter();
        };
    })

    function toggleFilterAccordion(e) {
        const target = e.currentTarget;
        
        for (i = 0; i < accordionFilterTitles.length; i++) {
            if (accordionFilterTitles[i] !== target) {
                accordionFilterTitles[i].setAttribute('aria-expanded', 'false');
            }
        }

        if (target.getAttribute('aria-expanded') == 'true') {
            target.setAttribute('aria-expanded', 'false');
        } else {
            target.setAttribute('aria-expanded', 'true');
        }
    }

    accordionFilterTitles.forEach(item => item.addEventListener('click', toggleFilterAccordion));
})
