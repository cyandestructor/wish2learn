import Section from '../objects/Section.js';
import Utility from '../Utility.js';

const displaySectionData = (section) => {
    const title = document.getElementById('sectionTitle');
    const price = document.getElementById('sectionPrice');
    const form = document.getElementById('sectionEditionForm');
    const published = document.getElementById('sectionPublished');
    const unpublished = document.getElementById('sectionUnpublished');
    const deleteBtn = document.getElementById('deleteSectionBtn');

    if (section.published) {
        published.checked = true;
    } else {
        unpublished.checked = true;
    }

    title.value = section.title;
    price.value = section.price ?? 0.0;
    form.dataset.sectionId = section.id;
    deleteBtn.dataset.sectionId = section.id;
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const sectionId = params.get('section');

    if (!sectionId) {
        // Do something
        console.log('Section not registered');
        return;
    }

    const section = new Section((response) => {
        if (response.ok) {
            response.json().then((data) => {
                displaySectionData(data);
            });
            return;
        }
    });

    section.getInformation(sectionId);
});

document
    .getElementById('sectionEditionForm')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const sectionId = form.dataset.sectionId;

        if (!sectionId) {
            console.log('section is not specified');
            return;
        }

        let sectionObj = Utility.formDataToObject(new FormData(form));

        const section = new Section(
            (response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        Utility.displayErrors('editionDisplayErrors', null);
                        Utility.displayMessage(
                            'editionDisplayMessage',
                            'Edición exitosa'
                        );
                    });
                    return;
                }

                if (response.status === 400) {
                    response.json().then((data) => {
                        Utility.displayErrors(
                            'editionDisplayErrors',
                            data.errors
                        );
                        Utility.displayMessage('editionDisplayMessage', '');
                    });
                    return;
                }
            },
            (errors) => {
                Utility.displayErrors('editionDisplayErrors', errors);
                Utility.displayMessage('editionDisplayMessage', '');
            }
        );

        section.edit(sectionObj, sectionId);
    });

document.getElementById('deleteSectionBtn').addEventListener('click', (e) => {
    const button = e.target;
    const sectionId = button.dataset.sectionId;

    if (!sectionId) {
        console.log('Section is not specified');
        return;
    }

    let section = new Section((response) => {
        if (response.ok) {
            // Deleted
            alert('Se ha borrado la sección');
            return;
        }
    });

    section.delete(sectionId);
});
