import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthGuard extends KeycloakAuthGuard {
    constructor(protected override keycloakAngular: KeycloakService) {
        super(keycloakAngular);
    }

    async isAccessAllowed(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {
        if (!this.authenticated) {
            await this.keycloakAngular.login();
            return false;
        }

        const requiredRoles = route.data['roles'];
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        return requiredRoles.every((role: string) => this.roles.includes(role));
    }
}
