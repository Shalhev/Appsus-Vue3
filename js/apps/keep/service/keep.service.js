import { storageService } from '../../../services/async-storage-service.js';

export const keepService = {
    query,
    getEmptyNote,
    addNote,
};
const NOTES_KEY = 'notes';

const defaultNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: "#FFFFFF"
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            url: "https://picsum.photos/200",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#FFFFFF"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ],
        },
        style: {
            backgroundColor: "#FFFFFF"
        }
    },
]

_createNotes()

function _createNotes() {
    let loadedNotes
    storageService.query(NOTES_KEY).then(notes => {
        if (!notes || !notes.length) {
            loadedNotes = defaultNotes;
            storageService.save(NOTES_KEY, loadedNotes)
        }
        return loadedNotes
    })
}

function getEmptyNote() {
    return {
        id: null,
        type: 'note-txt',
        isPinned: false,
        info: {
            txt: null,
            url: null,
            videoUrl: null,
            title: null,
            label: null,
            todos: null,
        },
        style: {
            backgroundColor: "#FFFFFF"
        }
    }
}


function query() {
    return storageService.query(NOTES_KEY)
}

function addNote(note) {
    console.log('saving note...');
    return storageService.post(NOTES_KEY, note)
        .then(() => storageService.query(NOTES_KEY))
}