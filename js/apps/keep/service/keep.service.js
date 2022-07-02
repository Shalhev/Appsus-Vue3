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
    updateNote,
    emptyBin,

};
const NOTES_KEY = 'notes';

const defaultNotes = [
    {
        "id": "XO7ZGOwN",
        "type": "note-img",
        "isPinned": false,
        "isBin": false,
        "isArch": false,
        "info": {
            "txt": null,
            "url": "https://media.giphy.com/media/RfH1tnPS9W3i3eWa1H/giphy.gif",
            "videoUrl": null,
            "title": "YESS",
            "labels": null,
            "todos": null
        },
        "style": {
            "backgroundColor": "#FFFFFF",
            "backgroundImage": "url('./imgs/apps/keep/bg6.webp')"
        },
        "isEdit": false
    },
    {
        "id": "n102",
        "type": "note-img",
        "isPinned": true,
        "isBin": false,
        "isArch": false,
        "info": {
            "url": "https://picsum.photos/200",
            "title": "Bobi and Me"
        },
        "style": {
            "backgroundColor": "#CBF0F8",
            "backgroundImage": null
        },
        "isEdit": true
    },
    {
        "id": "n103",
        "type": "note-todos",
        "isPinned": true,
        "isBin": false,
        "isArch": false,
        "info": {
            "title": "Get my stuff together",
            "todos": [
                {
                    "txt": "Driving liscence",
                    "isDone": true
                },
                {
                    "txt": "Coding power",
                    "isDone": false
                },
                {
                    "txt": "Shower after the sprint 🚿",
                    "isDone": false
                }
            ],
            "labels": [
                "coding academy"
            ]
        },
        "style": {
            "backgroundColor": "#CCFF8F",
            "backgroundImage": "url('./imgs/apps/keep/bg4.webp')"
        },
        "isEdit": true
    },
    {
        "id": "n105",
        "type": "note-txt",
        "isPinned": false,
        "isBin": false,
        "isArch": false,
        "info": {
            "title": "Reminer",
            "txt": "a thing that causes someone to remember something.the watchtower is a reminder of the days when an enemy might appear at any moment",
            "labels": [
                "random"
            ]
        },
        "style": {
            "backgroundColor": "#FFFFFF",
            "backgroundImage": "url('./imgs/apps/keep/bg1.webp')"
        },
        "isEdit": false
    },
    {
        "id": "bJGqxakH",
        "type": "note-img",
        "isPinned": false,
        "isBin": false,
        "isArch": false,
        "info": {
            "url": "https://picsum.photos/200/300",
            "title": "Vacation!"
        },
        "style": {
            "backgroundColor": "#FFFFFF",
            "backgroundImage": "url('./imgs/apps/keep/bg9.webp')"
        },
        "isEdit": false
    },
    {
        "id": "elPOLzMt",
        "type": "note-video",
        "isPinned": false,
        "isBin": true,
        "isArch": false,
        "info": {
            "txt": null,
            "url": null,
            "videoUrl": "https://www.youtube.com/watch?v=Hc5jS5Y4Xhc&ab_channel=%D7%9E%D7%98%D7%99%D7%99%D7%9C%D7%99%D7%9D%D7%91%D7%90%D7%A8%D7%A5",
            "title": null,
            "labels": null,
            "todos": null
        },
        "style": {
            "backgroundColor": "#FFFFFF",
            "backgroundImage": "url('./imgs/apps/keep/bg5.webp')"
        },
        "isEdit": false
    },
    {
        "id": "N0Z4omQo",
        "type": "note-img",
        "isPinned": true,
        "isBin": false,
        "isArch": false,
        "info": {
            "txt": null,
            "url": "data:image/jpeg;base64,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",
            "videoUrl": null,
            "title": "I need to know this already...",
            "labels": [
                "css",
                "coding academy"
            ],
            "todos": null
        },
        "style": {
            "backgroundColor": "#E8EAED",
            "backgroundImage": "url('./imgs/apps/keep/bg8.webp')"
        },
        "isEdit": false
    },
    {
        "id": "UMRgInhr",
        "type": "note-img",
        "isPinned": false,
        "isBin": false,
        "isArch": true,
        "info": {
            "txt": null,
            "url": "https://www.middleeasteye.net/sites/default/files/styles/article_page/public/images-story/2022-01-30T214550Z_1318346480_MT1EYEIM243573_RTRMADP_3_FIRST-VISIT-TO-UAE-BY-AN-ISRAEL-PRESIDENT.JPG?itok=dwdaLvF7",
            "videoUrl": null,
            "title": "peace of cake 🍰",
            "labels": null,
            "todos": null
        },
        "style": {
            "backgroundColor": "#FFFFFF",
            "backgroundImage": "url('./imgs/apps/keep/bg10.webp')"
        },
        "isEdit": false
    },
    {
        "id": "1Qgjyjnz",
        "type": "note-txt",
        "isPinned": false,
        "isBin": false,
        "isArch": false,
        "info": {
            "txt": "Area = a × a = a²",
            "url": null,
            "videoUrl": null,
            "title": "Remember this",
            "labels": null,
            "todos": null
        },
        "style": {
            "backgroundColor": "#FFFFFF",
            "backgroundImage": "url('./imgs/apps/keep/bg7.webp')"
        },
        "isEdit": false
    },
    {
        "id": "1eYqcitU",
        "type": "note-video",
        "isPinned": false,
        "isBin": false,
        "isArch": false,
        "info": {
            "txt": null,
            "url": null,
            "videoUrl": "https://www.youtube.com/watch?v=ryDOy3AosBw&ab_channel=AltraModaMusic",
            "title": "I wish i was",
            "labels": null,
            "todos": [
                {
                    "txt": "a little bit taller",
                    "isDone": false
                },
                {
                    "txt": "a",
                    "isDone": false
                },
                " "
            ]
        },
        "style": {
            "backgroundColor": "#FBBC02",
            "backgroundImage": "url('./imgs/apps/keep/bg5.webp')"
        },
        "isEdit": false
    },
    {
        "id": "uIp8JkHL",
        "type": "note-todos",
        "isPinned": true,
        "isBin": false,
        "isArch": false,
        "info": {
            "txt": null,
            "url": null,
            "videoUrl": null,
            "title": "i wish i had",
            "labels": null,
            "todos": [
                {
                    "txt": "a rabbit in a hat",
                    "isDone": true
                },
                {
                    "txt": "a bat",
                    "isDone": true
                },
                {
                    "txt": "a six four Impala",
                    "isDone": false
                }
            ]
        },
        "style": {
            "backgroundColor": "#FFFFFF",
            "backgroundImage": "url('./imgs/apps/keep/bg2.webp')"
        },
        "isEdit": false
    },
    {
        "id": "wmVJt2d5",
        "type": "note-img",
        "isPinned": false,
        "isBin": false,
        "isArch": false,
        "info": {
            "txt": null,
            "url": "https://picsum.photos/400",
            "videoUrl": null,
            "title": "found this",
            "labels": null,
            "todos": null
        },
        "style": {
            "backgroundColor": "#FFFFFF"
        }
    },
    {
        "id": "tHMntjdM",
        "type": "note-img",
        "isPinned": false,
        "isBin": true,
        "isArch": false,
        "info": {
            "txt": null,
            "url": "https://picsum.photos/140",
            "videoUrl": null,
            "title": "...idk!",
            "labels": [
                "random"
            ],
            "todos": null
        },
        "style": {
            "backgroundColor": "#FFF476",
            "backgroundImage": null
        },
        "isEdit": false
    }
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
            labels: null,
            todos: null,
        },
        style: {
            backgroundColor: '#FFFFFF'
        }
    }
}

function query() {
    return storageService.query(NOTES_KEY)
}

function addNote(note) {
    return storageService.unshift(NOTES_KEY, note)
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
            if (note.isBin) note.isArch = false
            return storageService.put(NOTES_KEY, note)
        })
        .then(() => storageService.query(NOTES_KEY))
}
function toggleArchNote(noteId) {
    return storageService.get(NOTES_KEY, noteId)
        .then(note => {
            note.isArch = !note.isArch
            if (note.isArch) note.isBin = false
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

function updateNote(note) {
    return storageService.put(NOTES_KEY, note)
        .then(() => storageService.query(NOTES_KEY))
}

function emptyBin(notes) {
    const filterdNotes = notes.filter(note => !note.isBin)
    storageService.save(NOTES_KEY, filterdNotes)
    return storageService.query(NOTES_KEY)
}