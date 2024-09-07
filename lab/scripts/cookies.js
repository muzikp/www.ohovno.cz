/* global $*/

$(()=> {    
    const cookieConfig = {
        onConsent: onConsent,
        onFirstConsent: onConsent,
        categories: {
            necessary: {
                enabled: true,
                readOnly: true
            },
            analytics: {
                enabled: true
            }
        },
        language: {
            default: 'en',
            translations: {
                en: {
                    consentModal: {
                        title: 'Tyto stránky používají cookies',
                        description: 'Tyto webové stránky používají soubory cookies a další sledovací nástroje s cílem vylepšení uživatelského prostředí, zobrazení přizpůsobeného obsahu a reklam, analýzy návštěvnosti webových stránek a zjištění zdroje návštěvnosti.',
                        acceptAllBtn: 'Přijmout vše',
                        acceptNecessaryBtn: 'Zamítnout',
                        showPreferencesBtn: 'Upravit předvolby'
                    },
                    preferencesModal: {
                        title: 'Nastavení předvolby cookies',
                        acceptAllBtn: 'Přijmout vše',
                        acceptNecessaryBtn: 'Zamítnout',
                        savePreferencesBtn: 'Přijmout současné nastavení',
                        closeIconLabel: 'Zavřít',
                        sections: [                        
                            {
                                title: 'Nezbytné soubory cookies',
                                description: 'Tyto soubory cookies jsou nezbytné k tomu, abychom vám mohli poskytovat služby dostupné prostřednictvím našeho webu a abychom vám umožnili používat určité funkce našeho webu. Bez těchto cookies vám nemůžeme na naší webové stránce poskytovat určité služby. Aktuálně používáme je jeden soubor cookie, který obsahuje Vaše preference v používání cookies.',
                                linkedCategory: 'necessary'
                            },
                            {
                                title: 'Sledovací a výkonnostní soubory cookies',
                                description: 'Tyto soubory cookies se používají ke shromažďování informací pro analýzu provozu na našich webových stránkách a sledování používání našich webových stránek uživateli.                             Tyto soubory cookies mohou například sledovat věci jako je doba kterou na webu trávíte, nebo stránky, které navštěvujete, což nám pomáhá pochopit, jak pro vás můžeme vylepšit náš web. Informace shromážděné prostřednictvím těchto sledovacích a výkonnostních cookies neidentifikují žádné osoby. Aktuálně využíváme služby Google Tag Manager a Google Analytics.',
                                linkedCategory: 'analytics'
                            },
                            {
                                title: 'Více informací',
                                description: 'Pokud potřebujete více informací o našem způsobu se zachazením se soubory cookies, <a href="#kontakt">kontaktujte nás.</a>'
                            }
                        ]
                    }
                }
            }
        }
    };
    function onConsent(detail) {    
        let categories = detail?.cookie?.categories || [];    
        //disables analytics
        if(categories.indexOf("analytics") < 0 || navigator?.doNotTrack) {
            console.log("Disabling analytics")
            window[`ga-disable-${window.__gtm}`] = true;
            window[`ga-disable-${window.__ga}`] = true;
        }
    }
    CookieConsent.run(cookieConfig);
});

