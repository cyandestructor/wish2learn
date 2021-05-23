/*
    <div class="col-12 mt-3">
        <div class="card mb-3">
            <div class="card-body">
            <h5 class="card-title">Sección 1: Lección 1</h5>
            <form id="s0l0" class="lessonForm">
                <div class="mb-2">
                <label class="form-label">Título</label>
                <input name="title" type="text" class="form-control">
                </div>
                <div class="mb-2">
                    <label class="form-label">Texto</label>
                    <textarea name="text" class="form-control" cols="30" rows="5"></textarea>
                </div>
            </form>
            <button class="btn btn-primary mt-3">Guardar Lección</button>
            </div>
        </div>
    </div>
*/
const createLessonCard = (sectionCount, lessonCount) => {
    let outer = document.createElement('div');
    outer.classList.add('col-12', 'mt-3');

    let card = document.createElement('div');
    card.classList.add('card', 'mb-3');

    let body = document.createElement('div');
    body.classList.add('card-body');

    let title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = `Sección ${+sectionCount + 1}: Lección ${
        +lessonCount + 1
    }`;
    body.appendChild(title);

    let lessonForm = document.createElement('form');
    lessonForm.classList.add('lessonForm', 'mb-2');
    lessonForm.id = `s${sectionCount}l${lessonCount}`;

    let titleInputContainer = document.createElement('div');
    titleInputContainer.classList.add('mb-2');

    let titleLabel = document.createElement('label');
    titleLabel.classList.add('form-label');
    titleLabel.innerHTML = 'Título';
    titleInputContainer.appendChild(titleLabel);

    let titleInput = document.createElement('input');
    titleInput.classList.add('form-control');
    titleInput.name = 'title';
    titleInput.type = 'text';
    titleInputContainer.appendChild(titleInput);

    lessonForm.appendChild(titleInputContainer);

    let textInputContainer = document.createElement('div');
    textInputContainer.classList.add('mb-2');

    let textLabel = document.createElement('label');
    textLabel.classList.add('form-label');
    textLabel.innerHTML = 'Texto';
    textInputContainer.appendChild(textLabel);

    let textInput = document.createElement('textarea');
    textInput.classList.add('form-control');
    textInput.name = 'title';
    textInput.cols = 30;
    textInput.rows = 5;
    textInputContainer.appendChild(textInput);

    lessonForm.appendChild(textInputContainer);

    //
    let textFormCheck = document.createElement('div');
    textFormCheck.classList.add('form-check');

    let textRadio = document.createElement('input');
    textRadio.classList.add('form-check-input');
    textRadio.type = 'radio';
    textRadio.name = 'type';
    textRadio.id = `s${sectionCount}l${lessonCount}textRadio`;
    textRadio.value = 2;
    textRadio.checked = true;
    textFormCheck.appendChild(textRadio);

    let textRadioLabel = document.createElement('label');
    textRadioLabel.classList.add('form-check-label');
    textRadioLabel.htmlFor = `s${sectionCount}l${lessonCount}textRadio`;
    textRadioLabel.innerHTML = 'Sin video';
    textFormCheck.appendChild(textRadioLabel);

    lessonForm.appendChild(textFormCheck);
    //

    let videoFormCheck = document.createElement('div');
    videoFormCheck.classList.add('form-check');

    let videoRadio = document.createElement('input');
    videoRadio.classList.add('form-check-input');
    videoRadio.type = 'radio';
    videoRadio.name = 'type';
    videoRadio.id = `s${sectionCount}l${lessonCount}videoRadio`;
    videoRadio.value = 1;
    videoFormCheck.appendChild(videoRadio);

    let videoLabel = document.createElement('label');
    videoLabel.classList.add('form-check-label');
    videoLabel.htmlFor = `s${sectionCount}l${lessonCount}videoRadio`;
    videoLabel.innerHTML = 'Con video';
    videoFormCheck.appendChild(videoLabel);

    lessonForm.appendChild(videoFormCheck);

    body.appendChild(lessonForm);

    let saveButton = document.createElement('button');
    saveButton.classList.add('btn', 'btn-primary');
    saveButton.innerHTML = 'Guardar Lección';
    body.appendChild(saveButton);

    card.appendChild(body);

    outer.appendChild(card);

    return outer;
};

