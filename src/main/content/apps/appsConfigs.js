import {AnalyticsDashboardAppConfig} from './dashboards/analytics/AnalyticsDashboardAppConfig';
import {MailAppConfig} from './mail/MailAppConfig';
import {TodoAppConfig} from './todo/TodoAppConfig';
import {ContactsAppConfig} from './contacts/ContactsAppConfig';
import {FileManagerAppConfig} from './file-manager/FileManagerAppConfig';
import {CalendarAppConfig} from './calendar/CalendarAppConfig';
import {ChatAppConfig} from "./chat/ChatAppConfig";
import {ECommerceAppConfig} from './e-commerce/ECommerceAppConfig';
import {ScrumboardAppConfig} from './scrumboard/ScrumboardAppConfig';
import {AdministratorsDashboardAppConfig} from './dashboards/Administrators/AdministratorsDashboardAppConfig'

export const appsConfigs = [
    AnalyticsDashboardAppConfig,
    AdministratorsDashboardAppConfig,
    MailAppConfig,
    TodoAppConfig,
    FileManagerAppConfig,
    ContactsAppConfig,
    CalendarAppConfig,
    ChatAppConfig,
    ECommerceAppConfig,
    ScrumboardAppConfig,
];
