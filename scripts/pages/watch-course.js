import Course from '../objects/Course.js';
import Lesson from '../objects/Lesson.js';
import Resource from '../objects/Resource.js';
import Section from '../objects/Section.js';
import { getCurrentUserId } from '../objects/Session.js';

const loadLessonEvent = (e, lessonId) => {
    console.log(lessonId);
    setCurrentLesson(lessonId);
};

const setLessonCompleted = (lessonId, userId) => {
    let lesson = new Lesson((response) => {
        if (response.ok) {
            console.log(`User ${userId} completed lesson ${lessonId}`);
            return;
        }
    });

    lesson.setCompleted(lessonId, userId);
};

const createLessonAccordionItem = (lesson) => {
    const item = document.createElement('div');
    item.classList.add('accordion-item');
    const itemHtml = `
    <h2
        class="accordion-header"
        id="lesson${lesson.id}Header"
    >
        <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#lesson${lesson.id}Collapse"
            aria-expanded="true"
            aria-controls="lesson${lesson.id}Collapse"
        >
            ${lesson.title}
        </button>
    </h2>
    <div
        id="lesson${lesson.id}Collapse"
        class="
            accordion-collapse
            collapse
            show
        "
        aria-labelledby="lesson${lesson.id}Header"
        data-bs-parent="#lesson${lesson.id}Accordion"
    >
        <div id="lesson${lesson.id}AccordionBody" data-lesson-id="${lesson.id}" class="accordion-body">
        </div>
    </div>`;
    item.innerHTML = itemHtml;
    return item;
};

const createResourceLink = (resource) => {
    const resourceContainer = document.createElement('li');
    resourceContainer.classList.add('list-group-item', 'my-2');

    let resourceHtml = `<a href="http://localhost${resource.link}" class="btn btn-primary" target="_blank">Recurso ${resource.id}</a>`;
    resourceContainer.innerHTML = resourceHtml;
    return resourceContainer;
};

const loadLessonResources = (lessonId) => {
    const container = document.getElementById('lessonResourceContainer');
    container.innerHTML = '';

    const resource = new Resource((response) => {
        if (response.ok) {
            response.json().then((data) => {
                for (let i = 0; i < data.length; i++) {
                    const resourceData = data[i];
                    const item = createResourceLink(resourceData);
                    container.appendChild(item);
                }
            });
        }
    });

    resource.getLessonResources(lessonId);
};

const createSectionAccordionItem = (section) => {
    const item = document.createElement('div');
    item.classList.add('accordion-item');
    const itemHtml = `
    <h2 class="accordion-header" id="section${section.id}Header">
        <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#section${section.id}Collapse"
            aria-expanded="true"
            aria-controls="section${section.id}Collapse"
        >
            ${section.title}
        </button>
    </h2>
    <div
        id="section${section.id}Collapse"
        class="accordion-collapse collapse show"
        aria-labelledby="section${section.id}Header"
        data-bs-parent="#section${section.id}Accordion"
    >
        <div class="accordion-body">
            <div
                class="accordion accordion-flush"
                id="section${section.id}LessonAccordion"
            ></div>
        </div>
    </div>`;
    item.innerHTML = itemHtml;
    return item;
};

const createLessonCard = (lesson) => {
    /*
    <div class="card mb-2">
        <div class="card-body d-grid gap-2">
            <button type="button" class="btn">
                <p class="card-title">
                    Lesson Title
                </p>
            </button>
        </div>
    </div>
    */

    const card = document.createElement('div');
    card.classList.add('card', 'mb-2');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-grid', 'gap-2');

    const button = document.createElement('button');
    button.classList.add('btn');
    button.type = 'button';
    button.dataset.lessonId = lesson.id;
    button.addEventListener('click', (e) => {
        loadLessonEvent(e, lesson.id);
    });

    const title = document.createElement('p');
    title.classList.add('card-title');
    title.innerHTML = lesson.title;
    button.appendChild(title);

    cardBody.appendChild(button);

    card.appendChild(cardBody);

    return card;
};

const setCurrentLesson = (lessonId) => {
    const title = document.getElementById('lessonTitle');
    const videoPlayer = document.getElementById('lessonVideoPlayer');
    const text = document.getElementById('lessonText');

    const lesson = new Lesson((response) => {
        if (response.ok) {
            response.json().then((lessonData) => {
                title.innerText = lessonData.title;
                text.innerText = lessonData.text;
                if (lessonData.type != 1 || !lessonData.video) {
                    videoPlayer.classList.add('d-none');
                    return;
                }
                videoPlayer.classList.remove('d-none');
                videoPlayer.src = lessonData.video;
            });
        }
    });

    lesson.getInformation(lessonId);
    loadLessonResources(lessonId);
};

const loadCourseData = (courseData) => {
    const courseTitle = document.getElementById('courseTitle');
    courseTitle.innerText = courseData.title;
};

const loadSectionLessons = (sectionId) => {
    const containerId = `section${sectionId}LessonAccordion`;

    const lesson = new Lesson((response) => {
        if (response.ok) {
            response.json().then((data) => {
                const container = document.getElementById(containerId);

                let first = true;
                for (let i = 0; i < data.length; i++) {
                    const lessonData = data[i];
                    if (lessonData.published) {
                        if (first) {
                            setCurrentLesson(lessonData.id);
                            first = false;
                        }
                        const card = createLessonCard(lessonData);
                        container.appendChild(card);
                    }
                }
            });
        }
    });

    lesson.getSectionLessons(sectionId);
};

const loadCourseSections = (courseId) => {
    const sectionContainer = document.getElementById('sectionAccordion');

    const section = new Section((response) => {
        if (response.ok) {
            response.json().then((data) => {
                for (let i = 0; i < data.length; i++) {
                    let sectionData = data[i];
                    if (sectionData.published) {
                        const item = createSectionAccordionItem(sectionData);
                        sectionContainer.appendChild(item);
                        loadSectionLessons(sectionData.id);
                    }
                }
            });
        }
    });

    section.getCourseSections(courseId);
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const courseId = params.get('course');

    if (!courseId) {
        // Do something
        console.log('course is not specified');
        return;
    }

    const course = new Course((response) => {
        if (response.ok) {
            response.json().then((courseData) => {
                loadCourseData(courseData);
                loadCourseSections(courseData.id);
            });
        }
    });

    course.getInformation(courseId);
});
