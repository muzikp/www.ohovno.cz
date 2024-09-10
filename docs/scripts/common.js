/* global $*/

/**
 * https://cookieconsent.orestbida.com/reference/configuration-reference.html
 */
const cookieConfig = {
    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {}
    },
    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'We use cookies',
                    description: 'Cookie modal description',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    showPreferencesBtn: 'Manage Individual preferences'
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    sections: [
                        {
                            title: 'Somebody said ... cookies?',
                            description: 'I want one!'
                        },
                        {
                            title: 'Strictly Necessary cookies',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'More information',
                            description: 'For any queries in relation to my policy on cookies and your choices, please <a href="#contact-page">contact us</a>'
                        }
                    ]
                }
            }
        }
    }
};

$(function() {
    $("#contact").on("submit", function(e) {
        e.preventDefault(); // Prevent default form submission
        let data = getFormData($(this));
        $.ajax({
            url: "https://api.ohovno.cz/signup",
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json", // Nastavte správnou hlavičku
            dataType: "json" // Očekávejte JSON odpověď od serveru
        }).done(function(response) {
            iziToast.success({
                title: 'Děkujeme Vám!',
                message: 'Váš kontakt byl úspěšně odeslán.',
            });
            $("#submit").attr("disabled", true);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            iziToast.error({
                title: ':-(',
                message: 'Váš kontakt se bohužel nepodařilo odeslat. Zkuste to za chvíli.',
            });
        });
    });
});


function getFormData($form) {
    let unindexed_array = $form.serializeArray();
    let indexed_array = {};
    $.map(unindexed_array, function(n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return indexed_array;
}
