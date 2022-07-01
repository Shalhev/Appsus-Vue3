import { storageService } from '../../../services/async-storage-service.js';

const EMAILS_KEY = 'emails';
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

const emails = [
    {
        id: storageService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1551133930594,
        to: 'momo@momo.com',
        name: 'Momo',
        isRead: false,
        isStarred: false,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Miss mi!',
        body: 'Would love up',
        sentAt: 1551133930594,
        to: 'user@appsus.com',
        name: 'Appsus',
        isRead: false,
        isStarred: true,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'RE',
        body: 'I hope you are good, I have been trying to get in touch with you.',
        sentAt: 1551133930594,
        to: 'user@appsus.com',
        name: 'Michiko',
        isRead: false,
        isStarred: true,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
]
_saveEmails()

export const emailService = {
    query,
    get,
    addEmail,
    removeEmail,
    updateEmail,
    getEmptyEmail,
    getLoggedinUser,
};

function query() {
    return storageService.query(EMAILS_KEY)
}

function _saveEmails() {
    if (!localStorage.getItem(EMAILS_KEY))
        storageService.save(EMAILS_KEY, emails);
}
function getLoggedinUser(){
    return loggedinUser
}

function get(emailId) {
    return storageService.get(EMAILS_KEY, emailId)
}

function updateEmail(email) {
    return storageService.put(EMAILS_KEY, email)
}

function addEmail(email) {
    return storageService.post(EMAILS_KEY, email)
}

function removeEmail(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}
function getEmptyEmail() {
    return {
        id: storageService.makeId(),
        subject: '',
        body: '',
        sentAt: 1551133930594,
        to: '',
        name: 'Appsus',
        isRead: false,
        isStarred: false,
        isImportant: false,
    }
}