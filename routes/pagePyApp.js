var pyApp = require('./module/pyApp'),
    async = require('async'),
    tool = require('./util/tool');

//使用app
exports.gotoOpus = function(req, res){
    var appCode = req.params.id;
    var appInfo = {};
    async.series({
        findAppByCode: function(done){
            pyApp.getByAppCode(appCode, function(err, info){
                if(!err){
                    if(null != info){
                        appInfo = info;
                        done();
                    }else{
                        done('该APP不存在，请检查。');
                    }
                }else{
                    done(err);
                }
            });
        },
        updateApp: function(done){
            appInfo.totalNumber = appInfo.totalNumber + 1;
            pyApp.updateApp(appInfo._id, appInfo, function(err, info){
                if(!err){
                    if(null != info){
                        appInfo = info;
                        done();
                    }else{
                        done('该APP不存在，请检查。');
                    }
                }else{
                    done(err);
                }
            });
        }
    },function(err){
        res.render('opus/' + appCode + '/index', { appInfo: appInfo });
    });
};
//注册app
exports.insertApp = function(req, res){
    var title = req.body.title;
    var content = req.body.content;
    var code = req.body.code;
    var answer = req.body.answer;
    async.series({
        insertApp: function(done){
            pyApp.insertApp({
                title : title,
                code : code,
                content : content,
                answer : answer
            },function(err, info){
                if(!err){
                    done();
                }else{
                    done(err);
                }
            });
        }
    },function(err){
        if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, content: '注册app成功。'});
        }  
    });
};
//提交成绩
exports.updateApp = function(req, res){
    var answer = req.body.answer;
    var appCode = req.body.code;
    var appInfo = {};
    async.series({
        findAppByCode: function(done){
            pyApp.getByAppCode(appCode, function(err, info){
                if(!err){
                    if(null != info){
                        appInfo = info;
                        done();
                    }else{
                        done('该APP不存在，请检查。');
                    }
                }else{
                    done(err);
                }
            });
        },
        update: function(done){
            appInfo.answer[answer] = Number(appInfo.answer[answer]) + 1;
            appInfo.useNumber = appInfo.useNumber + 1;
            
            pyApp.updateApp(appInfo._id, appInfo, function(err, info){
                if(!err){
                    if(null != info){
                        appInfo = info;
                        done();
                    }else{
                        done('该APP不存在，请检查。');
                    }
                }else{
                    done(err);
                }
            });
        }
    },function(err){
        if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, content: appInfo});
        }  
    });
};