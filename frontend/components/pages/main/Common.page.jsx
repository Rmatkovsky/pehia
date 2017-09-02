import React, { PureComponent } from 'react';
import MainPage from '../main/Main.page';
import ApplicationPage from '../main/Application.page';
import $ from 'jquery';

class CommonPage extends PureComponent {
    componentDidMount() {
        $('#fullPage').fullpage({
            parallax: false,
            parallaxOptions: { type: 'reveal', percentage: 62, property: 'translate' },
        });
    }

    render() {
        return (
            <div id="fullPage">
                <MainPage />
                <ApplicationPage />
            </div>
        );
    }
}
export default CommonPage;
