import React, { Component } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth, Inject, DragAndDrop, Resize } from '@syncfusion/ej2-react-schedule';
//import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
class Calendar extends Component {
    constructor(props) {
        super(props);
        this.eventSettings = { dataSource: this.data, editFollowingEvents: true };
        this.state = {
            // remotedata:new DataManager({
            //     url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
            //     adapter:new WebApiAdaptor,
            //     crossDomain:true
            // }),
            data: [{
                Subject: "hello",
                EndTime: new Date(2020, 2, 26, 6, 30),
                StartTime: new Date(2020, 2, 26, 4, 30)
            }]
        }
    }

    // private  localdata: EventSettingsModel={
    //     dataSource:[{
    //         EndTime:new Date(2020,0,11,6,30),
    //         StartTime:new Date(2020,0,11,4,30)
    //     }]
    // }

    render() {

        return (<div className="calendarAdmin" >
            <ScheduleComponent currentView='Month' eventSettings={{ dataSource: this.state.data }} >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth, DragAndDrop, Resize]} />
            </ScheduleComponent>
        </div>);
    }
}

export default Calendar;




