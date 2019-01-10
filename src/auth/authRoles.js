/**
 * Authorization Roles
 */
const authRoles = {
    admin    : ['admin'],
    staff    : ['admin', 'staff'],
    Visquel  : ['visquel', 'visquel'],
    user     : ['admin', 'staff', 'user'],
    onlyGuest: ['guest']
};

export default authRoles;
