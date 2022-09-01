const galleries = document.getElementsByClassName('gallery');
const galleryContents = Array.from(galleries).map(x => x.getElementsByClassName('gallery__content')[0]);

let galleryWidths = galleryContents.map(x => x.scrollWidth);


let elementWidth = galleryContents[0].getElementsByClassName('gallery-item')[0].clientWidth;
addEventListener('resize', () => {
    galleryWidths = galleryContents.map(x => x.scrollWidth);

    elementWidth = galleryContents[0].getElementsByClassName('gallery-item')[0].clientWidth;
    for(let i = 0;i < galleryContents.length; i++) 
        galleryContents[i].style.left = '0px';
});


const translateGallery = (direction, i) => {
    const left = +getComputedStyle(galleryContents[i]).getPropertyValue('left').split('px')[0];
    let newLeftRaw = Math.trunc(left + (elementWidth + 32) * direction);

    if(newLeftRaw > 0)
        newLeftRaw = 0;

    if(newLeftRaw < -(galleryWidths[i] - galleries[0].clientWidth))
        newLeftRaw = -(galleryWidths[i] - galleries[0].clientWidth);

    galleryContents[i].style.left = newLeftRaw + 'px';
}

for(let i = 0;i < galleries.length;i++) {
    const gallery = galleries[i];
    const galleryNav = gallery.getElementsByClassName('gallery__btn');
    galleryNav[0].addEventListener('click', () => translateGallery(1, i));
    galleryNav[1].addEventListener('click', () => translateGallery(-1, i));
}

