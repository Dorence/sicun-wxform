Page({
    data: {
        pageName: ["home", "user"],
        pageTitle: ["主页", "用户"],
        curr: 0
    },
    navSelect(e) {
        const c = e.currentTarget.dataset.curr;
        this.setData({
            curr: c
        });
    }
});