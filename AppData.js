var userId;
var groudId;
var receiptData = {};
var users = {};
var userIds = {};
var groups = {};
var groupInfo = {};
export function setUserId(id){
    this.userId = id
}

export function getUserId(){
    return this.userId;
}

export function setGroupId(id){
    this.groudId = id
}

export function getGroupId(){
    return this.groudId;
}

export function setGroupsData(groups){
    this.groups = groups
}

export function getGroupData(){
    return this.groups;
}

export function setGroupInfo(id){
    var result = getGroupData().find(group=>group.id==id);
    console.log(result);
    this.groupInfo = result;
}

export function getGroupInfo(){
    return this.groupInfo;
}


export function setReceiptData(data){
    this.receiptData = data
}

export function getReceiptData(){
    return this.receiptData;
}

export function setUsers(users){
    console.log(users);
    this.users = users;
}

export function getUsers(){
    return this.users;
}

export function setUsersIds(users){
    this.userIds = users.map(a => a.id);
}

export function getUsersIds(){
    return this.userIds;
}