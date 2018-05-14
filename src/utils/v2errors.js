const CommonErrorBase       = 10000;
const ParamErrorBase        = 20000;
const RoomErrorBase         = 30000;

const InstallErrorBase      = 40000;
const AccountErrorBase      = 50000;
const AdminErrorBase        = 60000;

const v2errors = {
    SystemError:                        {code: CommonErrorBase + 0,         message: ''},

    Common_AppIDNotFound:               {code: CommonErrorBase + 1,         message: 'appID 不存在'},
    Common_LoginFailure:                {code: CommonErrorBase + 2,         message: '登录失败,用户名或密码错误'},
    Common_NotLoginYet:                 {code: CommonErrorBase + 3,         message: '尚未登录'},
    Common_AlreadyLogined:              {code: CommonErrorBase + 4,         message: '已经登录了'},
    Common_RoomIDNotFound:              {code: CommonErrorBase + 5,         message: '会议室不存在'},
    Common_MysqlNotInited:              {code: CommonErrorBase + 6,         message: '尚未配置 MySQL 数据库'},
    Common_RedisNotInited:              {code: CommonErrorBase + 7,         message: '尚未配置 Redis 数据库'},

    Param_appID_Error:                  {code: ParamErrorBase + 1,          message: 'appID 参数错误'},
    Param_auth_Error:                   {code: ParamErrorBase + 2,          message: 'auth 参数错误'},
    Param_roomID_Error:                 {code: ParamErrorBase + 3,          message: 'roomID 参数错误'}, 
    Param_streamID_Error:               {code: ParamErrorBase + 4,          message: 'streamID 参数错误'},
    Param_accessToken_Error:            {code: ParamErrorBase + 5,          message: 'accessToken 无效'},
    Param_accountName_Error:            {code: ParamErrorBase + 6,          message: 'accountName 参数错误'},
    Param_password_Error:               {code: ParamErrorBase + 7,          message: 'password 参数错误'},
    Param_loginName_Error:              {code: ParamErrorBase + 8,          message: 'loginName 参数错误'},
    Param_oldPassword_Error:            {code: ParamErrorBase + 9,          message: 'oldPassword 参数错误'},
    Param_newPassword_Error:            {code: ParamErrorBase + 10,         message: 'newPassword 参数错误'},
    Param_from_Error:                   {code: ParamErrorBase + 11,         message: 'from 参数错误'},
    Param_count_Error:                  {code: ParamErrorBase + 12,         message: 'count 参数错误'},
    Param_adminName_Error:              {code: ParamErrorBase + 13,         message: 'adminName 参数错误'},    
    Param_userID_Error:                 {code: ParamErrorBase + 14,         message: 'userID 参数错误'},
    Param_sdpOffer_Error:               {code: ParamErrorBase + 15,         message: 'sdpOffer 参数错误'},
    Param_candidate_Error:              {code: ParamErrorBase + 16,         message: 'candidate 参数错误'},
    Param_accountID_Error:              {code: ParamErrorBase + 17,         message: 'accountID 参数错误'},

    //app相关
    App_NotJoinRoom:                    {code: RoomErrorBase + 1,           message: '尚未入会'},
    App_StreamAlreadyPublished:         {code: RoomErrorBase + 2,           message: '该流已发布'},
    App_StreamNotPublished:             {code: RoomErrorBase + 3,           message: '该流尚未发布'},
    App_YourAlreadyInRoom:              {code: RoomErrorBase + 4,           message: '您已在会议中'},
    App_UnknwonJsonRpcMessage:          {code: RoomErrorBase + 5,           message: '无法识别的信令'},

    //开发者帐号相关
    Account_AccountNameAlreadyExists:   {code: AccountErrorBase + 1,        message: '帐号已存在'},

    //安装相关
    Install_DatabaseNameError:          {code: InstallErrorBase + 1,        message: '数据库名称错误。'},
    Install_DatabaseAlreadyInited:      {code: InstallErrorBase + 2,        message: '数据库已经配置并初始化了'},

    //管理员帐号相关
    Admin_AdminNameAlreadyExists:       {code: AdminErrorBase + 1,          message: '管理员帐号已存在'},
    Admin_AdminNameNotFound:            {code: AdminErrorBase + 2,          message: '管理员帐号不存在'}
};

for (const key in v2errors){
    if (v2errors.hasOwnProperty(key)){
        v2errors[key].name = key;
    }
}

module.exports = v2errors;