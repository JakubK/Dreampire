const scrollers = document.getElementsByClassName('gallery');

const calculateNavVisibility = (i) => {
    const scrollerContent = scrollers[i].getElementsByClassName('gallery__scroller')[0];
    const scrollerBtns = scrollers[i].getElementsByClassName('gallery__btn');

    console.log(scrollerContent.scrollWidth);
    console.log(scrollerContent.scrollLeft + scrollerContent.clientWidth);

    if (scrollerContent.scrollLeft <= 0)
        scrollerBtns[0].classList.add('gallery__btn--hidden');
    else
        scrollerBtns[0].classList.remove('gallery__btn--hidden');
    if (scrollerContent.scrollWidth <= scrollerContent.scrollLeft + scrollerContent.clientWidth)
        scrollerBtns[1].classList.add('gallery__btn--hidden');
    else
        scrollerBtns[1].classList.remove('gallery__btn--hidden');
}

window.addEventListener('resize', () => {
    for (let i = 0; i < scrollers.length; i++)
        calculateNavVisibility(i);
})

for (let i = 0; i < scrollers.length; i++) {
    calculateNavVisibility(i);
    const scrollerContent = scrollers[i].getElementsByClassName('gallery__scroller')[0];
    const scrollerBtns = scrollers[i].getElementsByClassName('gallery__btn');
    for (let j = 0; j < 2; j++) {
        const elementWidth = scrollerContent.getElementsByClassName('gallery__item')[0].clientWidth;
        scrollerBtns[j].addEventListener('click', () => {
            scrollerContent.scrollTo({
                behavior: "smooth",
                left: scrollerContent.scrollLeft + elementWidth * Math.pow(-1, j + 1)
            })

            setTimeout(() => calculateNavVisibility(i), 500)
        });
    }
}
