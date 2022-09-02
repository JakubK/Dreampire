const itemSpacing = 32;
const galleries = document.getElementsByClassName('gallery');
const galleryContents = Array.from(galleries).map(x => x.getElementsByClassName('gallery__content')[0]);

let galleryDimensions = galleryContents.map(x => x.scrollWidth);

const getSingleElementWidth = () => galleryContents[0].getElementsByClassName('gallery-item')[0].clientWidth;

let singleElementWidth = getSingleElementWidth();

addEventListener('resize', () => {
    galleryDimensions = galleryContents.map(x => x.scrollWidth);

    singleElementWidth = getSingleElementWidth();


    for(let i = 0;i < galleryContents.length; i++)  {
        calculateNavVisibility(i);
        galleryContents[i].style.left = '0px';
    }
});

const calculateNavVisibility = (i) => {
    const firstItemRect = galleryContents[i].children[0].getBoundingClientRect();
    const lastItemRect = galleryContents[i].children[galleryContents[i].childElementCount - 1].getBoundingClientRect();

    const [left, right] = galleries[i].getElementsByClassName('gallery__btn');
    const leftRect = left.getBoundingClientRect();
    const rightRect = right.getBoundingClientRect();

    if(leftRect.left + leftRect.width/2 > firstItemRect.left && firstItemRect.left < 0)
        left.classList.remove('gallery__btn--hidden');
    else 
        left.classList.add('gallery__btn--hidden');

    if(rightRect.right + rightRect.width/2 < lastItemRect.right) 
        right.classList.remove('gallery__btn--hidden');
     else 
        right.classList.add('gallery__btn--hidden');
}


const translateGallery = (direction, i) => {
    const left = +getComputedStyle(galleryContents[i]).getPropertyValue('left').split('px')[0];
    let newLeftRaw = Math.trunc(left + (singleElementWidth + itemSpacing) * direction);

    const galleryLeftCorner = 0;
    const galleryRightCorner = -(galleryDimensions[i] - galleries[0].clientWidth);

    if(newLeftRaw > galleryLeftCorner)
        newLeftRaw = galleryLeftCorner;
    if(newLeftRaw < galleryRightCorner)
        newLeftRaw = galleryRightCorner;

    galleryContents[i].style.left = newLeftRaw + 'px';
    setTimeout(() => {
        calculateNavVisibility(i);
    }, 500);
}

for(let i = 0;i < galleries.length;i++) {
    const galleryNav = galleries[i].getElementsByClassName('gallery__btn');
    galleryNav[0].addEventListener('click', () => translateGallery(1, i));
    galleryNav[1].addEventListener('click', () => translateGallery(-1, i));

    calculateNavVisibility(i);
}
