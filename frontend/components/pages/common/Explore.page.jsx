import React, { Component } from 'react';

import ItemExploreComponent from '../../explore/Item';
import Top3RatedComponent from '../../explore/Top3Rated';


import '../../../assets/stylesheets/vendors/style.css';
import '../../../vendors/main';

class ExplorePage extends Component {
    render() {
        return (
            <div className="txt">
                <div className="search_box">
                    <a href="#" className="add_post">Post ADS</a>

                    <form method="" className="search">
                        <input type="submit" value="" />
                        <input type="text" value="Search" />
                    </form>
                </div>
                <div className="view">
                    <div className="filter">
                        <span>Logistics officers</span>
                        <div className="button">
                            <select>
                                <option>Filter by</option>
                                <option>By name</option>
                            </select>
                        </div>
                    </div>
                    {/*<div className="switcher">*/}
                        {/*<a href="#" id="list"></a>*/}
                        {/*<a href="#" id="icons"></a>*/}
                    {/*</div>*/}
                </div>

                <div className="scrollbar">
                    <ItemExploreComponent type="gold" />
                    <Top3RatedComponent />
                    <ItemExploreComponent />
                    <ItemExploreComponent />
                    <ItemExploreComponent />
                    <ItemExploreComponent />
                    <ItemExploreComponent />
                    <ItemExploreComponent />
                    <ItemExploreComponent />
                    <ItemExploreComponent />

                </div>

            </div>
        );
    }
}

export default ExplorePage;
