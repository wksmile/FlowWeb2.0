var mysql = require('mysql');
var DB_NAME = 'nodesample';

var pool  = mysql.createPool({
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : '764566785'
});
/*
pool.on('connection', function(connection) {  
    connection.query('SET SESSION auto_increment_increment=1');   //监听连接事件，连接时会触发，在连接使用前触发
});                    //此处为设置列的自增数为一
*/

/*pool.on('enqueue',function(){console.log('Waiting for available connection slot');});
 连接池会触发一个入队事件当一个回调入队等待连接时触发
*/

function User(user){                        //创建User对象
    this.username = user.username;
    this.userpass = user.userpass;
};
module.exports = User;



//根据用户名得到用户信息
User.getUserCourseLog = function setUserCourseLog(username, callback) {
    pool.getConnection(function(err, connection){
        var getUserByUserName_Sql = "SELECT course FROM userinfo WHERE username = ?";
        var useDbSql = "USE " + DB_NAME;

        var startTime, endTime, log;
        connection.query(useDbSql, function (err) {    //使用回调函数的参数connection来查询数据库
            if (err) {
                console.log("USE Error: " + err.message);
                return;
            }
            console.log('USE succeed');
        });

        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                callback(err, null);
            }
            else
            {
                if(result== null || true)
                {
                    var cmd = "SELECT startTime, endTime, exptLog FROM experiment WHERE id = ?";
                    connection.query(cmd, [result[0].course], function (err, result) {
                        console.log(result[0].startTime);
                        console.log(result[0].endTime);
                        console.log(result[0].exptLog);

                        startTime = result[0].startTime;
                        endTime = result[0].endTime;
                        log = result[0].exptLog;

                    });

                }
            }

            if(!connection.isRelease) {
                connection.release();
            }
            callback(startTime, endTime, log);
        });
    });
};


//向数据库写入实验日志
User.setUserCourseLog = function setUserCourseLog(username, courseID, log) {
    pool.getConnection(function(err, connection){
        var getUserByUserName_Sql = "SELECT course FROM userinfo WHERE username = ?";
        var useDbSql = "USE " + DB_NAME;
        connection.query(useDbSql, function (err) {    //使用回调函数的参数connection来查询数据库
            if (err) {
                console.log("USE Error: " + err.message);
                return;
            }
            console.log('USE succeed');
        });

        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                callback(err, null);
            }
            else
            {
                if(result== null || true)
                {
                    var cmd = "INSERT INTO experiment values (null, ?, ?, ?, null, ?, null, null, null, null)";
                    var lines = log.split('\n');
                    connection.query(cmd, [courseID, lines[0], lines[lines.length-3], log], function (err, result) { });

                    connection.query("SELECT LAST_INSERT_ID()", [],  function (err, result) {
                        var cmd = "UPDATE userinfo SET course=? WHERE username = ?";
                        connection.query(cmd, [result[0]['LAST_INSERT_ID()'], username],  function (err, result) {});
                    });

                }
            }

            if(!connection.isRelease) {
                connection.release();
            }

        });
    });
};


//向数据库写入实验报告
User.setUserReport = function setUserReport(username, courseID, reportData, reportTheory, reportMind, reportConclusion) {
    pool.getConnection(function(err, connection){
        var getUserByUserName_Sql = "SELECT course FROM userinfo WHERE username = ?";
        var useDbSql = "USE " + DB_NAME;
        connection.query(useDbSql, function (err) {    //使用回调函数的参数connection来查询数据库
            if (err) {
                console.log("USE Error: " + err.message);
                return;
            }
            console.log('USE succeed');
        });

        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                callback(err, null);
            }
            else
            {
                if(result== null || true)
                {
                    var cmd = "INSERT INTO experiment values (null, ?, ?, ?, null, ?, null, null, null, null)";
                    var lines = log.split('\n');
                    connection.query(cmd, [courseID, lines[0], lines[lines.length-3], log], function (err, result) { });

                    connection.query("SELECT LAST_INSERT_ID()", [],  function (err, result) {
                        var cmd = "UPDATE userinfo SET course=? WHERE username = ?";
                        connection.query(cmd, [result[0]['LAST_INSERT_ID()'], username],  function (err, result) {});
                    });

                }
            }

            if(!connection.isRelease) {
                connection.release();
            }

        });
    });
};

//根据用户名得到用户信息
User.getUserByUserName = function getUserByUserName(username, callback) {
    pool.getConnection(function(err, connection){
        var getUserByUserName_Sql = "SELECT * FROM userinfo WHERE username = ?";
        var useDbSql = "USE " + DB_NAME;
        connection.query(useDbSql, function (err) {    //使用回调函数的参数connection来查询数据库
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log('USE succeed');
        });

        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                callback(err, null);
            }

            if(!connection.isRelease) {
                connection.release();
            }  
            
            console.log("invoked[getUserByUserName]");
            console.log(result);
            callback(err,result);                     
        });        
    });
};

//根据用户名得到用户数量
User.getUserNumByName = function getUserNumByName(username, callback) {
   pool.getConnection(function(err, connection){

        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM userinfo WHERE username = ?";
        var useDbSql = "USE " + DB_NAME;
        connection.query(useDbSql, function (err) {    //使用回调函数的参数connection来查询数据库
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log('USE succeed');
        });

        connection.query(getUserNumByName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }

            if(!connection.isRelease)  {
                connection.release();
            }            
            //console.log(result);
            console.log("invoked[getUserNumByName]");
            console.log(result); 
         
            callback(err,result);                     
        });
       
   });    
};

                                          //一般用node.js连接池模块，这样查询不会读在创建一个连接后都在这个连接中执行
                                                  //连接池模块   http://www.111cn.net/database/mysql/90774.htm
pool.getConnection(function(err, connection) {     //从创建的连接池中获取到一个我们需要的连接

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {    //使用回调函数的参数connection来查询数据库
         if (err) {
            console.log("USE Error: " + err.message);
            return;
         }
         console.log('USE succeed');
    });

    //保存数据
    User.prototype.save = function save(callback) {       //使用User的prototype属性来增加save函数到User函数中
        var user = {
            username: this.username,
            userpass: this.userpass
        };

        var insertUser_Sql = "INSERT INTO userinfo(id,username,userpass) VALUES(,?,?)";

        connection.query(insertUser_Sql, [user.username, user.userpass], function (err,result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            connection.release();                       //释放数据库连接

            console.log("invoked[save]");
            callback(err,result);                     
        });       
    };
});