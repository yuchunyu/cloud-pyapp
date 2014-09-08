var mongoApp = require('../mongo/mongoPyApp');
var tool = require('../util/tool');

exports.insertApp = function(appObj, callback){
	appObj._id = tool.generateUUID();
	appObj.totalNumber = 0;
	appObj.useNumber = 0;
	appObj.createTimestamp = new Date().getTime();
	appObj.createDate = tool.getThisTime();
	appObj.updateDate = tool.getThisTime();
	mongoApp.insertApp(appObj, callback);
}

exports.updateApp = function(appID, appObj, callback){
	appObj.updateDate = tool.getThisTime();
	mongoApp.updateApp(appID, appObj, callback);
}

exports.removeApp = function(appID, callback){
	mongoApp.removeApp(appID, callback);
};
exports.getByAppCode = function(appCode, callback){
	mongoApp.getByAppCode(appCode,callback);
};