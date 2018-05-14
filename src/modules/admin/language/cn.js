module.exports = {
    title: {
        documentTitle: "管理员中心"
    },
    login: {
        title: "管理员中心",
        labelUserName: "用户名",
        labelPassword: "密码",
        buttonLogin: "登录",
        buttonLanguage: "中文/英文",
        msgAccountVerification: "请输入管理员账号!",
        msgPasswordVerification: "请输入管理员密码!"
    },
    leftNav: {
        titleServerManage: "服务器管理",
        titleAppServer: "服务器监控",
        titleDeveloperManage: "开发者管理",
        titleAppManage: "App管理",
        titleRoomManage: "房间管理",
        titleRetrun: "授权管理"
    },
    header: {
        title: "管理员中心",
        titleModifyPassword: "修改密码",
        menuModifyPassord: "修改密码",
        menuSwitchLanguage: "中文/EN",
        menuLoginOut: "退出",
        labelOldPassword: "旧密码",
        labelNewPassword: "新密码",
        buttonConfirm: "确定",
        buttonCancel: "取消",
        msgValidateOldPassword: "请输入旧密码!",
        msgValidateNewPassword: "请输入新密码!",
        msgValidateEqualPassword: "新密码不能和旧密码相等!"
    },
    serverManage: {
        labelHost: "主机",
        labelPort: "端口",
        labelUser: "用户",
        labeldataBase: "数据库",
        labelDocShareServer: "文档共享服务器",
        buttonDocShareServer: "文档共享服务器",
        labelServerDesc: "描述",
        labelOperate: "操作",
        buttonModify: "修改",
        buttonDelete: "删除",
        labelEnableDisable: "启用/停用",
        labelState: "状态",
        dialogLabelServerName: "名称",
        dialogLabelDesc: "描述",
        dialoglabelStart: "立即启用",
        dialogConnectTest: "连接测试",
        dialogButtonConfirm: "确定",
        dialogButtonCancel: "取消",

        msgValidateIp: "请输入IP地址!",
        msgValidatePort: "请输入端口!",
        msgLoadTitleBeginTest: "开始测试",
        msgLoadTitleTesting: "正在测试",
        msgLoadMsgConnectSuccess: "连接成功",
        msgLoadMsgConnectFail: "连接失败",
        msgDialogTitleCreate: "创建文档服务器",
        msgDialogTitleModify: "修改文档服务器",

        buttonConfirm: "确定",
        buttonCancel: "取消",
        msgConfirmDeleteDocServer:
            "此操作将永久删除该文档共享服务器, 是否继续?",
        msgConfirmTitle: "提示"
    },
    appManage: {
        labelAppId: "AppID",
        labelAppName: "App名字",
        labelAccountId: "账号ID",
        labelAccontName: "账号名",
        labelOnlineNumber: "在线人数",
        labelAppSecret: "App秘钥",
        labelAppDesc: "App描述",
        labelCreateDate: "创建日期"
    },
    appServer: {
        labelAppServerID: "服务器ID",
        labelServerUrl: "服务器地址",
        labelMediaServerWsUri: "媒体服务器",
        labelStartDate: "启动时间",
        buttonDetial: "详情",
        labelAppServerOperate: '操作'
    },
    developerManage: {
        labelAccountId: "账号Id",
        labelAccountName: "账号名",
        labelEmail: "邮箱",
        labelMobile: "手机",
        labelRegisterDate: "注册日期",
        labelLoginTimes: "登录次数",
        labelLastLoginDate: "最后登录",
        labelAccountDesc: "描述"
    },
    roomManage: {
        labelRoomId: "房间ID",
        labelRoomName: "房间名",
        labelAccountID: "账号ID",
        labelAccountName: "账号名",
        labelAppId: "appID",
        labelAppName: "App名字",
        labelOnlineNumber: "在线人数",
        labelRoomDesc: "房间描述",
        labelCreateDate: "创建日期"
    },
    msMonitor: {
        msgPleaseIpput: "请输入内容",
        buttonSearch: "搜索",
        buttonRefresh: "刷新",
        buttonBack: "返回",
        labelPinId: "PinID",
        labelPinType: "Pin类型",
        labelAppName: "App名字",
        labelRoomName: "房间名",
        labelPublisher: "发布者",
        labelSubscribe: "订阅者",
        labelStreamType: "流类型",
        labelStreamName: "流名字",
        labelStreamInfo: "流实时信息",
        labelStreamAttribute: "属性",
        labelStreamValue: "值",
        formatPin: ["用户发布流", "用户订阅流", "服务器输入流", "服务器输出流"]
    },
    returnManage: {
        activateDate: "激活日期",
        activetionStatus: "激活状态",
        activetionHas: "已激活",
        onlineReturn: "在线返还",
        offlineReturn: "离线返还",
        returnSuccess: "返还成功",
        updatafile: "下载离线返还文件",
        returnFail: "返还失败",
        activetionCode: "激活码",
        lastUpdateDate: "最后激活日期",
        controlType: "类型"
    },
    activation: {
        activationTitle: "请激活",
        activationOnline: "在线",
        activetionoffline: "离线",
        activetionCode: "激活码",
        activetionsubmit: "在线激活",
        activetionOfflineSubmit: "离线激活",
        activetionGenerate: "获取离线请求文件",
        actibetionSelect: "选择文件",
        activetionSuccess: "激活成功",
        activetionFail: "激活失败",
        activettionErrorCode: "错误码",
        activetionPrompt: "请输入激活码",
        activetionString: "字符串获取失败 错误码为",
        activetionUpdata: "请上传文件",
        downFile: "下载文件"
    },
    consumer:{
        consumerManagement: '消费者管理',
        orderManagement: '订单管理',
        consumptionRecordQuery: '消费记录查询',
        WeChatOrderQuery:'微信订单查询',
        AlipayOrderQuery:'支付宝订单查询'
    },
    payment:{
        PaymentConfiguration: '支付配置',
        WeChatPayment: '微信支付配置',
        AlipayPayment: '支付宝支付配置',
       
    },
    PriceAllocation:{
        unitPrice: '单价设置',
        videoPrice: '视频单价设置',
        audioPrice: '音屏单价设置',
    }

};
