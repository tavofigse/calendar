import React, { Component } from 'react';
import Router from 'next/router';
import Head from 'next/head';
import EventCalendar from 'react-event-calendar';
import Navigation from '../components/Navigation';
import moment from 'moment';

export default class Index extends Component {
  static async getInitialProps({ query }) {
    const { month, year } = query;
    return {
      month: month ? Number(month) - 1 : moment().month(),
      year: year ? Number(year) : moment().year(),
      events: [
        {
          start: '2017-04-01',
          end: '2017-04-01',
          title: 'test event',
          description: 'This is a test description of an event'
        },
        {
          start: '2017-04-01',
          end: '2017-04-01',
          title: 'test event',
          description: 'This is a test description of an event',
          data: 'you can add what ever random data you may want to use later'
        },
        {
          start: '2017-04-01',
          end: '2017-04-01',
          title: 'test event',
          description: 'This is a test description of an event',
          data: 'you can add what ever random data you may want to use later'
        },
        {
          start: '2017-04-01',
          end: '2017-04-01',
          title: 'test event',
          description: 'This is a test description of an event',
          data: 'you can add what ever random data you may want to use later'
        }
      ]
    };
  }

  render() {
    const { events, month, year } = this.props;
    if (!events) return <span>Loading...</span>;
    if (events.length <= 0) return <span>No events this month...</span>;
    return (
      <div>
        <Head>
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
        </Head>
        <Navigation month={month} year={year} />
        <EventCalendar
          month={month}
          year={year}
          events={this.props.events}
          maxEventSlots={4}
          onEventClick={(target, eventData, day) => console.log(eventData)}
        />
        <style jsx global>
          {
            `
          html{
            box-sizing:border-box
          }

          body { font-family: 'Inconsolata', monospace; }

          *,:after,:before{
            box-sizing:inherit
          }

          .flexContainer{
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
            background: grey;
            color: white;
            white-space:nowrap;
            text-indent:-10000px;
            cursor:pointer;
          }

          .day .event-slot .event-title{
            position:absolute;
            top:3.5px;
            left:.5rem;
            z-index:100;
            color:#fff;
            z-index:1;
            overflow:visible;
            text-indent:0;
          }

          .day .event.event-first-day{
            margin-left:.5rem;
          }

          .day .event.event-last-day{
            margin-right:.5rem;
          }

          .day .date{padding:.25rem .5rem;text-align:right}
        `
          }
        </style>
      </div>
    );
  }
}