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
        isRead: true,
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
        sentAt: 1644765696000,
        from: 'user@appsus.com',
        to: 'user@appsus.com',
        name: 'Appsus',
        isRead: true,
        isStarred: false,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'RE',
        body: 'I hope you are good, I have been trying to get in touch with you.',
        sentAt: 1644745214000,
        from: 'michiko@gmail.com',
        to: 'user@appsus.com',
        name: 'Michiko',
        isRead: true,
        isStarred: false,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: '[GitHub] Please verify your device',
        body: `Hey Appsus!
A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.
Device: Chrome on Windows
Verification code: 08051`,
        sentAt: 1654089279000,
        from: 'noreply@github.com',
        to: 'user@appsus.com',
        name: 'GitHub',
        isRead: false,
        isStarred: false,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Your Recovery Code - 789742',
        body: 'Your code is: 789742. Use it to disable your password and access your Telegram account.',
        sentAt: 1654091535000,
        from: 'noreply@telegram.org',
        to: 'user@appsus.com',
        name: 'Telegram',
        isRead: false,
        isStarred: true,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Appsus, we\'ve made it easy to get back on Instagram',
        body: 'Sorry to hear you\'re having trouble logging into Instagram. We can help you get straight back into your account.',
        sentAt: 1647923200000,
        from: 'security@mail.instagram.com',
        to: 'user@appsus.com',
        name: 'Instagram',
        isRead: true,
        isStarred: true,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Are you willing to help other US customer?',
        body: "Hi Dear, \n\nThis is a free product testing program and I am Alicia, the manager of this project.\n\nWe have air purifiers for free testing this season.\nWe paid before ordering, you get it and test it, then you can keep it for free.\nThe purpose of this project is to gather customers’ reviews and promote our products.",
        sentAt: 1651082109987,
        from: 'alicia@shipping.bigsuprise.net',
        to: 'user@appsus.com',
        name: 'Alicia',
        isRead: true,
        isStarred: true,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: true,
    },
    {
        id: storageService.makeId(),
        subject: 'Matan Crispel shared "CaMay22-Materials" with you',
        body: `
        Hi Appsus,
        Matan Crispel (matan@gmail.com) invited you to view the folder "CaMay22-Materials" on Dropbox.`,
        sentAt: 1651214352890,
        from: 'no-reply@dropbox.com',
        to: 'user@appsus.com',
        name: 'Matan Crispel (via Dropbox)',
        isRead: false,
        isStarred: true,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Sharon and 109 others made changes in your shared folders',
        body: 'Activity in Shared Folders\nHere\'s what happened in your shared folders last week\nCaMay22-ExcerciseSubmission',
        sentAt: 1652723231098,
        from: 'no-reply@dropbox.com',
        to: 'user@appsus.com',
        name: 'Dropbox',
        isRead: false,
        isStarred: false,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Your Sketch design is ready to download',
        body: 'Download your misterBlogger.sketch design\nOriginal PSD file size: 12.8 MB\nFinal Sketch file size: 1.1 MB\nConversion time: 18 seconds',
        sentAt: 1651410202098,
        from: 'hello@avocode.com',
        to: 'user@appsus.com',
        name: 'Avocode',
        isRead: false,
        isStarred: false,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Appsus, you have 1 invitation waiting for you on LinkedIn',
        body: '1 Notification from your network\n1 invitation',
        sentAt: 1654980499098,
        from: 'notifications-noreply@linkedin.com',
        to: 'user@appsus.com',
        name: 'LinkedIn',
        isRead: false,
        isStarred: false,
        isImportant: false,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Coding Academy has invited you to work with them in Slack',
        body: 'Join your team on Slack\nCoding Academy (codingacademy@misterbit.co.il) has invited you to use Slack with them, in a workspace called Coding Academy - May 22',
        sentAt: Date.now(),
        from: 'feedback@slack.com',
        to: 'user@appsus.com',
        name: 'Slack',
        isRead: false,
        isStarred: false,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Event Notification: Account Login',
        body: 'Event Notification: Account Login\n\nDear Client,\nA login event has been detected on your Interactive Brokers | Israel Interactive Trading account by user a******5.',
        sentAt: 1656366737098,
        from: 'Info@inter-il.com',
        to: 'user@appsus.com',
        name: 'Interactive Brokers',
        isRead: false,
        isStarred: false,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'New User Account for TDAmeritrade (moveit.tdameritrade.com)',
        body: 'Welcome to TDAmeritrade!\n\nAn account has been created for you with the username \'appsus@gmail.com\'.\nYour new credentials are:\nUsername: appsus@gmail.com\nPassword: 123456\nIf site policy requires it, at sign on you will be guided through additional steps to secure your account.\n\nPlease use the following URL to sign on to the system.\n\n( https://moveit.tdameritrade.com/human.aspx?OrgID=7077 )\n\nIf you need assistance, please contact TD Ameritrade Service Desk at 775511 (internally only) / .\n\n\nRegards,\nTD Ameritrade Ad-Hoc File Transfer Notification Service',
        sentAt: 1656610778098,
        from: 'moveit@tdameritrade.com',
        to: 'user@appsus.com',
        name: 'TD Ameritrade',
        isRead: false,
        isStarred: false,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'You added a new card to your Google Account',
        body: 'You added Visa •••• 6789 to your Google Account from Chrome\n\nappsus@⁠gmail.com\n\nNow you can choose it when you’re filling in forms or paying in apps and on websites with Google Pay.',
        sentAt: 1656538114098,
        from: 'googlepay-noreply@google.com',
        to: 'user@appsus.com',
        name: 'Google Pay',
        isRead: false,
        isStarred: false,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'You\'re in! Order confirmation for "The Complete 2022 Web Development Bootcamp.”',
        body: 'Order Confirmation:\n\nThe Complete 2022 Web Development Bootcamp\n\nPurchased by\nName: App sus\nEmail: appsus@gmail.com\nPurchase Date: 2022-02-23 17:55:48.0\n\nSold by\nUdemy, Inc.\n600 Harrison St., 3rd Floor\nSan Francisco, CA 94107 USA',
        sentAt: 1656640473098,
        from: 'udemy@email.udemy.com',
        to: 'user@appsus.com',
        name: 'Udemy',
        isRead: false,
        isStarred: false,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: '[Copyright claim] Your video has been blocked in some countries.',
        body: 'Hi Appsus,\n\nA copyright owner using Content ID has claimed some material in your video.\n\nAs a result, your video has been blocked in some countries. This means that your video is still up on YouTube, but people in some countries may not be able to watch it.\n\nThis is not a copyright strike. This claim does not affect your account status.\n\nVideo title: אייל גולן וזהבה בן - צליל מיתר\nCopyrighted content: IL_EndemolShineGroup_BigBrotherIL_S03_E55\nClaimed by: Endemol International BV Parent\nBlocked countries: Israel\n\nWhy this can happen\n\nYour video might contain copyrighted content.\nCopyright owners can choose to block YouTube videos that contain their content.\nIf this copyright claim is valid\n\nYou don’t need to take any action or delete your video.\nHow to unblock your video\n\nIf something went wrong and the copyright owner or our system made a mistake, we have a dispute process. Please only use it if you’re confident you have the rights to use all the content in your video. Learn more\nYou can also remove the claimed content using Studio\'s editing tools.',
        sentAt: 1656618362098,
        from: 'accounts-noreply@youtube.com',
        to: 'user@appsus.com',
        name: 'YouTube',
        isRead: false,
        isStarred: false,
        isImportant: true,
        isDraft: false,
        isSelected: false,
        isBin: false,
    },
    {
        id: storageService.makeId(),
        subject: 'Receipt for your payment to username@gmail.com',
        body: 'Hello App sus,\n\nYou sent a payment of $3.84 AUD to username@gmail.com\n\nWe\'ve asked the seller to ship.\n\nThanks for using PayPal. To see all the transaction details, log in to your PayPal account.\n\nIt may take a few moments for this transaction to appear in your account.',
        sentAt: 1656760848098,
        from: 'service@paypal.co.il',
        to: 'user@appsus.com',
        name: 'Paypal',
        isRead: false,
        isStarred: false,
        isImportant: true,
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
function getLoggedinUser() {
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