import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'http://localhost:8080/', // Your Keycloak server
                realm: 'myrealm',              // Realm name
                clientId: 'my-angular-client', // Client ID
            },
            initOptions: {
                onLoad: 'login-required', // Auto redirect to login on app start
                checkLoginIframe: false
            },
            bearerExcludedUrls: ['/assets'] // Skip adding token here
        });
}
