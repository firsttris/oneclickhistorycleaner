const dataTypesDE = {
    appcache: "Anwendungscache",
    cache: "Der Browser-Cache, der Bilder und andere Ressourcen speichert, die von Websites heruntergeladen wurden",
    cookies: "Cookies, die von Websites gesetzt wurden",
    downloads: "Download-Verlauf",
    fileSystems: "Dateisysteme, die von Webanwendungen erstellt wurden",
    formData: "Formulardaten, wie Benutzernamen und Passwörter",
    history: "Browser-Verlauf",
    indexedDB: "Daten in einer IndexedDB-Datenbank",
    serverBoundCertificates: "Servergebundene Zertifikate",
    localStorage: "Daten im Local Storage",
    pluginData: "Daten, die von Plugins gespeichert wurden",
    passwords: "Gespeicherte Passwörter",
    webSQL: "Daten in einer Web SQL-Datenbank",
    serviceWorkers: "Service Worker-Cache"
};

const dataTypesEN = {
    appcache: "Application cache",
    cache: "The browser cache that stores images and other resources downloaded by websites",
    cookies: "Cookies set by websites",
    downloads: "Download history",
    fileSystems: "File systems created by web applications",
    formData: "Form data, such as usernames and passwords",
    history: "Browser history",
    indexedDB: "Data in an IndexedDB database",
    serverBoundCertificates: "Server-bound certificates",
    localStorage: "Data in local storage",
    pluginData: "Data stored by plugins",
    passwords: "Stored passwords",
    webSQL: "Data in a Web SQL database",
    serviceWorkers: "Service Worker cache"
};

const userLanguage = navigator.language || navigator.userLanguage;

export const getLabel = (key) => {
    if (userLanguage.includes('de')) {
        return dataTypesDE[key];
    } else {
        return dataTypesEN[key];
    }
}