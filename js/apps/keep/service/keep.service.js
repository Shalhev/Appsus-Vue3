import { storageService } from '../../../services/async-storage-service.js';

export const keepService = {
    query,
    getEmptyNote,
    addNote,
    toggleBinNote,
    togglePinNote,
    toggleArchNote,
    removeNote,
    toggleDoneTask,
    removeTask,

};
const NOTES_KEY = 'notes';

const defaultNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: false,
        isBin: false,
        isArch: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
        style: {
            backgroundColor: getRandomColor()
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        isBin: false,
        isArch: false,
        info: {
            url: "https://picsum.photos/200",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: getRandomColor()
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        isBin: false,
        isArch: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", isDone: false },
                { txt: "Coding power", isDone: false }
            ],
        },
        style: {
            backgroundColor: getRandomColor()
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
        isBin: false,
        isArch: false,
        info: {
            txt: null,
            url: null,
            videoUrl: null,
            title: null,
            label: null,
            todos: null,
        },
        style: {
            backgroundColor: getRandomColor()
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


function removeNote(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
        .then(() => storageService.query(NOTES_KEY))
}
function togglePinNote(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.isPinned = !note.isPinned
            return storageService.put(NOTES_KEY, note)
        }).then(() => storageService.query(NOTES_KEY))
}

function toggleBinNote(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.isBin = !note.isBin
            return storageService.put(NOTES_KEY, note)
        })
        .then(() => storageService.query(NOTES_KEY))
}
function toggleArchNote(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.isArch = !note.isArch
            return storageService.put(NOTES_KEY, note)
        })
        .then(() => storageService.query(NOTES_KEY))
}

function toggleDoneTask(noteId, taskIdx) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.info.todos[taskIdx].isDone = !note.info.todos[taskIdx].isDone
            return storageService.put(NOTES_KEY, note)
        })
}

function removeTask(noteId, taskIdx) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.info.todos.splice(taskIdx, 1)
            return storageService.put(NOTES_KEY, note)
        })
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}