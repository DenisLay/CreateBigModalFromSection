window.onload = () => {

    const root = document.querySelector('body');
    currentModal = undefined;
    currentModalStartRects = undefined;

    Array.from(document.getElementsByClassName('modal-container')).forEach(item => {
        item.addEventListener('click', () => {
            const rects = item.getClientRects()[0];
            openModal(root, item);
            console.log(rects);
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    })
}

function openModal(root, item) {
    const modal = document.createElement('div');

    const modalInner = document.querySelector('.modal-inner-unvisible');
    const modalTitle = modalInner.querySelector('.modal-title');
    const modalContent = modalInner.querySelector('.modal-content');

    modal.classList.add('modal');

    rects = item.getClientRects()[0];

    modal.style.width = rects.width + 'px'
    modal.style.height = rects.height + 'px';
    modal.style.top = (rects.top + window.scrollY) + 'px';
    modal.style.left = rects.left + 'px';
    //modal.style.backgroundColor = 'gray';
    modal.style.background = getComputedStyle(item).background;

    currentModalStartRects = {
        width: modal.style.width,
        height: modal.style.height,
        top: modal.style.top,
        left: modal.style.left
    };

    /*Array.from(item.children).forEach(child => {
        const clone = child.cloneNode(true);
        modal.appendChild(clone);
    });*/

    root.appendChild(modal);

    const title = document.createElement('div');
    title.classList.add('modal-title');
    title.innerText = modalTitle.innerText;
    const content = document.createElement('div');
    content.classList.add('modal-content');
    Array.from(modalContent.children).forEach(child => {
        const clone = child.cloneNode(true);
        content.appendChild(clone);
    });

    modal.appendChild(title);
    modal.appendChild(content);

    Array.from(item.children).forEach(child => {
        const clone = child.cloneNode(true);
        modal.appendChild(clone);
    });

    root.appendChild(modal);


    modal.style.top = (0 + window.scrollY) + 'px';
    modal.style.left = '0px';
    modal.style.width = '100%';
    modal.style.height = '100vh';
    document.body.style.overflow = 'hidden';

    currentModal = modal;
}

function closeModal() {
    if (currentModal != undefined) {
        currentModal.style.top = currentModalStartRects.top;
        currentModal.style.left = currentModalStartRects.left;
        currentModal.style.width = currentModalStartRects.width;
        currentModal.style.height = currentModalStartRects.height;

        setTimeout(() => {
            currentModal.remove();
            document.body.style.overflow = 'auto';
            currentModal = undefined;
            currentModalStartRects = undefined;
        }, 400);
    }
}