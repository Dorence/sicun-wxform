//app.js
App({
    SCForm: require("./sicunform/main.js"),
    globalData: {},
    onLaunch: function() {
        console.log(this.SCForm);
        if (!wx.cloud) {
            console.error("请使用 2.2.3 或以上的基础库以使用云能力");
            wx.showToast({
                title: "请升级微信以使用小程序",
                icon: "none",
                duration: 10000
            });
        } else {
            wx.cloud.init({
                traceUser: true,
                env: "dev-coc-mrqt5"
                // env: "release-824dd3"
            });
        }
        wx.getSystemInfo({
            success: e => {
                this.globalData.StatusBar = e.statusBarHeight;
                let capsule = wx.getMenuButtonBoundingClientRect();
                if (capsule) {
                    this.globalData.Custom = capsule;
                    this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
                } else {
                    this.globalData.CustomBar = e.statusBarHeight + 50;
                }
            }
        });
    }
})