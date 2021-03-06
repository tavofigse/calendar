import React, { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import EventCalendar from 'react-event-calendar';
import moment from 'moment';
import Navigation from '../components/Navigation';
import Message from '../components/Message';
import { getEvents } from '../services';

const DEFAULT_GROUPS = [
  12641372, // ember-montevideo
  20489638, // ReactJS-Uruguay
  18755240, // Angular-MVD
  5844892, // montevideojs
  18200397 // Front-end-MVD
];

export default class Index extends Component {
  static async getInitialProps({ query }) {
    const year = query.year ? Number(query.year) : moment().year();
    const month = query.month ? Number(query.month) - 1 : moment().month();
    const groups = query.groups || DEFAULT_GROUPS;
    const startOfMonth = moment({ year, month }).startOf('month');
    const endOfMonth = moment({ year, month }).endOf('month');
    let events, error;
    try {
      events = await getEvents(groups, startOfMonth, endOfMonth);
    } catch (e) {
      console.error(e);
      error = {
        title: 'There was an error querying meetup.com API, try reloading the browser',
        description: 'The site uses `jsonp` to query meetup.com and sometimes the server returns an empty response making `JSON.parse` to thorow.'
      };
    }

    return { month, year, groups, events, error };
  }

  navigate = (_, event) => {
    if (location) {
      location.href = event.data.event_url;
    }
  };
  render() {
    const { events, month, year, groups, error } = this.props;
    return (
      <div>
        <Head>
          <title>Calendar | ☀️.js.uy</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="stylesheet"
            href="//fonts.googleapis.com/css?family=Inconsolata|Merriweather"
          />
          <link
            rel="stylesheet"
            href="//cdn.rawgit.com/necolas/normalize.css/master/normalize.css"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            (i[r] = i[r] ||
              function() {
                (i[r].q = i[r].q || []).push(arguments);
              }), (i[r].l = 1 * new Date());
            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m);
          })(
            window,
            document,
            'script',
            'https://www.google-analytics.com/analytics.js',
            'ga'
          );

          ga('create', 'UA-55094322-2', 'auto');
          ga('send', 'pageview');`
            }}
          />
        </Head>
        <h1><sup>☀️</sup>.js.uy</h1>
        {error && error.title
          ? <Message title={error.title} description={error.description} />
          : <div>
              <Navigation groups={groups} month={month} year={year} />
              <EventCalendar
                month={month}
                year={year}
                events={this.props.events}
                maxEventSlots={4}
                onEventClick={this.navigate}
              />
            </div>}
        <ul className="footer">
          <li><a href="http://js.uy">Home</a></li>
          <li>|</li>
          <li><a href="https://js-uy-calendar.now.sh/">Calendar</a></li>
          <li>|</li>
          <li><a href="http://js.uy/about">About</a></li>
          <li>|</li>
          <li>
            <a href="http://js.uy/list-my-community">
              How do I list my community?
            </a>
          </li>
          <li>|</li>
          <li>
            <a href="http://js.uy/claim-domain">
              How do I claim a js.uy domain?
            </a>
          </li>
        </ul>
        <style jsx global>
          {`
            html { box-sizing:border-box }
            body { font-family: 'Inconsolata', monospace; }
            h1, h2, h3, h4 { font-family: 'Merriweather', serif; }
            h1 {
              text-align: center;
              margin-bottom: 40px;
            }

            .footer { max-width: 700px; margin: 20px auto; text-align: center; }

            .footer li { display: inline; margin-right: 4px; }
            .footer li:last-child { margin-right: 0; }

            *,:after,:before { box-sizing:inherit }

            .flexContainer {
              max-width:100%;
              width:100%;
              border-top:1px solid #222222;
              border-left:1px solid #222222;
              -webkit-box-orient:horizontal;
              -webkit-box-direction:normal;
              -ms-flex-direction:row;
              flex-direction:row;
              -ms-flex-wrap:wrap;
              flex-wrap:wrap;
            }

            .flexColumn,.flexContainer {
              display:-webkit-box;display:-ms-flexbox;display:flex
            }

            .flexColumn {
              width:14.2857142857%;
              border-bottom:1px solid #222222;
              border-right:1px solid #222222;
              -webkit-box-flex:0;
              -ms-flex:0 1 auto;
              flex:0 1 auto;
              -webkit-box-pack:center;
              -ms-flex-pack:center;
              justify-content:center;
            }

            .day.inactive{
              background-color:#f8f8f8;color:#ccc
            }

            .day.today{background-color:#fcf8e3}

            .day .inner-grid{width:100%;position:relative}

            .day .event-slot{position:relative;margin:.5rem 0;min-height:28px;font-size:14px}

            .day .event-slot.event{
              background:grey;
              color:white;
              white-space:nowrap;
              cursor:pointer;
              overflow:hidden;
              text-overflow:ellipsis;
              text-align:center;
              padding:5px 2px;
            }

            .day .event-slot .event-title{
              display:inline;
            }

            .day .event.event-first-day{
              margin-left:.5rem;
            }

            .day .event.event-last-day{
              margin-right:.5rem;
            }

            .day .date{padding:.25rem .5rem;text-align:right}
            `}
        </style>
      </div>
    );
  }
}