/*
<div class="col-12 mt-3">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Sección 1</h5>
            <form id="s0" class="sectionForm">
                <div class="mb-2">
                    <label class="form-label">Título</label>
                    <input name="title" type="text" class="form-control">
                </div>
                <div class="mb-2">
                    <label class="form-label">Precio (opcional)</label>
                    <input name="price" type="text" class="form-control" value="0.00">
                </div>
            </form>
            <div id="s0LessonContainer" data-count="0">
                
            </div>
            <button class="btn btn-primary addLessonBtn" data-section="0">Agregar Lección</button>
            <button class="btn btn-primary">Guardar Sección</button>
        </div>
    </div>
</div>
*/
const createSectionCard = (sectionCount) => {
    let outer = document.createElement('div');
    outer.classList.add('col-12', 'mt-3');

    let card = document.createElement('div');
    card.classList.add('card');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let title = document.createElement('h5');
    title.classList.add('card-title');
    title.innerHTML = `Sección ${+sectionCount + 1}`;
    cardBody.appendChild(title);

    let form = document.createElement('form');
    form.classList.add('sectionForm');
    form.id = `s${sectionCount}`;

    let titleInputContainer = document.createElement('div');
    titleInputContainer.classList.add('mb-2');

    let titleLabel = document.createElement('label');
    titleLabel.classList.add('form-lable');
    titleLabel.innerHTML = 'Título';
    titleInputContainer.appendChild(titleLabel);

    let titleInput = document.createElement('input');
    titleInput.classList.add('form-control');
    titleInput.name = 'title';
    titleInput.type = 'text';
    titleInputContainer.appendChild(titleInput);

    form.appendChild(titleInputContainer);

    let priceInputContainer = document.createElement('div');
    priceInputContainer.classList.add('mb-2');

    let priceLabel = document.createElement('label');
    priceLabel.classList.add('form-lable');
    priceLabel.innerHTML = 'Precio (opcional)';
    priceInputContainer.appendChild(priceLabel);

    let priceInput = document.createElement('input');
    priceInput.classList.add('form-control');
    priceInput.name = 'price';
    priceInput.type = 'text';
    priceInput.value = '0.00';
    priceInputContainer.appendChild(priceInput);

    form.appendChild(priceInputContainer);

    cardBody.appendChild(form);

    let lessonContainer = document.createElement('div');
    lessonContainer.id = `s${sectionCount}LessonContainer`;
    lessonContainer.dataset.count = 0;
    cardBody.appendChild(lessonContainer);

    let addLessonBtn = document.createElement('button');
    addLessonBtn.classList.add('btn', 'btn-primary', 'addLessonBtn', 'mr-2');
    addLessonBtn.dataset.section = sectionCount;
    addLessonBtn.innerHTML = 'Agregar Lección';
    addLessonBtn.addEventListener('click', (e) => {
        let btn = e.target;
        const sectionCount = btn.dataset.section;
        addLessonCard(sectionCount);
    });
    cardBody.appendChild(addLessonBtn);

    let saveSection = document.createElement('button');
    saveSection.classList.add('btn', 'btn-primary');
    saveSection.innerHTML = 'Guardar Sección';
    cardBody.appendChild(saveSection);

    card.appendChild(cardBody);

    outer.appendChild(card);

    return outer;
};

const addLessonCard = (sectionCount) => {
    const container = document.getElementById(
        `s${sectionCount}LessonContainer`
    );

    if (container) {
        const lessonCount = container.dataset.count;
        let card = createLessonCard(sectionCount, lessonCount);
        container.appendChild(card);
        container.dataset.count = 1 + +lessonCount;
    }
};

const addLessonButtons = document.getElementsByClassName('addLessonBtn');
for (let i = 0; i < addLessonButtons.length; i++) {
    button = addLessonButtons[i];
    button.addEventListener('click', (e) => {
        let btn = e.target;
        const sectionCount = btn.dataset.section;
        addLessonCard(sectionCount);
    });
}

const addSectionButton = document.getElementById('addSectionBtn');
addSectionButton.addEventListener('click', (e) => {
    const sectionContainer = document.getElementById('sectionContainer');
    const sectionCount = sectionContainer.dataset.count;
    const card = createSectionCard(sectionCount);
    sectionContainer.appendChild(card);
    sectionContainer.dataset.count = +sectionCount + 1;
});
