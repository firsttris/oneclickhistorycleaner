export const languages = {
  en: "English",
  de: "German",
};

export const defaultLang = "en";

export const ui = {
  en: {
    appcache: "Application cache",
    cache:
      "The browser cache that stores images and other resources downloaded by websites",
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
    serviceWorkers: "Service Worker cache",
    whatShouldBeRemoved: "What should be removed?",
    removeOrReload: "Remove or reload tabs after removing browsing data?",
    refresh: "Refresh",
    remove: "Remove",
    cleanHistory: "Clean History",
    'notification.saved': "Settings saved",
    'notification.cleaning': "Cleaning Browser History",
    'notification.cleaningDone': 'Cleaning Browser History done',
  },
  de: {
    appcache: "Anwendungscache",
    cache:
      "Der Browser-Cache, der Bilder und andere Ressourcen speichert, die von Websites heruntergeladen wurden",
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
    serviceWorkers: "Service Worker-Cache",
    whatShouldBeRemoved: "Was soll entfernt werden?",
    removeOrReload: "Tabs entfernen oder neu laden nach dem Löschen der Browserdaten?",
    refresh: "Aktualisieren",
    remove: "Entfernen",
    cleanHistory: "Verlauf bereinigen",
    'notification.saved': "Einstellungen gespeichert",
    'notification.cleaning': "Browser-Verlauf wird bereinigt...",
    'notification.cleaningDone': 'Browser-Verlauf wurde bereinigt',
  },
} as const;

export const useTranslations = () => {
  return (key: keyof (typeof ui)[typeof defaultLang]) => {
    return ui[defaultLang][key];
  };
};
