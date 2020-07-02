import React from 'react';
import {
    ProfilePage,
    HomePage,
    ComponentsPage,
    SigninPage,
    SignupPage,
    ForgotPasswordPage,
    SignupVerification,
    ResetPassword,
    ResendConfirmation,
    ApplicantPage,
    WcstAPage
} from 'app/pages';
import { RouteProps } from 'react-router-dom';
import { Location, History, LocationKey, LocationDescriptor, Pathname, createLocation as historyCreateLocation } from 'history';
import { Key as TreeKey } from 'rc-tree/lib/interface';
import { NavigationTree } from 'app/models';
import { INavigationItem } from './navigation-tree';
import { flow } from 'lodash';

const DefaultComponent: React.ComponentType<any> = () => {
    return null;
};

class PageRoute implements RouteProps {
    id: TreeKey = '';
    component: React.ComponentType<any> = DefaultComponent;
    path = '';
    state?: LocationState = {};
    isOverlay? = false;
}

class TabRoute extends PageRoute {
    label = 'Default';
}

type LocationState = {
    previousPage?: string;
    currentPage?: string;
    previousPath?: string;
    currentPath?: string;
};

type DisplayState = {
    pages: React.ComponentType<any>[];
    isHideTabs: boolean;
    tabIndex: number;
    tabs: TabRoute[];
};

type LocationDisplay = {
    pathname: string;
    pageRoute: PageRoute;
    tabIndex: number;
    page: React.ComponentType<any>;
    isOverlay: boolean;
};

export class AppRouteClass {
    location: Location<LocationState> | undefined;
    history: History<LocationState> | undefined;

    private pageRoutes: PageRoute[] = [
        {
            id: 'SigninPage',
            path: '/signin',
            component: SigninPage
        },
        {
            id: 'SignupPage',
            path: '/signup',
            component: SignupPage
        },
        {
            id: 'ForgotPasswordPage',
            path: '/forgot-password',
            component: ForgotPasswordPage
        },
        {
            id: 'SignupVerification',
            path: '/signup-verification',
            component: SignupVerification
        },
        {
            id: 'ResetPassword',
            path: '/reset-password',
            component: ResetPassword
        },
        {
            id: 'ResendConfirmation',
            path: '/resend-confirmation',
            component: ResendConfirmation
        },
        {
            id: 'ProfilePage',
            path: '/profile-page',
            component: ProfilePage
        },
        {
            id: 'ComponentsPage',
            path: '/components-page',
            component: ComponentsPage
        },
        {
            id: 'ApplicantPage',
            path: '/applicant-page',
            component: ApplicantPage
        },
        {
            id: 'WcstAPage',
            path: '/wcst-a-page',
            component: WcstAPage
        },
        {
            id: 'HomePage',
            path: '/',
            component: HomePage
        }
    ];

    private tabRoutes: TabRoute[] = [
        {
            id: 'HomePage',
            path: '/home-page',
            component: HomePage,
            label: 'Home',
            state: {}
        }
    ];

    // Wrap history's createLocation method to force LocationState type parameter
    private createLocation = (path: LocationDescriptor<LocationState>, state: LocationState, key?: LocationKey, currentLocation?: Location<LocationState>) => {
        return historyCreateLocation<LocationState>(path, state, key, currentLocation);
    };

    getTabRoute(pathname?: Pathname): TabRoute | undefined {
        const findPathname = pathname || this.location?.pathname || '/';
        const match: TabRoute | undefined = this.tabRoutes.find((route: TabRoute) => {
            return route.path === findPathname;
        });
        return match;
    }

    private getPageRoute(pathname: Pathname): PageRoute | undefined {
        const match: PageRoute | undefined = this.pageRoutes.find((route: PageRoute) => {
            return route.path === pathname;
        });
        return match;
    }

    private isSinglePage(pathname: Pathname): boolean {
        const pageRoute = this.getPageRoute(pathname);
        return !!pageRoute && !!!pageRoute?.isOverlay;
    }

    private isTabPage(pathname: Pathname): boolean {
        return !!this.getTabRoute(pathname);
    }

    private getTabIndex(pathname: Pathname): number {
        const findPathname = pathname || this.location?.pathname || '/';
        const index: number = this.tabRoutes.findIndex((route: TabRoute) => {
            return route.path === findPathname;
        });
        return index >= 0 ? index : 0;
    }

    private getLocationDisplayInformation(pathname: Pathname = '/'): LocationDisplay {
        const pageRoute = this.getPageRoute(pathname) || new PageRoute();
        const tabIndex = this.getTabIndex(pathname);
        const page = pageRoute?.component || this.tabRoutes[tabIndex].component;
        const isOverlay = !!pageRoute?.isOverlay;
        return { pathname, pageRoute, tabIndex, page, isOverlay };
    }

    getDisplayState(): DisplayState {
        // Purpose is to provide information to Container component how to display page.
        // We have single pages such as signin, tab pages, and overlays (dialogs).
        // Overlays require retaining display of previous page.
        const currentLocation = this.getLocationDisplayInformation(this.location?.pathname);
        const previousLocation = this.getLocationDisplayInformation(this.location?.state?.previousPath);

        const pages = [currentLocation.page];
        if (currentLocation.isOverlay && this.isSinglePage(previousLocation.pathname)) pages.push(previousLocation.page);

        const isHideTabs = !(this.isTabPage(currentLocation.pathname) || (currentLocation.isOverlay && this.isTabPage(previousLocation.pathname)));
        const tabIndex = currentLocation.isOverlay ? previousLocation.tabIndex : currentLocation.tabIndex;

        const displayInformation: DisplayState = {
            pages,
            isHideTabs,
            tabIndex,
            tabs: this.tabRoutes
        };
        return displayInformation;
    }

    private createTabRoute(navigationListItem: INavigationItem | undefined): TabRoute {
        if (navigationListItem)
            return {
                id: navigationListItem.id || '',
                path: `/${encodeURI(String(navigationListItem.id)) || ''}`,
                component: navigationListItem.component || DefaultComponent,
                label: navigationListItem.label || '',
                state: {}
            };
        else return new TabRoute();
    }

    private addTabLocation(id: TreeKey): Location<LocationState> {
        const tabRoute = this.createTabRoute(NavigationTree.getNavigationListItem(id));
        this.tabRoutes = this.tabRoutes.concat(tabRoute);

        return this.createLocation(tabRoute.path, {
            previousPath: this.location?.pathname,
            currentPath: tabRoute.path
        });
    }

    private setNextLocationState(location: Location<LocationState>): Location<LocationState> {
        location.state = Object.assign({}, location.state, { currentPath: location.pathname, previousPath: this.location?.pathname });
        return location;
    }

    getNextLocation(id: TreeKey): Location<LocationState> {
        const matchTab: TabRoute | undefined = this.tabRoutes.find((route: TabRoute) => {
            return route.id === id;
        });

        const matchPage: PageRoute | undefined = this.pageRoutes.find((route: PageRoute) => {
            return route.id === id;
        });

        if (matchTab) return flow(this.createLocation, this.setNextLocationState)(matchTab.path, {});
        else if (matchPage) return flow(this.createLocation, this.setNextLocationState)(matchPage.path, {});
        else return this.addTabLocation(id);
    }
}

export const AppRoute = new AppRouteClass();
