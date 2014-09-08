var appColl = require('./mongo').getCollection('py_app');//连接数据库user表

exports.insertApp = function(appObj, callback){//添加app
	appColl.insert(appObj, callback);
};

exports.updateApp = function(appID, appObj, callback){//修改app
	appColl.findAndModify({_id: appID.toLowerCase()}, [], {$set: appObj}, {new: true}, callback);
};

exports.removeApp = function(appID, callback){//删除app
	appColl.remove({_id: appID}, callback);
};

exports.getByAppCode = function(appCode, callback){//根据appCode去找app
	appColl.findOne({code: appCode}, callback);
};
