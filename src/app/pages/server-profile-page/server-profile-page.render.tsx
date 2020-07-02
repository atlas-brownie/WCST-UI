import React, { FunctionComponent, ReactElement } from 'react';
import './server-profile-page.scss';
import { Profile } from 'app/models';

export interface ServerProfilePageRenderProps {
    controls: any;
    profile: Profile;
}

export const ServerProfilePageRender: FunctionComponent<ServerProfilePageRenderProps> = ({ controls, profile, ...props }): ReactElement => {
    return (
        <div className="server-profile-page">
            <div>{profile.id}</div>
            <div>{profile.firstName}</div>
            <div>{profile.lastName}</div>
            <div>{profile.email}</div>
            <div>{profile.gender}</div>
        </div>
    );
};
