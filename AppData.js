var userId;
var groudId;
var receiptData = {};
var users = {};
var userInfo = {};
var userIds = {};
var groups = {};
var groupInfo = {};
var groupDebts = {};
var receiptURL;
var userSpending = [];
var total;
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
    setUsersIds(users);
    this.users = users;
}

export function getUsers(){
    return this.users;
}

export function setUserInfo(){
    var result = getUsers().find(user=>user.id==getUserId());
    this.userInfo = result;
}

export function getUserInfo(){
    return this.userInfo;
}


export function setUsersIds(users){
    this.userIds = users.map(a => a.id);
}

export function getUsersIds(){
    return this.userIds;
}

export function setReceiptURL(url){
    this.receiptURL = url
}

export function getReceiptURL(){
    return this.receiptURL;
}


export function setGroupDebtsAll(debts){
    this.groupDebts = debts;
}

export function GetGroupDebtsAll(){
    return this.groupDebts;
}

export function setUserSpending(userSpending){
    this.userSpending = userSpending;
}
export function getUserSpending(){
    return this.userSpending;
}

export function setTransactionTotal(total){
    this.total = total;
}

export function getTransactionTotal(){
    return this.total;
}